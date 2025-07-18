/**
 * zZzZzZzZzZzZzZzZz.
 * 
 * @param	time The sleep time in milliseconds.
 * @returns	A new Promise which get resolved after the specified time.
 */
export const sleep = ( time: number ) => new Promise<void>( resolve => setTimeout( resolve, time ) )


/**
 * The deffered task function definition.
 * 
 * @template T The task function arguments.
 */
export type DeferredTask<T extends unknown[]> = ( ...args: T ) => unknown | Promise<unknown>


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
 * 
 * @example
 *
 * ```ts
 * const longTask = ( event: Event ) => {
 * 	...
 * }
 *
 * button.addEventListener( 'click', event => {
 * 	deferTask( longTask, event )
 * } )
 * ```
 */
export const deferTask = <
	T extends DeferredTask<U>,
	U extends unknown[],
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

		if ( typeof requestAnimationFrame !== 'function' ) {
			return tick()
		}

		requestAnimationFrame( tick )

	} )
)


/**
 * Defer task handler so main-thread is not blocked in order to quickly paint and respond to user interaction.
 * 
 * It esponentially decrease INP process timings.
 * 
 * @template T The task function definition.
 * @template U The task function arguments.
 * 
 * @param task The task callable function.
 * @param args Arguments required by the given `task` function.
 * 
 * @returns A new handler which returns a new Promise that returns the `task` result once fulfilled.
 * 
 * @example
 *
 * ```ts
 * const longTask = ( event: Event ) => {
 * 	...
 * }
 *
 * button.addEventListener( 'click', deferCallback( longTask ) )
 * ```
 */
export const deferCallback = <
	T extends DeferredTask<U>,
	U extends unknown[],
>( task: T ): ( ...args: U ) => Promise<Awaited<ReturnType<T>>> => (
	( ...args: U ) => deferTask( task, ...args )
)