import { getNumbersFromString } from "@alessiofrittoli/math-utils"

/**
 * Represents a tuple of two optional numeric values, typically used for width and height dimensions.
 * 
 */
export type Dimensions = [ x: number | undefined, y: number | undefined ]


/**
 * Represents valid input types for specifying dimensions.
 *
 * Can be provided as:
 * - A single number value
 * - A string value where dimesions are extracte from
 * - A tuple containing `width` and `height` values
 */
export type InputDimensions = string | number | [ xy: Dimensions[ number ] ] | Dimensions


/**
 * Extracts and normalizes dimensions from various input formats.
 * 
 * @param dimensions The input dimensions.
 * 
 * @returns A tuple containing `[number, number]` where either value can be `undefined`.
 * 
 * @example
 * ```ts
 * const [ width, height ] = getDimensions()                // [ undefined, undefined ]
 * const [ width, height ] = getDimensions( 100 )           // [ 100, 100 ]
 * const [ width, height ] = getDimensions( [ 200, 300 ] )  // [ 200, 300 ]
 * const [ width, height ] = getDimensions( [ 200 ] )       // [ 200, 200 ]
 * ```
 */
export const getDimensions = ( dimensions?: InputDimensions ): Dimensions => {

	if ( typeof dimensions === 'undefined' ) {
		return [ undefined, undefined ]
	}

	if ( typeof dimensions === 'string' ) {
		const [, xy ] = getNumbersFromString( dimensions )
		const [ x, y ] = xy || [ undefined, undefined ]
		return getDimensions( [ x, y ] )
	}

	if ( ! Array.isArray( dimensions ) ) {
		return getDimensions( [ dimensions, dimensions ] )
	}

	const [ x, y ] = dimensions

	const validX = isNaN( x ?? 0 ) ? 0 : x
	const validY = isNaN( y ?? 0 ) ? 0 : y

	return [
		validX ?? validY, validY ?? validX
	]

}