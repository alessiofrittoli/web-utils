import { isValidDate } from '@alessiofrittoli/date-utils'
import { isNumeric } from '@alessiofrittoli/math-utils'
import { isPromise, isString } from '@/types'
import { isEmpty } from '@/validation'

/**
 * Stringify value.
 *
 * @param	input The value to stringify.
 * @returns	The stringified `input`.
 */
export const stringifyValue = (input?: unknown): string => {
	if (isPromise(input)) return ''
	if (typeof input === 'function') return ''

	if (input instanceof Date && isValidDate(input)) {
		return input.toISOString()
	}

	if (input instanceof Map || input instanceof Headers) {
		return JSON.stringify(Array.from(input.entries()))
	}

	if (typeof input === 'object') {
		return JSON.stringify(input)
	}

	// oxlint-disable-next-line typescript/no-base-to-string
	return input?.toString() || ''
}

/**
 * Parse stringified value.
 *
 * @param	input The value to parse.
 * @returns	The parsed `input`.
 */
export const parseValue = <T>(input?: string): T | undefined => {
	if (!input) return

	if (isString(input) && isEmpty(input)) {
		return
	}

	if (isNumeric(input)) {
		return parseFloat(input) as T
	}

	try {
		const date = new Date(input)

		if (isValidDate(date)) return date as T

		return JSON.parse(input)
	} catch {
		return input as T
	}
}
