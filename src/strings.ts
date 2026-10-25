/**
 * Make first letter uppercase.
 *
 * @param	input The input string to convert.
 * @returns	The processed string.
 */
export const ucFirst = (input: string): string => input.charAt(0).toUpperCase() + input.slice(1)

/**
 * Make first letter lowercase.
 *
 * @param	input The input string to convert.
 * @returns	The processed string.
 */
export const lcFirst = (input: string): string => input.charAt(0).toLowerCase() + input.slice(1)

/**
 * Convert string to camelCase.
 *
 * @param input The input string to convert.
 * @returns The converted string to camelCase.
 */
export const toCamelCase = (input: string): string =>
	toKebabCase(input).replace(/[-_\s](.)/g, (match, group1) => group1.toUpperCase())

/**
 * Convert string to kebab-case string.
 *
 * @param input The input string to convert.
 * @returns The converted string to kebab-case.
 */
export const toKebabCase = (input: string): string =>
	input
		.replace(/\s+/g, '-') // Replace white spaces with hyphens
		.replace(/_/g, '-') // Replace underscores with hyphens
		.replace(/([A-Z])/g, '-$1') // Add '-' before uppercase letters
		.replace(/[^a-zA-Z0-9-]/g, '-') // Replace special characters with hyphens
		.replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
		.toLowerCase() // Convert entire string to lowercase

export type Recipient =
	| string
	| {
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
export const recipientsToString = (recipients: Recipients): string => {
	if (!Array.isArray(recipients)) {
		return recipientsToString([recipients])
	}

	return recipients
		.filter(Boolean)
		.map(recipient => {
			if (typeof recipient !== 'string') {
				if (!recipient.email) return null

				const name = recipient.name?.trim()
				const email = recipient.email.trim()

				if (!name) return email

				return `${name}<${email}>`
			}
			return recipient.trim()
		})
		.filter(Boolean)
		.join(',')
}

export interface EmailData {
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
export const emailDataToString = (data: EmailData = {}): string => {
	const { to, body, subject, cc, bcc } = data

	const searchParams = new URLSearchParams()

	if (body) {
		searchParams.append('body', body)
	}

	if (subject) {
		searchParams.append('subject', subject)
	}

	if (cc) {
		const ccString = recipientsToString(cc)
		if (ccString) {
			searchParams.append('cc', ccString)
		}
	}

	if (bcc) {
		const bccString = recipientsToString(bcc)
		if (bccString) {
			searchParams.append('bcc', bccString)
		}
	}

	return [
		'mailto:',
		to && recipientsToString(to),
		searchParams.size > 0 && `?${searchParams.toString().replace(/\+/g, ' ')}`,
	]
		.filter(Boolean)
		.join('')
}

/**
 * Represents a value that can be used as a parameter in string operations.
 *
 */
export type ParameterizedValue = string | boolean | number | bigint

/**
 * Represents a parameterized string with its corresponding values.
 *
 * @property {string} 0 - The template string
 * @property {ParameterizedValue[]} 1 - Array of values to be substituted into the template string
 */
export type Parameterized = [string, ParameterizedValue[]]

/**
 * Creates a parameterized string with placeholder values.
 *
 * @param strings - The template string parts from a template literal.
 * @param values - One or more parameter values or arrays of values to be substituted into the template.
 * @returns A tuple containing the normalized string with `?` placeholders and an array of parameter values.
 *
 * @example
 * ```ts
 * const [ string, params ] = parameterized`
 *  SELECT * FROM users WHERE id = ${ 1 } AND status IN ( ${ [ 'active', 'pending' ] } )
 * ` )
 *
 * // string: "SELECT * FROM users WHERE id = ? AND status IN ( ?, ? )"
 * // params: [ 1, 'active', 'pending' ]
 * ```
 *
 * @remarks
 * - Whitespace is normalized (multiple spaces reduced to single space, trimmed).
 * - Undefined values are skipped.
 * - Array values are expanded into comma-separated placeholders.
 * - Single values are replaced with a single `?` placeholder.
 */
export const parameterized = (
	strings: TemplateStringsArray,
	...values: (ParameterizedValue | ParameterizedValue[])[]
): Parameterized => {
	const params: ParameterizedValue[] = []
	let text = ''

	strings.forEach((string, index) => {
		text += string

		if (index >= values.length) return

		const value = values[index]

		if (typeof value === 'undefined') return

		if (Array.isArray(value)) {
			const placeholders = value.map(() => '?').join(', ')
			text += placeholders
			params.push(...value)
			return
		}

		text += '?'
		params.push(value)
	})

	return [text.replace(/\s+/g, ' ').trim(), params]
}
