import { openBrowserPopUp, type OpenBrowserPopUpOptions } from '@/browser-popup/openBrowserPopUp'
import { Url, type UrlInput } from '@alessiofrittoli/url-utils'

export type ClassicSharerPopUpOptions = Omit<OpenBrowserPopUpOptions, 'context'>

export interface SharerPopUpOptions extends ClassicSharerPopUpOptions {
	/**
	 * The shared content title.
	 *
	 */
	title?: string
}

export interface PinterestSharerPopUpOptions extends ClassicSharerPopUpOptions {
	/**
	 * The media URL.
	 *
	 * @default url
	 */
	media?: UrlInput
	/**
	 * The media description.
	 *
	 */
	description?: string
}

export interface WhatsAppSharerPopUpOptions extends ClassicSharerPopUpOptions {
	/**
	 * Additional custom WhatsApp message.
	 *
	 */
	text?: string
}

interface OpenSharerPopUpOptions extends ClassicSharerPopUpOptions {
	/**
	 * The base sharer provider URL.
	 *
	 */
	sharer: UrlInput
	/**
	 * Custom URLSearchParam name where URL to share get stored.
	 *
	 * @default 'url'
	 */
	urlParam?: string
}

/**
 * Open sharer browser PopUp.
 *
 * @param options An object defining share options. See {@link OpenSharerPopUpOptions}.
 * @returns The result of {@link openBrowserPopUp}.
 *
 * Requires the following packages to be installed:
 *
 * - [`@alessiofrittoli/typed-map`](https://npmjs.com/package/@alessiofrittoli/typed-map)
 * - [`@alessiofrittoli/url-utils`](https://npmjs.com/package/@alessiofrittoli/url-utils)
 */
export const openSharerPopUp = (options: OpenSharerPopUpOptions): Window | undefined => {
	const { url = location, sharer, urlParam = 'url', ...rest } = options

	const u = Url.format(url)
	const destination = Url.parse(sharer)

	destination.searchParams.append(urlParam, u)

	return openBrowserPopUp({ url: destination, ...rest, context: 'sharer' })
}

/**
 * Share URL or current page URL on Facebook.
 *
 * @param	options	(Optional) The data to share. See {@link SharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 *
 * Requires the following packages to be installed:
 *
 * - [`@alessiofrittoli/typed-map`](https://npmjs.com/package/@alessiofrittoli/typed-map)
 * - [`@alessiofrittoli/url-utils`](https://npmjs.com/package/@alessiofrittoli/url-utils)
 */
export const shareOnFacebook = (options: SharerPopUpOptions = {}): Window | undefined => {
	const { title = document.title, ...rest } = options

	const sharer = new URL('https://facebook.com/sharer/sharer.php')

	if (title) {
		sharer.searchParams.append('t', title)
	}

	return openSharerPopUp({ ...rest, sharer, urlParam: 'u' })
}

/**
 * Share URL or current page URL on Workplace.
 *
 * @param	options	(Optional) The data to share. See {@link SharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 *
 * Requires the following packages to be installed:
 *
 * - [`@alessiofrittoli/typed-map`](https://npmjs.com/package/@alessiofrittoli/typed-map)
 * - [`@alessiofrittoli/url-utils`](https://npmjs.com/package/@alessiofrittoli/url-utils)
 */
export const shareOnWorkplace = (options: SharerPopUpOptions = {}): Window | undefined => {
	const { title = document.title, ...rest } = options

	const sharer = new URL('https://work.workplace.com/sharer.php')

	if (title) {
		sharer.searchParams.append('t', title)
	}

	return openSharerPopUp({ ...rest, sharer })
}

/**
 * Share URL or current page URL on Reddit.
 *
 * @param	options	(Optional) The data to share. See {@link SharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 *
 * Requires the following packages to be installed:
 *
 * - [`@alessiofrittoli/typed-map`](https://npmjs.com/package/@alessiofrittoli/typed-map)
 * - [`@alessiofrittoli/url-utils`](https://npmjs.com/package/@alessiofrittoli/url-utils)
 */
export const shareOnReddit = (options: SharerPopUpOptions = {}): Window | undefined => {
	const { title = document.title, ...rest } = options

	const sharer = new URL('https://reddit.com/submit')

	if (title) {
		sharer.searchParams.append('title', title)
	}

	return openSharerPopUp({ ...rest, sharer })
}

/**
 * Share URL or current page URL on Weibo.
 *
 * @param	options	(Optional) The data to share. See {@link ClassicSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 *
 * Requires the following packages to be installed:
 *
 * - [`@alessiofrittoli/typed-map`](https://npmjs.com/package/@alessiofrittoli/typed-map)
 * - [`@alessiofrittoli/url-utils`](https://npmjs.com/package/@alessiofrittoli/url-utils)
 */
export const shareOnWeibo = (options: ClassicSharerPopUpOptions = {}): Window | undefined =>
	openSharerPopUp({ ...options, sharer: 'https://service.weibo.com/share/share.php' })

/**
 * Share URL or current page URL on VK.
 *
 * @param	options	(Optional) The data to share. See {@link ClassicSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 *
 * Requires the following packages to be installed:
 *
 * - [`@alessiofrittoli/typed-map`](https://npmjs.com/package/@alessiofrittoli/typed-map)
 * - [`@alessiofrittoli/url-utils`](https://npmjs.com/package/@alessiofrittoli/url-utils)
 */
export const shareOnVK = (options: ClassicSharerPopUpOptions = {}): Window | undefined =>
	openSharerPopUp({ ...options, sharer: 'https://vk.com/share.php' })

/**
 * Share URL or current page URL on Tumblr.
 *
 * @param	options	(Optional) The data to share. See {@link ClassicSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 *
 * Requires the following packages to be installed:
 *
 * - [`@alessiofrittoli/typed-map`](https://npmjs.com/package/@alessiofrittoli/typed-map)
 * - [`@alessiofrittoli/url-utils`](https://npmjs.com/package/@alessiofrittoli/url-utils)
 */
export const shareOnTumblr = (options: ClassicSharerPopUpOptions = {}): Window | undefined =>
	openSharerPopUp({ ...options, sharer: 'https://tumblr.com/widgets/share/tool', urlParam: 'canonicalUrl' })

/**
 * Share URL or current page URL on Line.
 *
 * @param	options	(Optional) The data to share. See {@link ClassicSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 *
 * Requires the following packages to be installed:
 *
 * - [`@alessiofrittoli/typed-map`](https://npmjs.com/package/@alessiofrittoli/typed-map)
 * - [`@alessiofrittoli/url-utils`](https://npmjs.com/package/@alessiofrittoli/url-utils)
 */
export const shareOnLine = (options: ClassicSharerPopUpOptions = {}): Window | undefined =>
	openSharerPopUp({ ...options, sharer: 'https://social-plugins.line.me/lineit/share' })

/**
 * Share URL or current page URL on X.
 *
 * @param	options	(Optional) The data to share. See {@link ClassicSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 *
 * Requires the following packages to be installed:
 *
 * - [`@alessiofrittoli/typed-map`](https://npmjs.com/package/@alessiofrittoli/typed-map)
 * - [`@alessiofrittoli/url-utils`](https://npmjs.com/package/@alessiofrittoli/url-utils)
 */
export const shareOnX = (options: ClassicSharerPopUpOptions = {}): Window | undefined =>
	openSharerPopUp({ ...options, sharer: 'https://x.com/intent/tweet' })

/**
 * Share URL or current page URL on LinkedIn.
 *
 * @param	options	(Optional) The data to share. See {@link ClassicSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 *
 * Requires the following packages to be installed:
 *
 * - [`@alessiofrittoli/typed-map`](https://npmjs.com/package/@alessiofrittoli/typed-map)
 * - [`@alessiofrittoli/url-utils`](https://npmjs.com/package/@alessiofrittoli/url-utils)
 */
export const shareOnLinkedIn = (options: ClassicSharerPopUpOptions = {}): Window | undefined =>
	openSharerPopUp({ ...options, sharer: 'https://linkedin.com/sharing/share-offsite' })

/**
 * Share URL or current page URL on Telegram.
 *
 * @param	options	(Optional) The data to share. See {@link ClassicSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 *
 * Requires the following packages to be installed:
 *
 * - [`@alessiofrittoli/typed-map`](https://npmjs.com/package/@alessiofrittoli/typed-map)
 * - [`@alessiofrittoli/url-utils`](https://npmjs.com/package/@alessiofrittoli/url-utils)
 */
export const shareOnTelegram = (options: ClassicSharerPopUpOptions = {}): Window | undefined =>
	openSharerPopUp({ ...options, sharer: 'https://telegram.me/share/url' })

/**
 * Share URL or current page URL on Pinterest.
 *
 * @param	options	(Optional) The data to share. See {@link PinterestSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 *
 * Requires the following packages to be installed:
 *
 * - [`@alessiofrittoli/typed-map`](https://npmjs.com/package/@alessiofrittoli/typed-map)
 * - [`@alessiofrittoli/url-utils`](https://npmjs.com/package/@alessiofrittoli/url-utils)
 */
export const shareOnPinterest = (options: PinterestSharerPopUpOptions = {}): Window | undefined => {
	const {
		url = location,
		media,
		description = document.title ||
			document.querySelector('[name="description"]')?.getAttribute('content'),
		...rest
	} = options

	const u = Url.format(url)
	const sharer = new URL('https://pinterest.it/pin-builder')

	sharer.searchParams.append('method', 'button')
	sharer.searchParams.append('media', media ? Url.format(media) : u)

	if (description) {
		sharer.searchParams.append('description', description)
	}

	return openSharerPopUp({ ...rest, url, sharer })
}

/**
 * Share URL or current page URL via WhatsApp.
 *
 * @param	options	(Optional) The data to share. See {@link WhatsAppSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 *
 * Requires the following packages to be installed:
 *
 * - [`@alessiofrittoli/typed-map`](https://npmjs.com/package/@alessiofrittoli/typed-map)
 * - [`@alessiofrittoli/url-utils`](https://npmjs.com/package/@alessiofrittoli/url-utils)
 */
export const shareOnWhatsApp = (options: WhatsAppSharerPopUpOptions = {}): Window | undefined => {
	const { url = location, text, ...rest } = options

	const u = Url.format(url)
	const destination = new URL('https://api.whatsapp.com/send')
	const finalText = text ? `${text}\n\n${u}` : u
	destination.search = new URLSearchParams({ text: finalText }).toString()

	return openBrowserPopUp({ url: destination, ...rest, context: 'sharer' })
}
