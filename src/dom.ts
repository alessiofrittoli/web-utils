import { fetch } from '@alessiofrittoli/fetcher/fetch'
import { Url, type UrlInput } from '@alessiofrittoli/url-utils'

/**
 * Prevent Element Overflow.
 * 
 * @param target (Optional) The target HTMLElement. Default: `Document.documentElement`.
 */
export const blockScroll = ( target: HTMLElement = document.documentElement ) => {

	const { width }			= target.getBoundingClientRect()
	target.style.overflow	= 'hidden'
	const scrollBarSize		= Math.max( 0, target.clientWidth - width )

	target.style.paddingRight = `${ scrollBarSize }px`
	target.style.setProperty( '--scrollbar-size', `${ scrollBarSize }px` )

}


/**
 * Restore Element Overflow.
 * 
 * @param target (Optional) The target HTMLElement. Default: `Document.documentElement`.
 */
export const restoreScroll = ( target: HTMLElement = document.documentElement ) => {
	
	target.style.removeProperty( 'overflow' )
	target.style.removeProperty( 'padding-right' )
	target.style.removeProperty( '--scrollbar-size' )

}


/**
 * Represents a URL stylesheet as a simple URL input, URL object or as an object
 * with URL and fetch configuration options.
 */
export type UrlStylesheet = UrlInput | {
	/**
	 * The URL string or a URL object of the stylesheet to load.
	 * 
	 */
	url: UrlInput
	/**
	 * Indicates whether to fetch the given URL.
	 * 
	 * @default false
	 */
	fetch?: boolean
}


/**
 * Represents a style input.
 * 
 * @property {UrlStylesheet}	- A URL string or input pointing to a stylesheet file URL.
 * @property {HTMLStyleElement}	- An HTML style element containing CSS rules.
 * @property {CSSStyleSheet}	- A CSS stylesheet object.
 * @property {StyleSheetList}	- A collection of CSS stylesheets.
 */
export type Style = UrlStylesheet | HTMLStyleElement | CSSStyleSheet | StyleSheetList


/**
 * Represents a single style object or an array of style objects.
 * 
 * @typeParam Style The style object type. See {@link Style}.
 */
export type Styles = Style | Style[]

export type CloneStyleSheetsReturn = ( HTMLStyleElement | HTMLLinkElement )[]


/**
 * Clones a StyleSheetList or array of CSSStyleSheets into an array of `HTMLStyleElement` objects.
 * 
 * This function extracts CSS rules from each stylesheet and creates corresponding `<style>` 
 * elements containing the serialized CSS text. If an error occurs while processing a stylesheet,
 * the error is logged and that stylesheet is skipped.
 * 
 * @param styles The source `StyleSheetList` or array of `CSSStyleSheet` objects to clone.
 * 
 * @returns An array of `HTMLStyleElement` objects, each containing the CSS rules from the source stylesheets.
 *          Failed stylesheets are filtered out and not included in the result.
 * 
 * @example
 * 
 * ```ts
 * const styles = cloneStyleSheetList( document.styleSheets )
 * styles.forEach( style => shadowRoot.appendChild( style ) )
 * ```
 */
const cloneStyleSheetList = ( styleSheets: StyleSheetList | CSSStyleSheet[] ) => (
	[ ...styleSheets ].map( ( { cssRules } ) => {
		try {

			const style = document.createElement( 'style' )

			for ( let i = 0; i < cssRules.length; i++ ) {
				const rule = cssRules[ i ]
				
				if ( ! rule ) continue

				style.appendChild(
					document.createTextNode( rule.cssText )
				)
			}

			return style

		} catch ( error ) {

			console.error( 'Error while cloning styles.', error )

		}
	} ).filter( Boolean ) as HTMLStyleElement[]
)


/**
 * Clones style sheets from various sources into new HTMLStyleElement nodes.
 * 
 * @param styles A style source or array of style sources. Style source an be:
 *   - `StyleSheetList`: A list of stylesheets.
 *   - `CSSStyleSheet` A single stylesheet object.
 *   - `HTMLStyleElement`: A style DOM element.
 *   - `UrlStylesheet`: A URL stylesheet as a simple URL input, URL object or as an object with URL and fetch configuration options.
 * 
 * @returns A promise that resolves to an array of cloned HTMLStyleElement and HTMLLinkElement nodes.
 *   For inline styles and StyleSheetLists, returns HTMLStyleElement nodes.
 *   For URL-based stylesheets, returns HTMLLinkElement nodes (or HTMLStyleElement if fetch is true).
 *   Failed operations are silently ignored.
 * 
 * @remarks
 * - When a URL stylesheet has `fetch: true`, the stylesheet content is fetched and embedded as inline CSS.
 * - When `fetch: false` (default), a link element is created instead.
 * - URL parsing is handled through the Url utility with support for both string and `UrlInput` object formats.
 */
export const cloneStyleSheets = async ( styles: Styles ): Promise<CloneStyleSheetsReturn> => {

	if ( ! Array.isArray( styles ) ) {
		return cloneStyleSheets( [ styles ] )
	}

	const styleNodes: CloneStyleSheetsReturn = []
	
	const styleSheetList: StyleSheetList[]	= []
	const styleSheets: CSSStyleSheet[]		= []
	const styleElements: HTMLStyleElement[]	= []
	const styleUrls: UrlStylesheet[]		= []

	styles.forEach( style => {
		if ( style instanceof StyleSheetList ) {
			styleSheetList.push( style )
			return
		}
		if ( style instanceof CSSStyleSheet ) {
			styleSheets.push( style )
			return
		}
		if ( style instanceof HTMLStyleElement ) {
			styleElements.push( style )
			return
		}

		styleUrls.push( style )
	} )
	
	if ( styleSheetList.length > 0 ) {
		styleNodes.push( ...styleSheetList.flatMap(
			styleSheetList => cloneStyleSheetList( styleSheetList )
		) )
	}

	if ( styleSheets.length > 0 ) {
		styleNodes.push( ...cloneStyleSheetList( styleSheets ) )
	}

	if ( styleElements.length > 0 ) {
		styleNodes.push( ...styleElements.map( style => {
			const target = document.createElement( 'style' )
			target.appendChild(
				document.createTextNode( style.innerText )
			)
			return target
		} ) )
	}

	await Promise.allSettled(
		styleUrls.map( async urlInput => {

			const isUrlString = typeof urlInput === 'string'

			const url = (
				! isUrlString && 'url' in urlInput && Url.format( urlInput.url )
			) || Url.format( urlInput as UrlInput )
			
			const fetchUrl = (
				! isUrlString && 'fetch' in urlInput && urlInput.fetch
			) ?? false

			if ( ! fetchUrl ) {
				const link	= document.createElement( 'link' )
				link.rel	= 'stylesheet'
				link.href	= url

				styleNodes.push( link )

				return link
			}

			
			const { data, error } = await fetch<string>( url )

			if ( error ) throw error

			const style = document.createElement( 'style' )

			style.appendChild(
				document.createTextNode( data )
			)

			styleNodes.push( style )

			return style

		} )
	)

	return styleNodes

}