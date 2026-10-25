// oxlint-disable typescript/unbound-method typescript/no-misused-spread
import {
	openSharerPopUp,
	shareOnFacebook,
	shareOnWorkplace,
	shareOnReddit,
	shareOnWeibo,
	shareOnVK,
	shareOnTumblr,
	shareOnLine,
	shareOnX,
	shareOnLinkedIn,
	shareOnTelegram,
	shareOnPinterest,
	shareOnWhatsApp,
} from '@/browser-popup'
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { canWebApiShare, canWebApiShareData, shareViaEmail } from '@/sharer'
import { openBrowserPopUp as _openBrowserPopUp } from '@/browser-popup'
import { Url } from '@alessiofrittoli/url-utils'
import { share } from '@/share'

vi.mock('@/browser-popup/openBrowserPopUp', () => ({
	openBrowserPopUp: vi.fn(),
}))

const openBrowserPopUp = _openBrowserPopUp as Mock<typeof _openBrowserPopUp>

describe('sharer', () => {
	const canShare = vi.fn(() => true)
	const querySelector = vi.fn<typeof document.querySelector>(() => null)

	beforeEach(() => {
		let location = 'http://localhost:3000/current-location'

		const mockLocation = {
			...new URL(location),
			set href(href) {
				location = href
			},
			get href() {
				return location
			},
		} as unknown as Location

		const mockWindow = {
			location: mockLocation,
		} as Window

		const mockDocument = {
			title: 'Default Document title',
			querySelector,
		} as unknown as Document

		const mockNavigator = {
			share: vi.fn(),
			canShare,
		} as unknown as Navigator

		vi.stubGlobal('window', mockWindow)
		vi.stubGlobal('document', mockDocument)
		vi.stubGlobal('navigator', mockNavigator)
		vi.stubGlobal('location', mockLocation)
	})

	afterEach(() => {
		vi.clearAllMocks()
	})

	describe('canWebApiShare', () => {
		it('returns true if navigator, canShare() and share() methods are defined', () => {
			expect(canWebApiShare()).toBe(true)
		})

		it('returns false if navigator is undefined', () => {
			vi.stubGlobal('navigator', undefined)
			expect(canWebApiShare()).toBe(false)
		})

		it('returns false if navigator.canShare() is undefined', () => {
			vi.stubGlobal('navigator', {
				...navigator,
				canShare: undefined,
			})
			expect(canWebApiShare()).toBe(false)
		})

		it('returns false if navigator.share() is undefined', () => {
			vi.stubGlobal('navigator', {
				...navigator,
				share: undefined,
			})
			expect(canWebApiShare()).toBe(false)
		})
	})

	describe('canWebApiShareData', () => {
		it('returns false if navigator.canShare() returns false', () => {
			canShare.mockImplementationOnce(() => false)
			expect(canWebApiShareData({})).toBe(false)
		})

		it('returns true if navigator.canShare() returns true', () => {
			expect(canWebApiShareData({})).toBe(true)
		})
	})

	describe('share', () => {
		it('resolves to false if canWebApiShareData returns false', async () => {
			vi.stubGlobal('navigator', {
				...navigator,
				share: undefined,
			})
			await expect(
				share({
					title: 'T',
					text: 'txt',
					url: 'https://a.com',
					files: [],
				}),
			).resolves.toBe(false)
		})

		it('calls navigator.share with formatted data', async () => {
			await share({
				title: 'T',
				text: 'txt',
				url: 'https://a.com',
				files: [],
			})

			expect(global.navigator.share).toHaveBeenNthCalledWith(1, {
				title: 'T',
				text: 'txt',
				url: 'https://a.com',
				files: [],
			})

			await share({
				title: 'T',
				text: 'txt',
			})

			expect(global.navigator.share).toHaveBeenNthCalledWith(2, {
				title: 'T',
				text: 'txt',
			})
		})

		it('calls navigator.share with default data if no data is provided', async () => {
			document.title = 'Document title'

			await share()

			expect(global.navigator.share).toHaveBeenCalledWith({
				title: 'Document title',
				url: location.href,
			})
		})
	})

	describe('shareViaEmail', () => {
		it('sets window.location.href using given EmailData', () => {
			shareViaEmail({ subject: 'Test' })
			expect(window.location.href).toBe('mailto:?subject=Test')
		})

		it('sets window.location.href with no data', () => {
			shareViaEmail()
			expect(window.location.href).toBe('mailto:')
		})
	})

	describe('openSharerPopUp', () => {
		it('adds the current location URL to the `url` search param of the given sharer URL and opens a browser popup', () => {
			const sharer = new URL('http://localhost:3000/share')
			openSharerPopUp({ sharer })

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.origin).toBe(sharer.origin)
			expect(destination.pathname).toBe(sharer.pathname)
			expect(destination.searchParams.get('url')).toBe(location.href)
		})

		it('allows a custom url param name added to the given sharer URL', () => {
			const sharer = new URL('http://localhost:3000/share')
			openSharerPopUp({ sharer, urlParam: 'u' })

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.searchParams.get('u')).toBe(location.href)
		})

		it('preserves custom sharer URL search parameters', () => {
			const sharer = new URL('http://localhost:3000/share')

			sharer.searchParams.append('t', 'custom param')

			openSharerPopUp({ sharer })

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.searchParams.get('t')).toBe('custom param')
		})
	})

	describe('shareOnFacebook', () => {
		it('uses openSharerPopUp with correct properties', () => {
			shareOnFacebook({
				title: 'Share title',
				url: 'https://custom.url',
			})

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://facebook.com/sharer/sharer.php')
			expect(destination.searchParams.get('u')).toBe('https://custom.url')
			expect(destination.searchParams.get('t')).toBe('Share title')
		})

		it('opens a sharer popup with default options', () => {
			shareOnFacebook()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://facebook.com/sharer/sharer.php')
			expect(destination.searchParams.get('u')).toBe(location.href)
			expect(destination.searchParams.get('t')).toBe(document.title)
		})

		it("doesn't append `t` param if no title has been found", () => {
			document.title = ''

			shareOnFacebook()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.searchParams.has('t')).toBe(false)
		})
	})

	describe('shareOnWorkplace', () => {
		it('uses openSharerPopUp with correct properties', () => {
			shareOnWorkplace({
				title: 'Share title',
				url: 'https://custom.url',
			})

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://work.workplace.com/sharer.php')
			expect(destination.searchParams.get('url')).toBe('https://custom.url')
			expect(destination.searchParams.get('t')).toBe('Share title')
		})

		it('opens a sharer popup with default options', () => {
			shareOnWorkplace()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://work.workplace.com/sharer.php')
			expect(destination.searchParams.get('url')).toBe(location.href)
			expect(destination.searchParams.get('t')).toBe(document.title)
		})

		it("doesn't append `t` param if no title has been found", () => {
			document.title = ''

			shareOnWorkplace()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.searchParams.has('t')).toBe(false)
		})
	})

	describe('shareOnReddit', () => {
		it('uses openSharerPopUp with correct properties', () => {
			shareOnReddit({
				title: 'Share title',
				url: 'https://custom.url',
			})

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://reddit.com/submit')
			expect(destination.searchParams.get('url')).toBe('https://custom.url')
			expect(destination.searchParams.get('title')).toBe('Share title')
		})

		it('opens a sharer popup with default options', () => {
			shareOnReddit()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://reddit.com/submit')
			expect(destination.searchParams.get('url')).toBe(location.href)
			expect(destination.searchParams.get('title')).toBe(document.title)
		})

		it("doesn't append `t` param if no title has been found", () => {
			document.title = ''

			shareOnReddit()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.searchParams.has('title')).toBe(false)
		})
	})

	describe('shareOnWeibo', () => {
		it('uses openSharerPopUp with correct properties', () => {
			shareOnWeibo({
				url: 'https://custom.url',
			})

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://service.weibo.com/share/share.php')
			expect(destination.searchParams.get('url')).toBe('https://custom.url')
		})

		it('opens a sharer popup with default options', () => {
			shareOnWeibo()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://service.weibo.com/share/share.php')
			expect(destination.searchParams.get('url')).toBe(location.href)
		})
	})

	describe('shareOnVK', () => {
		it('uses openSharerPopUp with correct properties', () => {
			shareOnVK({
				url: 'https://custom.url',
			})

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://vk.com/share.php')
			expect(destination.searchParams.get('url')).toBe('https://custom.url')
		})

		it('opens a sharer popup with default options', () => {
			shareOnVK()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://vk.com/share.php')
			expect(destination.searchParams.get('url')).toBe(location.href)
		})
	})

	describe('shareOnTumblr', () => {
		it('uses openSharerPopUp with correct properties', () => {
			shareOnTumblr({
				url: 'https://custom.url',
			})

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://tumblr.com/widgets/share/tool')
			expect(destination.searchParams.get('canonicalUrl')).toBe('https://custom.url')
		})

		it('opens a sharer popup with default options', () => {
			shareOnTumblr()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://tumblr.com/widgets/share/tool')
			expect(destination.searchParams.get('canonicalUrl')).toBe(location.href)
		})
	})

	describe('shareOnLine', () => {
		it('uses openSharerPopUp with correct properties', () => {
			shareOnLine({
				url: 'https://custom.url',
			})

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://social-plugins.line.me/lineit/share')
			expect(destination.searchParams.get('url')).toBe('https://custom.url')
		})

		it('opens a sharer popup with default options', () => {
			shareOnLine()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://social-plugins.line.me/lineit/share')
			expect(destination.searchParams.get('url')).toBe(location.href)
		})
	})

	describe('shareOnX', () => {
		it('uses openSharerPopUp with correct properties', () => {
			shareOnX({
				url: 'https://custom.url',
			})

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://x.com/intent/tweet')
			expect(destination.searchParams.get('url')).toBe('https://custom.url')
		})

		it('opens a sharer popup with default options', () => {
			shareOnX()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://x.com/intent/tweet')
			expect(destination.searchParams.get('url')).toBe(location.href)
		})
	})

	describe('shareOnLinkedIn', () => {
		it('uses openSharerPopUp with correct properties', () => {
			shareOnLinkedIn({
				url: 'https://custom.url',
			})

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://linkedin.com/sharing/share-offsite')
			expect(destination.searchParams.get('url')).toBe('https://custom.url')
		})

		it('opens a sharer popup with default options', () => {
			shareOnLinkedIn()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://linkedin.com/sharing/share-offsite')
			expect(destination.searchParams.get('url')).toBe(location.href)
		})
	})

	describe('shareOnTelegram', () => {
		it('uses openSharerPopUp with correct properties', () => {
			shareOnTelegram({
				url: 'https://custom.url',
			})

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://telegram.me/share/url')
			expect(destination.searchParams.get('url')).toBe('https://custom.url')
		})

		it('opens a sharer popup with default options', () => {
			shareOnTelegram()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://telegram.me/share/url')
			expect(destination.searchParams.get('url')).toBe(location.href)
		})
	})

	describe('shareOnPinterest', () => {
		it('uses openSharerPopUp with correct properties', () => {
			shareOnPinterest({
				url: 'https://custom.url',
				description: 'Description',
				media: 'https://media.url/image.png',
			})

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://pinterest.it/pin-builder')
			expect(destination.searchParams.get('url')).toBe('https://custom.url')
			expect(destination.searchParams.get('description')).toBe('Description')
			expect(destination.searchParams.get('media')).toBe('https://media.url/image.png')
			expect(destination.searchParams.get('method')).toBe('button')
		})

		it('opens a sharer popup with default options', () => {
			shareOnPinterest()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://pinterest.it/pin-builder')
			expect(destination.searchParams.get('url')).toBe(location.href)
			expect(destination.searchParams.get('description')).toBe('Default Document title')
			expect(destination.searchParams.get('media')).toBe(location.href)
			expect(destination.searchParams.get('method')).toBe('button')
		})

		it('fallback `description` to webpage description if no description has been provided', () => {
			document.title = ''

			querySelector.mockImplementationOnce(selector => {
				if (selector === '[name="description"]') {
					return {
						getAttribute() {
							return 'Webpage meta description'
						},
					} as unknown as ReturnType<typeof document.querySelector>
				}
				return null
			})

			shareOnPinterest()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.searchParams.get('description')).toBe('Webpage meta description')
		})

		it("doesn't append `description` param if no description has been found", () => {
			document.title = ''

			shareOnPinterest()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.searchParams.has('description')).toBe(false)
		})
	})

	describe('shareOnWhatsApp', () => {
		it('uses openSharerPopUp with correct properties', () => {
			shareOnWhatsApp({
				url: 'https://custom.url',
			})

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://api.whatsapp.com/send')
			expect(destination.searchParams.get('text')).toBe('https://custom.url')
		})

		it('opens a sharer popup with default options', () => {
			shareOnWhatsApp()

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://api.whatsapp.com/send')
			expect(destination.searchParams.get('text')).toBe(location.href)
		})

		it('adds additional text before shared URL', () => {
			shareOnWhatsApp({
				text: 'Hello! Look at this!',
			})

			expect(openBrowserPopUp).toHaveBeenCalled()

			const call = openBrowserPopUp.mock.calls[0]?.[0]
			const destination = Url.parse(call?.url || '')

			expect(destination.href).toContain('https://api.whatsapp.com/send')
			expect(destination.searchParams.get('text')).toBe(`Hello! Look at this!\n\n${location.href}`)
		})
	})
})
