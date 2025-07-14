/**
 * zZzZzZzZzZzZzZzZz.
 * 
 * @param	time The sleep time in milliseconds.
 * @returns	A new Promise which get resolved after the specified time.
 */
export const sleep = ( time: number ) => new Promise<void>( resolve => setTimeout( resolve, time ) )


/**
 * Defer task so main-thread is not blocked in order to quickly paint and respond to user interaction.
 * 
 * It can decrease INP process timing up to 400x than long blocking tasks.
 * 
 * @template T The task compatible function.
 * @param task The task callable function.
 * 
 * @returns A new Promise which returns the `task` result once fulfilled.
 */
export const deferTask = <T extends () => unknown | Promise<unknown>>( task: T ): Promise<Awaited<ReturnType<T>>> => (
	new Promise<Awaited<ReturnType<T>>>( ( resolve, reject ) => {
		const tick = () => {
			setTimeout( async () => {
				try {
					resolve( ( await task() ) as Awaited<ReturnType<T>> )
				} catch ( error ) {
					reject( error )
				}
			}, 0 )
		}		

		if ( typeof requestAnimationFrame !== 'function' ) return tick()

		requestAnimationFrame( tick )
	} )
)