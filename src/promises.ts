/**
 * zZzZzZzZzZzZzZzZz.
 * 
 * @param	time The sleep time in milliseconds.
 * @returns	A new Promise which get resolved after the specified time.
 */
export const sleep = ( time: number ) => new Promise<void>( resolve => setTimeout( resolve, time ) )