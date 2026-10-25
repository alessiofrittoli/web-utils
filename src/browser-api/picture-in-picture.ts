import { getDimensions, type InputDimensions } from '@/utils'
import { Exception } from '@alessiofrittoli/exception'
import { cloneStyleSheets, type Styles } from '@/dom'
import { ErrorCode } from '@/errors'

/**
 * Checks if the Document Picture-in-Picture API is supported by the current browser.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API)
 *
 * @returns `true` if Document Picture-in-Picture is supported, `false` otherwise.
 */
export const isDocumentPictureInPictureSupported = (): boolean =>
	'documentPictureInPicture' in window &&
	typeof window.documentPictureInPicture?.requestWindow === 'function'

/**
 * Validates that the Document Picture-in-Picture API is supported by the current browser.
 *
 * @throws {Exception} Throws a new Exception if the Document Picture-in-Picture API is not supported.
 */
export const requiresDocumentPictureInPictureAPI = (): void => {
	if (!isDocumentPictureInPictureSupported()) {
		throw new Exception({
			message: 'The Document Picture-in-Picture API is not supported in the current browser.',
			code: ErrorCode.DOCUMENT_PIP_NOT_SUPPORTED,
		})
	}
}

/**
 * Defines configuration options for opening a Document Picture-in-Picture window.
 *
 */
export interface OpenDocumentPictureInPictureOptions extends Omit<
	RequestPictureInPictureWindowParams,
	'width' | 'height'
> {
	/**
	 * A tuple defining non-negative numbers representing the width and the height to set for the Picture-in-Picture window's viewport, in pixels.
	 *
	 * @default [ 250, 250 ]
	 */
	sizes?: InputDimensions
	/**
	 * Custom styles to load inside the Picture-in-Picture window.
	 *
	 * ⚠️ To keep consistent styling with your web-app, document styles are automatically cloned.
	 */
	styles?: Styles
	/**
	 * A callback to execute when Picture-in-Picture window is closed.
	 *
	 */
	onQuit?: () => void
}

/**
 * Defines the returned result of opening a Document Picture-in-Picture window.
 *
 */
export interface OpenDocumentPictureInPicture {
	/**
	 * The browsing context inside the Document Picture-in-Picture window.
	 *
	 */
	window: Window
}

/**
 * Opens a Document Picture-in-Picture window.
 *
 * @param options Configuration options for opening a new Document Picture-in-Picture window.
 * 	See {@link OpenDocumentPictureInPictureOptions} for more info.
 *
 * @returns A new Promise that resolves to the Document Picture-in-Picture result containing the `window` of the new browsing context.
 * 	See {@link OpenDocumentPictureInPicture} for more info.
 *
 * @throws {Exception} Throws a new Exception if the Document Picture-in-Picture API is not supported.
 *
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API)
 */
export const openDocumentPictureInPicture = async (
	options: OpenDocumentPictureInPictureOptions = {},
): Promise<OpenDocumentPictureInPicture> => {
	requiresDocumentPictureInPictureAPI()

	const { sizes, styles: customStyles, onQuit, ...rest } = options

	const [width = 250, height = width] = getDimensions(sizes)

	const styles = await cloneStyleSheets(document.styleSheets).then(async result =>
		customStyles ? result.concat(await cloneStyleSheets(customStyles)) : result,
	)

	const pipWindow = (await window.documentPictureInPicture?.requestWindow?.({
		width,
		height,
		...rest,
	})) as Window

	styles.map(style => pipWindow.document.head.appendChild(style))

	if (onQuit) {
		pipWindow.addEventListener('pagehide', onQuit, { once: true })
	}

	return { window: pipWindow }
}
