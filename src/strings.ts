/**
 * Make first letter uppercase.
 * 
 * @returns	string
 */
export const ucFirst = ( string: string ): string => (
	string.charAt( 0 ).toUpperCase() + string.slice( 1 )
)