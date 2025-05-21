/**
 * Removes duplicate values from an array.
 * 
 * @param	array The input array.
 * @returns	The filtered array.
 */
export const arrayUnique = <T>( array: T[] ): T[] => (
	array.length <= 0
		? array
		: [ ...new Set( array ) ]
)


/**
 * Removes duplicate entries from an array referencing an object key.
 * 
 * @param	array		An array of objects.
 * @param	property	The Object property to refer to.
 * @returns The filtered array.
 */
export const arrayObjectUnique = <T>( array: T[], property: keyof T ): T[] => {
	if ( array.length <= 0 ) return array

	const map = new Map()

	array.map( entry => {
		if ( ! map.has( entry[ property ] ) ) map.set( entry[ property ], entry )
	} )

	return Array.from( map.values() )
}


/**
 * Convert a stringified Array to Array object.
 * 
 * @param	string The string to convert. ( e.g. `value1, value2` or `value1,value2` )
 * @returns	The converted string Array.
 */
export const listToArray = ( string: string ) => (
	string
		.replace( /\s/g, '' )
		.split( ',' )
		.filter( Boolean )
)


export type ChunkIntoOptions = (
	{
		/**
		 * Will split the given Array in a way to ensure each chunk length is, whenever possible, equal to the given value.
		 * 
		 */
		size: number
		count?: never
	} | {
		/**
		 * Will split the given Array in a way to ensure n chunks as the given value.
		 * 
		 */
		count: number
		size?: never
	}
)


/**
 * Split Array into chunks.
 * 
 * @template T The input `array` type.
 * 
 * @param	array	The original Array.
 * @param	options An object defining split criteria. See {@link ChunkIntoOptions} for more info.
 * 
 * @returns	An Array of chunks.
 */
export function chunkInto<
	T extends unknown[]
>( array: T, options: ChunkIntoOptions ): T[]
{

	const chunkSize		= options && 'size' in options && options.size
	const chunksCount	= options && 'count' in options && options.count
	const size			= chunksCount ? Math.ceil( array.length / chunksCount ) : ( chunkSize || 1 )
	const length		= chunksCount || Math.ceil( array.length / size )

	return (
		Array.from( { length }, ( value, index ) => (
			array.slice( index * size, index * size + size )
		) ).filter( array => array.length > 0 )
	) as T[]

}