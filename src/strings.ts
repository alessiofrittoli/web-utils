import { isValidDate } from '@alessiofrittoli/date-utils'
import { isNumeric } from '@alessiofrittoli/math-utils'

import { isPromise, isString } from './types'
import { isEmpty } from './validation'
import { escapeRegExpCharSet } from './regex'


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


/**
 * Add leading character to a string.
 * 
 * The given `input` won't be modified if it already contains the given `character`.
 * 
 * @param	input		The string to process.
 * @param	character	The character to add.
 * @param	search		( Optional ) A custom search expression. Default `character`.
 * 
 * @returns	The given string with leading character.
 */
export const addLeadingCharacter = ( input: string, character: string, search: string | RegExp = character ) => {
	if ( typeof input !== 'string' ) throw new TypeError( 'Input must be a string.' )
	
	const regEx = (
		search instanceof RegExp
			? search
			: new RegExp( `^[${ escapeRegExpCharSet( search ) }]?` )
	)
	
	return input.replace( regEx, character )
}


/**
 * Remove leading character from a string.
 * 
 * @param	input		The string to process.
 * @param	character	The character to remove.
 * 
 * @returns	The given string with leading character removed.
 */
export const removeLeadingCharacter = ( input: string, character: string | RegExp ) => {
	if ( typeof input !== 'string' ) throw new TypeError( 'Input must be a string.' )
	
	const regEx = (
		character instanceof RegExp
			? character
			: new RegExp( `^[${ escapeRegExpCharSet( character ) }]+` )
	)

	return input.replace( regEx, '' )
}


/**
 * Add trailing character to a string.
 * 
 * The given `input` won't be modified if it already contains the given `character`.
 * 
 * @param	input		The string to process.
 * @param	character	The character to add.
 * @param	search		( Optional ) A custom search expression. Default `character`.
 * 
 * @returns	The given string with trailing character.
 */
export const addTrailingCharacter = ( input: string, character: string, search: string | RegExp = character ) => {
	if ( typeof input !== 'string' ) throw new TypeError( 'Input must be a string.' )
	
	const regEx = (
		search instanceof RegExp
			? search
			: new RegExp( `[${ escapeRegExpCharSet( search ) }]?$` )
	)

	return input.replace( regEx, character )
}


/**
 * Remove trailing character from a string.
 * 
 * @param	input		The string to process.
 * @param	character	The character to remove.
 * 
 * @returns	The given string with trailing character removed.
 */
export const removeTrailingCharacter = ( input: string, character: string | RegExp ) => {
	if ( typeof input !== 'string' ) throw new TypeError( 'Input must be a string.' )
	
	const regEx = (
		character instanceof RegExp
			? character
			: new RegExp( `[${ escapeRegExpCharSet( character ) }]?$` )
	)
	return input.replace( regEx, '' )
}


export type Recipient = string | {
	/**
	 * The recipient name.
	 * 
	 */
	name?: string
	/**
	 * The recipient email address.
	 * 
	 */
	email: string
}

export type Recipients = Recipient | Recipient[]


/**
 * Converts a single recipient or an array of recipients into a comma-separated string.
 *
 * Each recipient can be either a string (email address) or an object with at least an `email` property,
 * and optionally a `name` property. If the recipient is an object and has a `name`, the output will be
 * formatted as `"Name<email>"`. If the `name` is missing, only the email will be used.
 *
 * @param recipients A single `Recipient` or an array of `Recipient`. Each recipient can be a string or an object with `email` and optional `name`.
 * @returns A comma-separated string of recipients formatted as `"Name<email>"` or just `"email"`.
 */
export const recipientsToString = ( recipients: Recipients ): string => {

	if ( ! Array.isArray( recipients ) ) {
		return recipientsToString( [ recipients ] )
	}

	return (
		recipients
			.filter( Boolean )
			.map( recipient => {
				if ( typeof recipient !== 'string' ) {

					if ( ! recipient.email ) return null

					const name	= recipient.name?.trim()
					const email	= recipient.email.trim()

					if ( ! name ) return email
					
					return `${ name }<${ email }>`

				}
				return recipient.trim()
			} )
			.filter( Boolean ).join( ',' )
	)

}


export interface EmailData
{
	/**
	 * The email recipients.
	 * 
	 */
	to?: Recipients
	/**
	 * The email carbon copy recipients.
	 * 
	 */
	cc?: Recipients
	/**
	 * The email blind carbon copy recipients.
	 * 
	 */
	bcc?: Recipients
	/**
	 * The email subject.
	 * 
	 */
	subject?: string
	/**
	 * The email body.
	 * 
	 */
	body?: string
}


/**
 * Converts an `EmailData` object into a properly formatted mailto URL string.
 *
 * This function constructs a mailto link using the provided email data, including
 * recipients, subject, body, CC, and BCC fields. It encodes the parameters as URL
 * search parameters and concatenates them to form a valid mailto URI.
 *
 * @param data The email data to convert. If omitted, defaults to an empty object.
 * @returns A string representing the mailto URL.
 */
export const emailDataToString = (
	data: EmailData = {},
) => {
	const { to, body, subject, cc, bcc } = data

	const searchParams = new URLSearchParams()

	if ( body ) {
		searchParams.append( 'body', body )
	}

	if ( subject ) {
		searchParams.append( 'subject', subject )
	}

	if ( cc ) {
		const ccString = recipientsToString( cc )
		if ( ccString ) {
			searchParams.append( 'cc', ccString )
		}
	}

	if ( bcc ) {
		const bccString = recipientsToString( bcc )
		if ( bccString ) {
			searchParams.append( 'bcc', bccString )
		}
	}

	return [
		'mailto:',
		to && recipientsToString( to ),
		searchParams.size > 0 && `?${ searchParams.toString().replace( /\+/g, ' ' ) }`,
	].filter( Boolean ).join( '' )

}