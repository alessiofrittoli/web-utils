import type { RequestPictureInPictureWindowParams } from '@/picture-in-picture'

declare global {
	interface Window {
		/**
		 * The `DocumentPictureInPicture` interface of the
		 * [Document Picture-in-Picture API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API) is the entry
		 * point for creating and handling document picture-in-picture windows.
		 *
		 * ⚠️ Limited availability API.
		 *
		 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture)
		 */
		documentPictureInPicture?: {
			/**
			 * The `requestWindow()` method of the [`DocumentPictureInPicture`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture)
			 * interface opens the Picture-in-Picture window for the current main browsing context.
			 * It returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
			 * that fulfills with a [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) instance representing
			 * the browsing context inside the Picture-in-Picture window.
			 *
			 * The `requestWindow()` method requires [transient activation](https://developer.mozilla.org/en-US/docs/Glossary/Transient_activation),
			 * i.e., it must be invoked in response to a user action such as a mouse click or button press.
			 *
			 * ⚠️ Limited availability API.
			 *
			 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture/requestWindow)
			 */
			requestWindow?: (params?: RequestPictureInPictureWindowParams) => Promise<Window>
		}
	}
}
