import { Url, type UrlInput } from '@alessiofrittoli/url-utils'
import { openBrowserPopUp, OpenBrowserPopUpOptions } from '@/browser-api/popup'
import { emailDataToString, type EmailData } from '@/strings'

/**
 * @see {@link globalThis.ShareData}
 */
export interface ShareData
{
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


export type ClassicSharerPopUpOptions = Omit<OpenBrowserPopUpOptions, 'context'>

export interface SharerPopUpOptions extends ClassicSharerPopUpOptions
{
	/**
	 * The shared content title.
	 * 
	 */
	title?: string
}


interface OpenSharerPopUpOptions extends ClassicSharerPopUpOptions
{
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


export interface PinterestSharerPopUpOptions extends ClassicSharerPopUpOptions
{
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


export interface WhatsAppSharerPopUpOptions extends ClassicSharerPopUpOptions
{
	/**
	 * Additional custom WhatsApp message.
	 * 
	 */
	text?: string
}


/**
 * Check whether the web page can leverage share APIs.
 * 
 * @returns	`true` if web page is running in a secure context (HTTPS) and can leverage share APIs.
 */
export const canWebApiShare = () => (
	typeof navigator !== 'undefined' &&
	typeof navigator.canShare === 'function' &&
	typeof navigator.share === 'function'
)


/**
 * Check whether the web page can share the given data.
 * 
 * @param	data (Optional) The data that is going to be shared.
 * @returns	`true` if web page is running in a secure context (HTTPS) and can share the given data, `false` otherwise.
 */
export const canWebApiShareData = ( data?: globalThis.ShareData ) => (
	canWebApiShare() && navigator.canShare( data )
)


/**
 * Share data using the native sharing mechanism of the device to share data such as text, URLs, or files.
 * 
 * Available only in secure contexts.
 * 
 * @param data (Optional) The data to share. If no data is provided, then the current location URL is used.
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Navigator/share)
 */
export const share = async (
	data: ShareData = {}
): Promise<false | void> => {

	const {
		title = document.title, text, url, files
	} = data

	const finalData: globalThis.ShareData = (
		Object.keys( data ).length > 0 ? {
			title, text, url: url ? Url.format( url ) : undefined, files
		} : {
			title, url: Url.format( location )
		}
	)

	if ( ! canWebApiShareData( finalData ) ) {
		return false
	}

	return navigator.share( finalData )

}


/**
 * Share data via Email.
 *
 */
export const shareViaEmail = (
	data: EmailData = {},
) => {
	window.location.href = emailDataToString( data )
}


/**
 * Open sharer browser PopUp.
 * 
 * @param options An object defining share options. See {@link OpenSharerPopUpOptions}.
 * @returns The result of {@link openBrowserPopUp}.
 */
export const openSharerPopUp = ( options: OpenSharerPopUpOptions ) => {

	const {
		url = location, sharer, urlParam = 'url', ...rest
	} = options

	const u				= Url.format( url )
	const destination	= Url.parse( sharer )

	destination.searchParams.append( urlParam, u )

	return openBrowserPopUp( { url: destination, ...rest, context: 'sharer' } )

}


/**
 * Share URL or current page URL on Facebook.
 *
 * @param	options	(Optional) The data to share. See {@link SharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 */
export const shareOnFacebook = ( options: SharerPopUpOptions = {} ) => {

	const {
		title = document.title, ...rest
	} = options

	const sharer = new URL( 'https://facebook.com/sharer/sharer.php' )

	if ( title ) {
		sharer.searchParams.append( 't', title )
	}

	return openSharerPopUp( { ...rest, sharer, urlParam: 'u' } )

}


/**
 * Share URL or current page URL on Workplace.
 *
 * @param	options	(Optional) The data to share. See {@link SharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 */
export const shareOnWorkplace = ( options: SharerPopUpOptions = {} ) => {

	const {
		title = document.title, ...rest
	} = options

	const sharer = new URL( 'https://work.workplace.com/sharer.php' )

	if ( title ) {
		sharer.searchParams.append( 't', title )
	}

	return openSharerPopUp( { ...rest, sharer } )

}


/**
 * Share URL or current page URL on Reddit.
 *
 * @param	options	(Optional) The data to share. See {@link SharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 */
export const shareOnReddit = ( options: SharerPopUpOptions = {} ) => {

	const {
		title = document.title, ...rest
	} = options

	const sharer = new URL( 'https://reddit.com/submit' )

	if ( title ) {
		sharer.searchParams.append( 'title', title )
	}

	return openSharerPopUp( { ...rest, sharer } )

}


/**
 * Share URL or current page URL on Weibo.
 *
 * @param	options	(Optional) The data to share. See {@link ClassicSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 */
export const shareOnWeibo = ( options: ClassicSharerPopUpOptions = {} ) => (
	openSharerPopUp( { ...options, sharer: 'https://service.weibo.com/share/share.php' } )
)


/**
 * Share URL or current page URL on VK.
 *
 * @param	options	(Optional) The data to share. See {@link ClassicSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 */
export const shareOnVK = ( options: ClassicSharerPopUpOptions = {} ) => (
	openSharerPopUp( { ...options, sharer: 'https://vk.com/share.php' } )
)


/**
 * Share URL or current page URL on Tumblr.
 *
 * @param	options	(Optional) The data to share. See {@link ClassicSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 */
export const shareOnTumblr = ( options: ClassicSharerPopUpOptions = {} ) => (
	openSharerPopUp( { ...options, sharer: 'https://tumblr.com/widgets/share/tool', urlParam: 'canonicalUrl' } )
)


/**
 * Share URL or current page URL on Line.
 *
 * @param	options	(Optional) The data to share. See {@link ClassicSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 */
export const shareOnLine = ( options: ClassicSharerPopUpOptions = {} ) => (
	openSharerPopUp( { ...options, sharer: 'https://social-plugins.line.me/lineit/share' } )
)

/**
 * Share URL or current page URL on X.
 *
 * @param	options	(Optional) The data to share. See {@link ClassicSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 */
export const shareOnX = ( options: ClassicSharerPopUpOptions = {} ) => (
	openSharerPopUp( { ...options, sharer: 'https://x.com/intent/tweet' } )
)


/**
 * Share URL or current page URL on LinkedIn.
 *
 * @param	options	(Optional) The data to share. See {@link ClassicSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 */
export const shareOnLinkedIn = ( options: ClassicSharerPopUpOptions = {} ) => (
	openSharerPopUp( { ...options, sharer: 'https://linkedin.com/sharing/share-offsite' } )
)


/**
 * Share URL or current page URL on Telegram.
 *
 * @param	options	(Optional) The data to share. See {@link ClassicSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 */
export const shareOnTelegram = ( options: ClassicSharerPopUpOptions = {} ) => (
	openSharerPopUp( { ...options, sharer: 'https://telegram.me/share/url' } )
)


/**
 * Share URL or current page URL on Pinterest.
 *
 * @param	options	(Optional) The data to share. See {@link PinterestSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 */
export const shareOnPinterest = ( options: PinterestSharerPopUpOptions = {} ) => {


	const {
		url = location, media,
		description = document.title || document.querySelector( '[name="description"]' )?.getAttribute( 'content' ),
		...rest
	} = options


	const u			= Url.format( url )
	const sharer	= new URL( 'https://pinterest.it/pin-builder' )

	sharer.searchParams.append( 'method', 'button' )
	sharer.searchParams.append( 'media', media ? Url.format( media ) : u )

	if ( description ) {
		sharer.searchParams.append( 'description', description )
	}

	return openSharerPopUp( { ...rest, url, sharer } )

}


/**
 * Share URL or current page URL via WhatsApp.
 *
 * @param	options	(Optional) The data to share. See {@link WhatsAppSharerPopUpOptions} for more info.
 * @returns	The `WindowProxy` object of the new context, `null` otherwise. See {@link openBrowserPopUp} for more info.
 */
export const shareOnWhatsApp = ( options: WhatsAppSharerPopUpOptions = {} ) => {

	const {
		url = location, text, ...rest
	} = options

	const u				= Url.format( url )
	const destination	= new URL( 'https://api.whatsapp.com/send' )
	const finalText		= text ? `${ text }\n\n${ u }` : u
	destination.search	= new URLSearchParams( { text: finalText } ).toString()

	return openBrowserPopUp( { url: destination, ...rest, context: 'sharer' } )

}