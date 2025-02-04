/**
 * Make first letter uppercase.
 * 
 * @returns	string
 */
export const ucFirst = ( string: string ): string => (
	string.charAt( 0 ).toUpperCase() + string.slice( 1 )
)


/**
 * Convert string to kebab-case string.
 * 
 * @param input The input string to convert.
 * @returns The converted string to kebab-case.
 */
export const toKebabCase = ( input: string ) => (
	input
		.replace( /([A-Z])/g, '-$1' )	// Add '-' before uppercase letters
		.toLowerCase()					// Convert entire string to lowercase
)