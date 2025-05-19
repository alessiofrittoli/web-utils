/**
 * Removes duplicate values from an array.
 * 
 * @param	array The input array.
 * @returns	The filtered array.
 */
export const arrayUnique = <T>( array: T[] ) => (
	[ ...new Set( array ) ]
)


/**
 * Removes duplicate entries from an array referencing an object key.
 * 
 * @param	array		An array of objects.
 * @param	property	The Object property to refer to.
 * @returns 
 */
export const arrayObjectUnique = <T>( array: T[], property: keyof T ) => (
	Array.from( new Map(
		array.map( entry => [ entry[ property ], entry ] )
	).values() )
)
