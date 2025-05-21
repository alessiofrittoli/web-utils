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