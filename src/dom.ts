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
 * Represents a style input.
 * 
 * 
 * @property {UrlInput} - A URL string or input pointing to an external stylesheet
 * @property {HTMLStyleElement} - An HTML style element containing CSS rules
 * @property {CSSStyleSheet} - A CSS stylesheet object
 * @property {StyleSheetList} - A collection of CSS stylesheets
 */
export type Style = UrlInput | HTMLStyleElement | CSSStyleSheet | StyleSheetList


/**
 * Represents a single style object or an array of style objects.
 * 
 * @typeParam Style The style object type. See {@link Style}.
 */
export type Styles = Style | Style[]


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
export const cloneStyleSheetList = ( styles: StyleSheetList | CSSStyleSheet[] ) => (
	[ ...styles ].map( ( { cssRules } ) => {
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
 * Clones style sheets from various sources into new `HTMLStyleElement` instances.
 * 
 * @param styles A single style source or array of style sources. Can be:
 *   - `StyleSheetList`: A list of stylesheets
 *   - `CSSStyleSheet`: A single stylesheet object
 *   - `HTMLStyleElement`: A style DOM element
 *   - `UrlInput`: A URL string or object pointing to a stylesheet
 * 
 * @returns A promise that resolves to an array of cloned `HTMLStyleElement` nodes.
 *   Each element is a new style element containing the CSS rules from the source.
 */
export const cloneStyleSheets = async ( styles: Styles ): Promise<HTMLStyleElement[]> => {

	if ( ! Array.isArray( styles ) ) {
		return cloneStyleSheets( [ styles ] )
	}

	const styleNodes: HTMLStyleElement[]	= []
	const styleSheetList: StyleSheetList[]	= []
	const styleSheets: CSSStyleSheet[]		= []
	const styleElements: HTMLStyleElement[]	= []
	const styleUrls: UrlInput[]				= []

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

			const { data, error } = await fetch<string>( Url.format( urlInput ) )

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