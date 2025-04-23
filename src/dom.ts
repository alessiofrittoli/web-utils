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