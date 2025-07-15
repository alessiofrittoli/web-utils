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
 * It esponentially decrease INP process timings.
 * 
 * @template T The task function definition.
 * @template U The task function arguments.
 * 
 * @param task The task callable function.
 * @param args Arguments required by the given `task` function.
 * 
 * @returns A new Promise which returns the `task` result once fulfilled.
 */
export const deferTask = <
	T extends ( ...args: U ) => unknown | Promise<unknown>,
	U extends unknown[]
>( task: T, ...args: U ): Promise<Awaited<ReturnType<T>>> => (
	new Promise<Awaited<ReturnType<T>>>( ( resolve, reject ) => {
		const tick = () => {
			setTimeout( async () => {
				try {
					resolve( ( await task( ...args ) ) as Awaited<ReturnType<T>> )
				} catch ( error ) {
					reject( error )
				}
			}, 0 )
		}		

		if ( typeof requestAnimationFrame !== 'function' ) return tick()

		requestAnimationFrame( tick )
	} )
)