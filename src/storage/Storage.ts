import { isValidDate } from '@alessiofrittoli/date-utils'
import { isNumeric } from '@alessiofrittoli/math-utils'

import { isPromise, isString } from '@/types'
import { isEmpty } from '@/validation'

import { LocalStorage } from './LocalStorage'


/**
 * A utility class for handling storage operations.
 * 
 * This class provides methods to stringify and parse values for storage,
 * and includes references to Cookie, LocalStorage, and SessionStorage utilities.
 */
export class Storage
{
	/**
	 * Stringify value.
	 * 
	 * @param	value The `value` to stringify.
	 * @returns	The stringified `value`, safe to store with [Document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) and [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API).
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static stringifyValue( value?: any ): string
	{
		
		if ( isPromise( value ) ) return ''
		if ( typeof value === 'function' ) return ''

		if ( value instanceof Date && isValidDate( value ) ) {
			return value.toISOString()
		}
		
		if ( value instanceof Map || value instanceof Headers ) {
			return JSON.stringify( Array.from( value.entries() ) )
		}

		if ( typeof value === 'object' ) {
			return JSON.stringify( value )
		}

		return value?.toString() || ''

	}


	/**
	 * Parse stringified value.
	 * 
	 * @param	value The `value` to parse.
	 * @returns	The parsed `value`.
	 */
	static parseValue<T>( value?: string ): T | undefined
	{
		if ( ! value ) return
		
		if ( isString( value ) && isEmpty( value ) ) {
			return
		}

		if ( isNumeric( value ) ) {
			return parseFloat( value ) as T
		}

		try {
			
			const date = new Date( value )
			if ( isValidDate( date ) ) return date as T

			return JSON.parse( value )

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch ( error ) {
			
			return value as T
			
		}
	}


	/**
	 * Reference to the {@link LocalStorage} storage utility.
	 */
	static local = LocalStorage
}