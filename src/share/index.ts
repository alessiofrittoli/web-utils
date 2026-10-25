import { Url, type UrlInput } from '@alessiofrittoli/url-utils'
import { canWebApiShareData } from '@/sharer'

/**
 * @see {@link globalThis.ShareData}
 */
export interface ShareData {
	/**
	 * The URL to share.
	 *
	 */
	url?: UrlInput
	/**
	 * An array of `File` objects representing files to be shared. See [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share#shareable_file_types) for shareable file types.
	 *
	 */
	files?: File[]
	/**
	 * A string representing text to be shared.
	 *
	 */
	text?: string
	/**
	 * A string representing a title to be shared. May be ignored by the target.
	 *
	 */
	title?: string
}

/**
 * Share data using the native sharing mechanism of the device to share data such as text, URLs, or files.
 *
 * Available only in secure contexts.
 *
 * @param data (Optional) The data to share. If no data is provided, then the current location URL is used.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/share)
 *
 * Requires the following packages to be installed:
 *
 * - [`@alessiofrittoli/url-utils`](https://npmjs.com/package/@alessiofrittoli/url-utils)
 */
export const share = async (data: ShareData = {}): Promise<false | void> => {
	const { title = document.title, text, url, files } = data

	const finalData: globalThis.ShareData =
		Object.keys(data).length > 0
			? {
					title,
					text,
					url: url ? Url.format(url) : undefined,
					files,
				}
			: {
					title,
					url: Url.format(location),
				}

	if (!canWebApiShareData(finalData)) {
		return false
	}

	return navigator.share(finalData)
}
