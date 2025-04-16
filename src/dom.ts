/**
 * Prevent Element Overflow.
 * 
 * @param el (Optional) The target Element. Default: `Document`.
 */
export const blockScroll = ( el?: HTMLElement ) => {

	const _el			= el || document.documentElement
	const { width }		= _el.getBoundingClientRect()
	_el.style.overflow	= 'hidden'
	const scrollBarSize	= _el.clientWidth - width

	_el.style.paddingRight	= `${ scrollBarSize }px`
	_el.style.setProperty( '--scrollbar-size', `${ scrollBarSize }px` )

}


/**
 * Restore Element Overflow.
 * 
 * @param el (Optional) The target Element. Default: `Document`.
 */
export const restoreScroll = ( el?: HTMLElement ) => {

	const $el = el || document.documentElement
	
	$el.style.removeProperty( 'overflow' )
	$el.style.removeProperty( 'padding-right' )
	$el.style.removeProperty( '--scrollbar-size' )

}