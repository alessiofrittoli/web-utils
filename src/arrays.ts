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


/**
 * Shuffle the elements of an array in place using the [Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).
 *
 * @template	T		The type of elements in the array.
 * @param		array	The array to shuffle.
 * 
 * @returns The shuffled array.
 */
export const shuffle = <T>( array: Array<T> ) => {
	for ( let i = array.length - 1; i > 0; i-- ) {
		const j = Math.floor( Math.random() * ( i + 1 ) )
		;[ array[ i ], array[ j ] ] = [ array[ j ]!, array[ i ]! ]
	}
	return array
}


/**
 * Copy and shuffle the elements of an array in place using the [Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).
 *
 * @template	T		The type of elements in the array.
 * @param		array	The array to shuffle.
 * 
 * @returns The shuffled array.
 */
export const shuffleCopy = <T>( array: Array<T> ) => shuffle( [ ...array ] )


/**
 * Normalize negative indexes to a positive value.
 * 
 * @param	index	The index.
 * @param	length	The array length.
 * 
 * @returns	The normalized index.
 */
export const normalizeIndex = ( index: number, length: number ) => (
	Math.abs( ( ( index % length ) + length ) % length )
)


/**
 * Get the previous index.
 * 
 * @param	length	The array length.
 * @param	index	The index.
 * 
 * @returns	The previous index.
 */
export const getPreviousIndex = ( length: number, index: number = 0 ) => (
	normalizeIndex( index - 1, length )
)


/**
 * Get the next index.
 * 
 * @param	length	The array length.
 * @param	index	The index.
 * 
 * @returns	The next index.
 */
export const getNextIndex = ( length: number, index: number = 0 ) => (
	normalizeIndex( index + 1, length )
)


/**
 * Inserts one or more items into an array at the specified index position.
 *
 * @template T The type of elements in the array.
 * 
 * @param array	The original array to insert items into.
 * @param item	A single item or an array of items to insert.
 * @param index	The index after which to insert the item(s). Default: `-1`.
 * 
 * @returns A new array with the item(s) inserted at the specified position.
 *
 * @example
 * ```ts
 * insertAfter( [ 1, 2, 4 ], 3, 1 )     // [ 1, 2, 3, 4 ]
 * insertAfter( [ 1, 2 ], [ 3, 4 ], 1 ) // [ 1, 2, 3, 4 ]
 * ```
 */
export const insertAfter = <T>(
	array	: T[],
	item	: T | T[],
	index	: number = -1,
): T[] => [
	...array.slice( 0, normalizeIndex( index, array.length ) + 1 ),
	...( Array.isArray( item ) ? item : [ item ] ),
	...array.slice( normalizeIndex( index, array.length ) + 1 ),
]


/**
 * Options for locating the index of the first object whose field matches a value.
 *
 * @template T The object type stored in the array.
 * @template U The key of `T` used for the comparison.
 */
export interface FindInxeByOptions<T extends object, U extends keyof T = keyof T>
{
	/**
	 * The collection to search.
	 * 
	 */
	items: T[]
	/**
	 * The object field to compare against `value`.
	 * 
	 */
	field: U
	/**
	 * The value that must match the selected field.
	 * 
	 */
	value: T[ U ]
}


/**
 * Finds the index of the first object whose selected field strictly equals the provided value.
 * 
 * @param options The search options.
 * @returns The index of the matching item, or `-1` when no match is found.
 */
export const findIndexBy = <T extends object, U extends keyof T = keyof T>( options: FindInxeByOptions<T, U> ) => (
	options.items.findIndex( item => item[ options.field ] === options.value )
)
