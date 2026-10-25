// oxlint-disable typescript/unbound-method
/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { downloadBlob } from '@/blob'

describe('downloadBlob', () => {
	const originalCreateElement = document.createElement
	const linkClick = vi.fn()
	const linkRemove = vi.fn()
	const linkHrefSetter = vi.fn(value => value)
	const linkDownloadSetter = vi.fn(value => value)

	beforeEach(() => {
		global.URL.createObjectURL = vi.fn(() => 'mock-url')
		global.URL.revokeObjectURL = vi.fn()
		document.createElement = vi.fn(() => ({
			click: linkClick,
			remove: linkRemove,
			_href: '',
			_download: '',
			set href(value) {
				this._href = linkHrefSetter(value)
			},
			get href(): typeof this._href {
				return this._href
			},
			set download(value) {
				this._download = linkDownloadSetter(value)
			},
			get download(): typeof this._download {
				return this._download
			},
		})) as unknown as typeof document.createElement
	})

	afterEach(() => {
		document.createElement = originalCreateElement
	})

	it('creates a Blob and trigger a download', async () => {
		const filename = 'test.txt'
		const data = 'Hello, world!'

		await downloadBlob(filename, data)

		expect(URL.createObjectURL).toHaveBeenCalled()
		expect(document.createElement).toHaveBeenCalledWith('a')
		expect(linkHrefSetter).toHaveBeenCalledWith('mock-url')
		expect(linkDownloadSetter).toHaveBeenCalledWith(filename)
		expect(linkClick).toHaveBeenCalled()
		expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url')
		expect(linkRemove).toHaveBeenCalled()
	})
})
