import { getTypedMap } from '@/map'
import { Url, type UrlInput } from '@alessiofrittoli/url-utils'

export type Truthy = 'yes' | '1' | 'true'
export type Falsey = 'no' | '0' | 'false'

export interface WindowFeatures
{
	/**
	 * Indicates that you want the browser to send an [Attribution-Reporting-Eligible](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Attribution-Reporting-Eligible) header along with the `open()` call.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#attributionsrc)
	*/
	attributionsrc?: Truthy
	/**
	 * By default, window.open opens the page in a new tab. If popup is set to true, it requests that a minimal popup window be used.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#popup)
	 */
	popup?: Truthy | Falsey
	/**
	 * Specifies the width of the content area, including scrollbars. The minimum required value is 100.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#width)
	 */
	width?: string
	/**
	 * Specifies the height of the content area, including scrollbars. The minimum required value is 100.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#height)
	 */
	height?: string
	/**
	 * Specifies the distance in pixels from the left side of the work area as defined by the user's operating system where the new window will be generated.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#left)
	 */
	left?: string
	/**
	 * Specifies the distance in pixels from the top side of the work area as defined by the user's operating system where the new window will be generated.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#top)
	 */
	top?: string
	/**
	 * If this feature is set, the new window will not have access to the originating window via `Window.opener` and returns `null`.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#noopener)
	 */
	noopener?: '_top' | '_self' | '_parent'
	/**
	 * If this feature is set, the browser will omit the [Referer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referer) header, as well as set `noopener` to true.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/open#noreferrer)
	 */
	noreferrer?: Truthy | Falsey
}


type OptionsFeatures = (
	Omit<WindowFeatures, (
		| 'popup' | 'width' | 'height' | 'innerWidth' | 'innerHeight'
	)>
)


export interface OpenBrowserPopUpOptions
{
	/**
	 * The URL or path of the resource to be loaded.
	 * 
	 * If an empty string ("") is specified or this parameter is omitted, a blank page is opened into the targeted browsing context.
	 */
	url?: UrlInput
	/** The PopUp width. Default: `600`. */
	width?: number
	/** The PopUp height. Default: `800`. */
	height?: number
	/** A string, without whitespace, specifying the name of the browsing context the resource is being loaded into. */
	context?: string
	/** Additional custom PopUp features. */
	features?: OptionsFeatures
}


/**
 * Open Window PopUp.
 * 
 * @param options An object defining custom PopUp options. See {@link OpenBrowserPopUpOptions} interface for more informations.
 * 
 * @returns If the browser successfully opens the new browsing context, a WindowProxy object is returned.
 * 			The returned reference can be used to access properties and methods of the new context as long as it complies
 * 			with the same-origin policy security requirements.
 * 			`null` is returned if the browser fails to open the new browsing context, for example because it was blocked
 * 			by a browser popup blocker.
 * 
 * 
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)
 */
export const openBrowserPopUp = ( options: OpenBrowserPopUpOptions = {} ): WindowProxy | null => {

	const width		= Math.max( 100, options.width || 600 )
	const height	= Math.max( 100, options.height || 800 )

	const { url, context }	= options
	const { features = {} }	= options

	const {
		left	= ( window.screen.width / 2 ) - ( ( width / 2 ) + 10 ),
		top		= ( window.screen.height / 2 ) - ( ( height / 2 ) + 50 ),
		...restFeatures
	} = features
	
	const parsedFeatures = getTypedMap<WindowFeatures>( [
		[ 'popup',	'yes' ],
		[ 'width',	width.toString() ],
		[ 'height',	height.toString() ],
		[ 'left',	left.toString() ],
		[ 'top',	top.toString() ],
	] )
	
	Object.entries( restFeatures ).map( ( [ key, value ] ) => {
		parsedFeatures.set( key as keyof WindowFeatures, value )
	} )

	const featuresString = (
		Array.from( parsedFeatures )
			.map( k => k.join( '=' ) )
			.join( ',' )
	)

	return (
		window.open(
			url ? Url.format( url ) : url,
			context,
			featuresString,
		)
	)

}