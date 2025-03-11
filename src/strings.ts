import { isValidDate } from '@alessiofrittoli/date-utils'
import { isNumeric } from '@alessiofrittoli/math-utils'

import { isPromise, isString } from './types'
import { isEmpty } from './validation'


/**
 * Make first letter uppercase.
 * 
 * @param	input The input string to convert.
 * @returns	The processed string.
 */
export const ucFirst = ( input: string ): string => (
	input.charAt( 0 ).toUpperCase() + input.slice( 1 )
)


/**
 * Make first letter lowercase.
 * 
 * @param	input The input string to convert.
 * @returns	The processed string.
 */
export const lcFirst = ( input: string ): string => (
	input.charAt( 0 ).toLowerCase() + input.slice( 1 )
)


/**
 * Convert string to camelCase.
 * 
 * @param input The input string to convert.
 * @returns The converted string to camelCase.
 */
export const toCamelCase = ( input: string ) => (
	toKebabCase( input )
		.replace(
			/[-_\s](.)/g, ( match, group1 ) => group1.toUpperCase()
		)
)


/**
 * Convert string to kebab-case string.
 * 
 * @param input The input string to convert.
 * @returns The converted string to kebab-case.
 */
export const toKebabCase = ( input: string ) => (
	input
		.replace(/\s+/g, '-')				// Replace white spaces with hyphens
		.replace(/_/g, '-')					// Replace underscores with hyphens
		.replace( /([A-Z])/g, '-$1' )		// Add '-' before uppercase letters
		.replace( /[^a-zA-Z0-9-]/g, '-' )	// Replace special characters with hyphens
		.replace( /--+/g, '-' )				// Replace multiple hyphens with a single hyphen
		.toLowerCase()						// Convert entire string to lowercase
)


/**
 * Stringify value.
 * 
 * @param	input The value to stringify.
 * @returns	The stringified `input`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stringifyValue = ( input?: any ): string => {
	
	if ( isPromise( input ) ) return ''
	if ( typeof input === 'function' ) return ''

	if ( input instanceof Date && isValidDate( input ) ) {
		return input.toISOString()
	}
	
	if ( input instanceof Map || input instanceof Headers ) {
		return JSON.stringify( Array.from( input.entries() ) )
	}

	if ( typeof input === 'object' ) {
		return JSON.stringify( input )
	}

	return input?.toString() || ''

}


/**
 * Parse stringified value.
 * 
 * @param	input The value to parse.
 * @returns	The parsed `input`.
 */
export const parseValue = <T>( input?: string ): T | undefined => {
	if ( ! input ) return
	
	if ( isString( input ) && isEmpty( input ) ) {
		return
	}

	if ( isNumeric( input ) ) {
		return parseFloat( input ) as T
	}

	try {
		
		const date = new Date( input )
		if ( isValidDate( date ) ) return date as T

		return JSON.parse( input )

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch ( error ) {
		
		return input as T
		
	}
}