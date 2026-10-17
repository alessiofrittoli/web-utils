/**
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture/requestWindow#options)
 */
interface RequestPictureInPictureWindowParams {
	/**
	 * A non-negative number representing the width to set for the Picture-in-Picture window's viewport, in pixels.
	 *
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture/requestWindow#width)
	 *
	 * @default 0
	 */
	width?: number
	/**
	 * A non-negative number representing the height to set for the Picture-in-Picture window's viewport, in pixels.
	 *
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture/requestWindow#height)
	 *
	 * @default 0
	 */
	height?: number
	/**
	 * Hints to the browser that it should not display a UI control that enables the user to return to the originating tab and close the Picture-in-Picture window.
	 *
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture/requestWindow#disallowreturntoopener)
	 *
	 * @default false
	 */
	disallowReturnToOpener?: boolean
	/**
	 * Defines whether the Picture-in-Picture window will always appear back at the position and size it initially opened at,
	 * when it is closed and then reopened.
	 *
	 * By contrast, if `preferInitialWindowPlacement` is `false` the Picture-in-Picture window's size and position will be remembered
	 * when closed and reopened — it will reopen at its previous position and size, for example as set by the user.
	 *
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture/requestWindow#preferinitialwindowplacement)
	 *
	 * @default false
	 */
	preferInitialWindowPlacement?: boolean
}

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
