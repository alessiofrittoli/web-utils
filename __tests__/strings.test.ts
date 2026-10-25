import {
	lcFirst,
	ucFirst,
	toCamelCase,
	toKebabCase,
	recipientsToString,
	emailDataToString,
	parameterized,
} from '@/strings'
import { describe, expect, it } from 'vitest'

describe('ucFirst', () => {
	it('returns the given string with first uppercase letter', () => {
		expect(ucFirst('some string')).toBe('Some string')
	})

	it('throws a TypeError when a non-stirng value is provided', () => {
		// @ts-expect-error negative testing
		expect(() => ucFirst()).toThrow("Cannot read properties of undefined (reading 'charAt')")

		// @ts-expect-error negative testing
		expect(() => ucFirst(undefined)).toThrow("Cannot read properties of undefined (reading 'charAt')")

		// @ts-expect-error negative testing
		expect(() => ucFirst(null)).toThrow("Cannot read properties of null (reading 'charAt')")

		// @ts-expect-error negative testing
		expect(() => ucFirst(false)).toThrow('input.charAt is not a function')

		// @ts-expect-error negative testing
		expect(() => ucFirst(true)).toThrow('input.charAt is not a function')

		// @ts-expect-error negative testing
		expect(() => ucFirst(1)).toThrow('input.charAt is not a function')

		// @ts-expect-error negative testing
		expect(() => ucFirst({})).toThrow('input.charAt is not a function')

		// @ts-expect-error negative testing
		expect(() => ucFirst(() => {})).toThrow('input.charAt is not a function')

		// @ts-expect-error negative testing
		expect(() => ucFirst([])).toThrow('input.charAt is not a function')
	})
})

describe('lcFirst', () => {
	it('returns the given string with first lowercase letter', () => {
		expect(lcFirst('Some string')).toBe('some string')
	})

	it('throws a TypeError when a non-stirng value is provided', () => {
		// @ts-expect-error negative testing
		expect(() => lcFirst()).toThrow("Cannot read properties of undefined (reading 'charAt')")

		// @ts-expect-error negative testing
		expect(() => lcFirst(undefined)).toThrow("Cannot read properties of undefined (reading 'charAt')")

		// @ts-expect-error negative testing
		expect(() => lcFirst(null)).toThrow("Cannot read properties of null (reading 'charAt')")

		// @ts-expect-error negative testing
		expect(() => lcFirst(false)).toThrow('input.charAt is not a function')

		// @ts-expect-error negative testing
		expect(() => lcFirst(true)).toThrow('input.charAt is not a function')

		// @ts-expect-error negative testing
		expect(() => lcFirst(1)).toThrow('input.charAt is not a function')

		// @ts-expect-error negative testing
		expect(() => lcFirst({})).toThrow('input.charAt is not a function')

		// @ts-expect-error negative testing
		expect(() => lcFirst(() => {})).toThrow('input.charAt is not a function')

		// @ts-expect-error negative testing
		expect(() => lcFirst([])).toThrow('input.charAt is not a function')
	})
})

describe('toCamelCase', () => {
	it('replaces a dash, underscore or space prefixed lowercase letters with an uppercase one', () => {
		expect(toCamelCase('font-family')).toBe('fontFamily')

		expect(toCamelCase('background-color')).toBe('backgroundColor')

		expect(toCamelCase('-webkit-align-content')).toBe('WebkitAlignContent')

		expect(toCamelCase('some value')).toBe('someValue')

		expect(toCamelCase('some_value')).toBe('someValue')

		expect(toCamelCase('some value_with mixed_Cases')).toBe('someValueWithMixedCases')

		expect(toCamelCase('-string@with#special$characters')).toBe('StringWithSpecialCharacters')
	})
})

describe('toKebabCase', () => {
	it('replaces an uppercase letter with a lowercase one prefixed with a dash', () => {
		expect(toKebabCase('fontFamily')).toBe('font-family')

		expect(toKebabCase('backgroundColor')).toBe('background-color')

		expect(toKebabCase('string with spaces')).toBe('string-with-spaces')

		expect(toKebabCase('string_with_underscores')).toBe('string-with-underscores')

		expect(toKebabCase('WebkitAlignContent')).toBe('-webkit-align-content')

		expect(toKebabCase('some value_with mixed_Cases')).toBe('some-value-with-mixed-cases')

		expect(toKebabCase('-string@with#special$characters')).toBe('-string-with-special-characters')
	})
})

describe('recipientsToString', () => {
	it('returns a single email string as is', () => {
		expect(recipientsToString('test@example.com')).toBe('test@example.com')
	})

	it('returns a single recipient object with name as "Name<email>"', () => {
		expect(recipientsToString({ name: 'John Doe', email: 'john@example.com' })).toBe(
			'John Doe<john@example.com>',
		)
	})

	it('returns a single recipient object without name as just the email', () => {
		expect(recipientsToString({ email: 'john@example.com' })).toBe('john@example.com')
	})

	it('returns a comma-separated string for an array of email strings', () => {
		expect(recipientsToString(['a@example.com', 'b@example.com'])).toBe('a@example.com,b@example.com')
	})

	it('returns a comma-separated string for an array of recipient objects', () => {
		expect(
			recipientsToString([
				{ name: 'Alice', email: 'alice@example.com' },
				{ name: 'Bob', email: 'bob@example.com' },
			]),
		).toBe('Alice<alice@example.com>,Bob<bob@example.com>')
	})

	it('handles a mix of strings and objects', () => {
		expect(
			recipientsToString([
				'test@example.com',
				{ name: 'John', email: 'john@example.com' },
				{ email: 'jane@example.com' },
			]),
		).toBe('test@example.com,John<john@example.com>,jane@example.com')
	})

	it('trims names and emails', () => {
		expect(recipientsToString([{ name: '  John Doe  ', email: '  john@example.com  ' }])).toBe(
			'John Doe<john@example.com>',
		)
	})

	it('skips recipients without email', () => {
		expect(
			recipientsToString([
				//@ts-expect-error negative testing
				{ name: 'No Email' },
				{ email: 'valid@example.com' },
			]),
		).toBe('valid@example.com')
	})

	it('filters out any wrong recipient', () => {
		expect(
			recipientsToString([
				'',
				// @ts-expect-error negative testing
				null,
				// @ts-expect-error negative testing
				undefined,
				// @ts-expect-error negative testing
				true,
				// @ts-expect-error negative testing
				(): void => {},
				{ email: 'a@example.com' },
			]),
		).toBe('a@example.com')
	})
})

describe('emailDataToString', () => {
	it('returns mailto: with only to', () => {
		expect(emailDataToString({ to: 'a@example.com' })).toBe('mailto:a@example.com')
	})

	it('returns mailto: with to and subject', () => {
		expect(emailDataToString({ to: 'a@example.com', subject: 'Hello' })).toBe(
			'mailto:a@example.com?subject=Hello',
		)
	})

	it('returns mailto: with to, subject, and body', () => {
		expect(emailDataToString({ to: 'a@example.com', subject: 'Hello', body: 'World' })).toBe(
			'mailto:a@example.com?body=World&subject=Hello',
		)
	})

	it('returns mailto: with cc and bcc', () => {
		expect(
			emailDataToString({
				to: 'a@example.com',
				cc: ['b@example.com', { name: 'C', email: 'c@example.com' }],
				bcc: 'd@example.com',
			}),
		).toBe('mailto:a@example.com?cc=b%40example.com%2CC%3Cc%40example.com%3E&bcc=d%40example.com')
	})

	it('correclty handles empty recipients', () => {
		expect(
			emailDataToString({
				to: 'a@example.com',
				cc: [''], // cc URL Search Param will not be added.
				bcc: [''], // bcc URL Search Param will not be added.
			}),
		).toBe('mailto:a@example.com')
	})

	it('returns mailto: with all fields', () => {
		expect(
			emailDataToString({
				to: [{ name: 'A', email: 'a@example.com' }, 'b@example.com'],
				cc: { email: 'c@example.com' },
				bcc: [{ name: 'D', email: 'd@example.com' }],
				subject: 'Test Subject',
				body: 'Test Body',
			}),
		).toBe(
			'mailto:A<a@example.com>,b@example.com?body=Test Body&subject=Test Subject&cc=c%40example.com&bcc=D%3Cd%40example.com%3E',
		)
	})

	it('returns mailto: with no to and only params', () => {
		expect(
			emailDataToString({
				subject: 'Recipient is at your choice',
				body: 'Just body',
			}),
		).toBe('mailto:?body=Just body&subject=Recipient is at your choice')
	})

	it('returns mailto: for empty input', () => {
		expect(emailDataToString()).toBe('mailto:')
	})

	it('encodes special characters in params', () => {
		expect(
			emailDataToString({
				to: 'a@example.com',
				subject: 'Hello & Welcome',
				body: 'Line1\nLine2',
			}),
		).toBe('mailto:a@example.com?body=Line1%0ALine2&subject=Hello %26 Welcome')
	})
})

describe('parameterized', () => {
	it('creates a parameterized string with a single value', () => {
		const [string, params] = parameterized`SELECT * FROM users WHERE id = ${1}`

		expect(string).toBe('SELECT * FROM users WHERE id = ?')
		expect(params).toEqual([1])
	})

	it('creates a parameterized string with multiple single values', () => {
		const [string, params] = parameterized`SELECT * FROM users WHERE id = ${1} AND name = ${'John'}`

		expect(string).toBe('SELECT * FROM users WHERE id = ? AND name = ?')
		expect(params).toEqual([1, 'John'])
	})

	it('expands array values into multiple placeholders', () => {
		const [string, params] =
			parameterized`SELECT * FROM users WHERE status IN ( ${['active', 'pending']} )`

		expect(string).toBe('SELECT * FROM users WHERE status IN ( ?, ? )')
		expect(params).toEqual(['active', 'pending'])
	})

	it('handles mixed single and array values', () => {
		const [string, params] =
			parameterized`SELECT * FROM users WHERE id = ${1} AND status IN ( ${['active', 'pending']} )`

		expect(string).toBe('SELECT * FROM users WHERE id = ? AND status IN ( ?, ? )')
		expect(params).toEqual([1, 'active', 'pending'])
	})

	it('normalizes whitespace in the string string', () => {
		const [string, params] = parameterized`SELECT  *  FROM   users   WHERE   id = ${1}`

		expect(string).toBe('SELECT * FROM users WHERE id = ?')
		expect(params).toEqual([1])
	})

	it('trims leading and trailing whitespace', () => {
		const [string, params] = parameterized`  SELECT * FROM users WHERE id = ${1}  `

		expect(string).toBe('SELECT * FROM users WHERE id = ?')
		expect(params).toEqual([1])
	})

	it('skips undefined values', () => {
		const [string, params] =
			// @ts-expect-error negative testing
			parameterized`SELECT * FROM users WHERE id = ${undefined} AND name = ${'John'}`

		expect(string).toBe('SELECT * FROM users WHERE id = AND name = ?')
		expect(params).toEqual(['John'])
	})

	it('handles boolean values', () => {
		const [string, params] = parameterized`SELECT * FROM users WHERE active = ${true}`

		expect(string).toBe('SELECT * FROM users WHERE active = ?')
		expect(params).toEqual([true])
	})

	it('handles numeric values including bigint', () => {
		const [string, params] =
			parameterized`SELECT * FROM users WHERE id = ${42} OR count = ${BigInt(999999999999)}`

		expect(string).toBe('SELECT * FROM users WHERE id = ? OR count = ?')
		expect(params).toEqual([42, BigInt(999999999999)])
	})

	it('handles empty array values', () => {
		const [string, params] = parameterized`SELECT * FROM users WHERE id IN (${[]})`

		expect(string).toBe('SELECT * FROM users WHERE id IN ()')
		expect(params).toEqual([])
	})

	it('handles array with single value', () => {
		const [string, params] = parameterized`SELECT * FROM users WHERE status IN (${['active']})`

		expect(string).toBe('SELECT * FROM users WHERE status IN (?)')
		expect(params).toEqual(['active'])
	})

	it('handles multiple arrays in a string', () => {
		const [string, params] =
			parameterized`SELECT * FROM users WHERE status IN (${['active', 'pending']}) AND id IN (${[1, 2, 3]})`

		expect(string).toBe('SELECT * FROM users WHERE status IN (?, ?) AND id IN (?, ?, ?)')
		expect(params).toEqual(['active', 'pending', 1, 2, 3])
	})

	it('returns correct tuple structure', () => {
		const result = parameterized`SELECT * FROM users WHERE id = ${1}`

		expect(Array.isArray(result)).toBe(true)
		expect(result.length).toBe(2)
		expect(typeof result[0]).toBe('string')
		expect(Array.isArray(result[1])).toBe(true)
	})

	it('handles newlines and tabs in template', () => {
		const [string, params] = parameterized`
			SELECT * FROM users
			WHERE id = ${1}
		`

		expect(string).toBe('SELECT * FROM users WHERE id = ?')
		expect(params).toEqual([1])
	})
})
