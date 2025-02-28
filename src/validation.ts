/* eslint-disable no-useless-escape */
/**
 * Check if string is not an empty string.
 * 
 * @param	string The string to check.
 * 
 * @returns	True if string is not empty, false otherwise.
 */
export const isNotEmpty = ( string: string ) => string.trim().length > 0


/**
 * Check if string is an empty string.
 * 
 * @param	string The string to check.
 * 
 * @returns	True if string is empty, false otherwise.
 */
export const isEmpty = ( string: string ) => ! isNotEmpty( string )


/**
 * Check whether email is valid.
 * 
 * @param	email The email to check.
 * 
 * @returns True if the email is valid, false otherwise.
 */
export const isValidEmail = ( email: string ) => /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/.test( email )


/**
 * Check whether phone number is valid.
 * 
 * @param	phone The phone number to check.
 * 
 * @supported
 * 
 * - (123) 456-7890
 * - +(123) 456-7890
 * - +(123)-456-7890
 * - +(123) - 456-7890
 * - +(123) - 456-78-90
 * - 123-456-7890
 * - 123.456.7890
 * - 1234567890
 * - +393204567890
 * - +39 320 456 7890
 * - 00393204567890
 * - 075-63546725
 * 
 * @returns True if the phone number is valid, false otherwise.
 */
export const isValidPhoneNumber = ( phone: string ) => /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]{8,14}$/g.test( phone )


/**
 * Check whether the given string is a valid VAT number.
 * @param	s The string to test.
 * @returns	True if the given string is a valid VAT number, false otherwise.
 */
export const isValidVat = ( s: string ) => (
	/^(ATU[0-9]{8}|BE[01][0-9]{9}|BG[0-9]{9,10}|HR[0-9]{11}|CY[A-Z0-9]{9}|CZ[0-9]{8,10}|DK[0-9]{8}|EE[0-9]{9}|FI[0-9]{8}|FR[0-9A-Z]{2}[0-9]{9}|DE[0-9]{9}|EL[0-9]{9}|HU[0-9]{8}|IE([0-9]{7}[A-Z]{1,2}|[0-9][A-Z][0-9]{5}[A-Z])|IT[0-9]{11}|LV[0-9]{11}|LT([0-9]{9}|[0-9]{12})|LU[0-9]{8}|MT[0-9]{8}|NL[0-9]{9}B[0-9]{2}|PL[0-9]{10}|PT[0-9]{9}|RO[0-9]{2,10}|SK[0-9]{10}|SI[0-9]{8}|ES[A-Z]([0-9]{8}|[0-9]{7}[A-Z])|SE[0-9]{12}|GB([0-9]{9}|[0-9]{12}|GD[0-4][0-9]{2}|HA[5-9][0-9]{2}))$/g.test( s.trim() )
)


/**
 * Check if value is less then another value.
 * 
 * @param	a		The number being compared.
 * @param	value	The value to compare.
 * 
 * @returns	True if given `value` is less than `a`, false otherwise.
 */
export const isLessThan = ( a: number, value: number | string = 0 ) => (
	typeof value === 'string' ? value.trim().length < a : value < a
)


/**
 * Check if value is greater then another value.
 * 
 * @param	a		The number being compared.
 * @param	value	The value to compare.
 * 
 * @returns	True if given `value` is greater than `a`, false otherwise.
 */
export const isGreaterThan = ( a: number, value: number | string = 0 ) => (
	typeof value === 'string' ? value.trim().length > a : value > a
)


/**
 * Check if value is in a range of two values.
 * 
 * @param	a		The minimum value.
 * @param	b		The maximum value.
 * @param	value	The value to compare.
 * 
 * @returns	True if given `value` is less than `a`, false otherwise.
 */
export const isInRange = ( a: number, b: number, value: number | string = 0 ) => (
	typeof value === 'string'
		? value.trim().length >= a && value.trim().length <= a :
		+value >= +a && +value <= +b
)


/**
 * Check whether value `a` is equal to `b`.
 * 
 * @param	a The first value to check.
 * @param	b The second value to check.
 * 
 * @returns True if `a` and `b` are equal, false otherwise.
 */
export const isStrictEqual = ( a: unknown, b: unknown ) => a === b


/**
 * Detect if input contains SQL statements.
 * 
 * @param	value The value to check. 
 * @returns	True if value contains SQL statements, false otherwise.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSQLStatement = ( value: any ) => (
	typeof value === 'string' && !! value.match( /(SELECT|DELETE|INSERT|UNION|REPLACE)\s.*(FROM|INTO|DISTINCT)|(CREATE|DROP|ALTER|RENAME)\s.*(TABLE|COLUMN|VIEW)|(;\-\-)/gi )
)