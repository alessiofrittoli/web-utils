/**
 * Prevent Element Overflow.
 * 
 * @param target (Optional) The target HTMLElement. Default: `Document.documentElement`.
 */
export const blockScroll = ( target?: HTMLElement ) => {

	const el			= target || document.documentElement
	const { width }		= el.getBoundingClientRect()
	el.style.overflow	= 'hidden'
	const scrollBarSize	= el.clientWidth - width

	el.style.paddingRight	= `${ scrollBarSize }px`
	el.style.setProperty( '--scrollbar-size', `${ scrollBarSize }px` )

}


/**
 * Restore Element Overflow.
 * 
 * @param target (Optional) The target HTMLElement. Default: `Document.documentElement`.
 */
export const restoreScroll = ( target?: HTMLElement ) => {

	const el = target || document.documentElement
	
	el.style.removeProperty( 'overflow' )
	el.style.removeProperty( 'padding-right' )
	el.style.removeProperty( '--scrollbar-size' )

}