/**
 * Removes duplicate values from an array.
 * 
 * @param	array The input array.
 * @returns	The filtered array.
 */
export const arrayUnique = <T>( array: T[] ) => (
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
export const arrayObjectUnique = <T>( array: T[], property: keyof T ) => {
	if ( array.length <= 0 ) return array

	const map = new Map()

	array.map( entry => {
		if ( ! map.has( entry[ property ] ) ) map.set( entry[ property ], entry )
	} )

	return Array.from( map.values() )
}