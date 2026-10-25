/**
 * @vitest-environment jsdom
 */
import {
	isDocumentPictureInPictureSupported,
	requiresDocumentPictureInPictureAPI,
	openDocumentPictureInPicture,
} from '@/picture-in-picture'
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import { cloneStyleSheets as _cloneStyleSheets, type Styles } from '@/stylesheet'
import { PiPErrors } from '@/picture-in-picture/errors'

vi.mock('@/stylesheet', () => ({
	cloneStyleSheets: vi.fn(async () => [document.createElement('style')]),
}))

const cloneStyleSheets = _cloneStyleSheets as Mock<typeof _cloneStyleSheets>

describe('Document Picture-in-Picture', () => {
	let mockDocumentPiPWindow: {
		width: number
		height: number
		disallowReturnToOpener: undefined
		preferInitialWindowPlacement: undefined
		addEventListener: Mock<(event: string, listener: (event: Event) => void) => void>
		document: {
			head: HTMLHeadElement
		}
	}

	/**
	 * Mock of window.documentPictureInPicture.requestWindow().
	 *
	 */
	let mockRequestWindow: Mock<NonNullable<NonNullable<Window['documentPictureInPicture']>['requestWindow']>>

	/**
	 * Mock of window.documentPictureInPicture.
	 *
	 */
	let mockDocumentPictureInPicture: Mock<
		() => {
			requestWindow?: Mock<(params?: RequestPictureInPictureWindowParams) => Promise<Window>>
		}
	>

	beforeEach(() => {
		mockDocumentPiPWindow = {
			width: 0,
			height: 0,
			disallowReturnToOpener: undefined,
			preferInitialWindowPlacement: undefined,
			addEventListener: vi.fn((event, listener) => {
				listener(new Event(event))
			}),
			document: {
				head: document.createElement('head'),
			},
		}

		mockRequestWindow = vi.fn((options = {}) => {
			Object.entries(options).map(([key, value]) => {
				// @ts-expect-error couldn't infer types
				mockDocumentPiPWindow[key as keyof typeof mockDocumentPiPWindow] = value
			})
			return mockDocumentPiPWindow
		}) as unknown as typeof mockRequestWindow

		mockDocumentPictureInPicture = vi.fn(() => ({
			requestWindow: mockRequestWindow,
		}))

		Object.defineProperty(window, 'documentPictureInPicture', {
			configurable: true,
			get: mockDocumentPictureInPicture,
		})
	})
	// })

	afterEach(() => {
		vi.clearAllMocks()
		Object.defineProperty(window, 'documentPictureInPicture', {
			configurable: true,
			get: undefined,
		})
	})

	describe('isDocumentPictureInPictureSupported', () => {
		it('returns true if Document Picture-in-Picture API is available', () => {
			expect(isDocumentPictureInPictureSupported()).toBe(true)
		})

		it('returns false if Document Picture-in-Picture API is not available', () => {
			mockDocumentPictureInPicture.mockReturnValue({})
			expect(isDocumentPictureInPictureSupported()).toBe(false)
		})
	})

	describe('requiresDocumentPictureInPictureAPI', () => {
		it('throws an Exception if Document Picture-in-Picture is not supported', () => {
			mockDocumentPictureInPicture.mockReturnValue({})

			expect(requiresDocumentPictureInPictureAPI).toThrow(
				expect.objectContaining({ code: PiPErrors.DOCUMENT_PIP_NOT_SUPPORTED }),
			)
		})

		it("doesn't throw any Exception if Document Picture-in-Picture is supported", () => {
			expect(requiresDocumentPictureInPictureAPI).not.toThrow()
		})
	})

	describe('openDocumentPictureInPicture', () => {
		it('returns the new browsing context inside the Document Picture-in-Picture window with default options', async () => {
			const { window: pipWindow } = await openDocumentPictureInPicture()

			expect(pipWindow).toBeDefined()
			expect(pipWindow).toBe(mockDocumentPiPWindow) // this pass only because we mocked the return value of `requestWindow`
			expect(mockRequestWindow).toHaveBeenCalledWith({
				width: 250,
				height: 250,
				disallowReturnToOpener: undefined,
				preferInitialWindowPlacement: undefined,
			})
		})

		it('opens the Document Picture-in-Picture window with the given options', async () => {
			await openDocumentPictureInPicture({
				sizes: [200, 300],
				disallowReturnToOpener: true,
				preferInitialWindowPlacement: true,
			})

			expect(mockRequestWindow).toHaveBeenCalledWith({
				width: 200,
				height: 300,
				disallowReturnToOpener: true,
				preferInitialWindowPlacement: true,
			})
		})

		it('clones the current document stylesheets', async () => {
			await openDocumentPictureInPicture()

			expect(cloneStyleSheets).toHaveBeenCalledWith(document.styleSheets)
		})

		it('clones the given stylesheets', async () => {
			const styles: Styles = { url: '/path-to-custom-style.css', fetch: true }

			await openDocumentPictureInPicture({ styles })

			expect(cloneStyleSheets).toHaveBeenNthCalledWith(2, styles)
		})

		it('calls given onQuit callback on Document Picture-in-Picture pagehide event', async () => {
			const onQuit = vi.fn()

			await openDocumentPictureInPicture({ onQuit })

			expect(onQuit).toHaveBeenCalled()
		})
	})
})
