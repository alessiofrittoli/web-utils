import { isValidDate } from '@alessiofrittoli/date-utils'
import { parseValue, stringifyValue, toCamelCase, ucFirst } from '@/strings'

import { getTypedMap, type TypedMap } from '@/map'


/** The Cookie Priority. */
export enum Priority
{
	/** Low priority. */
	Low = 'Low',
	/** Medium priority (default). */
	Medium = 'Medium',
	/** High priority. */
	High = 'High',
}


/**
 * Controls whether or not a cookie is sent with cross-site requests, providing some protection against cross-site request forgery attacks ([CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)).
 * 
 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value)
 */
export enum SameSite
{
	/**
	 * The browser sends the cookie only for same-site requests.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#strict)
	 */
	Strict = 'Strict',
	/**
	 * The cookie is not sent on cross-site requests, such as on requests to load images or frames, but is sent when a user is navigating to the origin site from an external site.
	 * 
	 * @warning Not all browsers set SameSite=Lax by default. See [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#browser_compatibility) for details.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#lax)
	 */
	Lax = 'Lax',
	/**
	 * The browser sends the cookie with both cross-site and same-site requests.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#none)
	 */
	None = 'None',
}


/**
 * Interface representing Cookie properties before it get parsed.
 * 
 */
export interface RawCookie<K = string, V = string>
{
	/**
	 * The Cookie name.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#cookie-namecookie-value)
	 */
	Name: K
	/**
	 * The Cookie value.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#cookie-namecookie-value)
	 */
	Value?: V
	/**
	 * Defines the host to which the cookie will be sent.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#domaindomain-value)
	 */
	Domain?: string
	/**
	 * Indicates the maximum lifetime of the cookie.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#expiresdate)
	 */
	Expires?: string | number | Date
	/**
	 * Forbids JavaScript from accessing the cookie, for example, through the [`Document.cookie`](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) property.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#httponly)
	 */
	HttpOnly?: boolean
	/**
	 * Indicates the number of seconds until the cookie expires.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#max-agenumber)
	 */
	MaxAge?: number
	/**
	 * Indicates that the cookie should be stored using partitioned storage.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#partitioned)
	 */
	Partitioned?: boolean
	/**
	 * Indicates the path that must exist in the requested URL for the browser to send the `Cookie` header.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#pathpath-value)
	 */
	Path?: string
	/**
	 * Controls whether or not a cookie is sent with cross-site requests, providing some protection against cross-site request forgery attacks ([CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)).
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value)
	 */
	SameSite?: SameSite
	/**
	 * Indicates that the cookie is sent to the server only when a request is made with the https: scheme.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#secure)
	 */
	Secure?: boolean
	/**
	 * Defines the Cookie priority.
	 * 
	 */
	Priority?: Priority
}


/**
 * Interface representing Cookie properties after it get parsed.
 * 
 */
export interface ParsedCookie<K = string, V = string> extends Omit<RawCookie<K, V>, 'Expires'>
{
	/**
	 * Indicates the maximum lifetime of the cookie.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#expiresdate)
	 */
	Expires?: Date
}


/**
 * Map representation of a parsed Cookie.
 * 
 */
export type ParsedCookieMap<K = string, V = string> = TypedMap<ParsedCookie<K, V>, false>


/**
 * Easly handle cookies.
 * 
 */
export class Cookie
{
	/**
	 * Get a cookie by cookie name from `Document.cookie`.
	 * 
	 * @param	name The name of the cookie.
	 * @returns	The cookie value.
	 */
	static get<T, K extends string | number | symbol = string>( name: K )
	{
		return (
			Cookie.fromListString<Record<K, T>>( document.cookie )
				.get( name )
		)
	}


	/**
	 * Set a cookie to `Document.cookie`.
	 * 
	 * @param	options The cookie options.
	 * @returns	The set Cookie Map if successful, `false` otherwise.
	 */
	static set<K = string, V = string>( options: RawCookie<K, V> | TypedMap<ParsedCookie<K, V>, false> )
	{
		const cookie = options instanceof Map ? options : Cookie.parse( options )

		if ( typeof document !== 'undefined' ) {
			document.cookie = Cookie.toString( cookie )
			return cookie
		}

		return false
	}
	
	
	/**
	 * Delete a cookie by cookie name from `Document.cookie`.
	 * 
	 * @param name The name of the cookie.
	 * @returns	`true` if successful, `false` otherwise.
	 */
	static delete<K = string>( cname: K )
	{
		return (
			!! Cookie.set( {
				Name	: cname,
				MaxAge	: 0,
			} )
		)
	}


	/**
	 * Parse cookie options to Cookie Map.
	 * 
	 * @param	options The Cookie options.
	 * @returns	The parsed Cookie Map.
	 */
	static parse<K = string, V = string>( options: RawCookie<K, V> ): ParsedCookieMap<K, V>
	{
		const expires	= options.Expires ? new Date( options.Expires ) : undefined
		const cookie	= getTypedMap<ParsedCookie<K, V>, false>()

		cookie
			.set( 'Name', options.Name )
			.set( 'Value', options.Value )

		if ( expires ) cookie.set( 'Expires', expires )
		if ( typeof options.MaxAge !== 'undefined' ) cookie.set( 'MaxAge', options.MaxAge )
		if ( options.Path ) cookie.set( 'Path', options.Path )
		if ( options.Priority ) cookie.set( 'Priority', options.Priority )
		if ( options.Domain ) cookie.set( 'Domain', options.Domain )
		if ( typeof options.HttpOnly !== 'undefined' ) cookie.set( 'HttpOnly', options.HttpOnly )
		if ( typeof options.Secure !== 'undefined' ) cookie.set( 'Secure', options.Secure )
		if ( options.SameSite ) cookie.set( 'SameSite', options.SameSite )
		if ( typeof options.Partitioned !== 'undefined' ) cookie.set( 'Partitioned', options.Partitioned )

		return cookie
	}


	/**
	 * Parse and join the Cookie values.
	 *
	 * @returns The joined Cookie values.
	 */
	static toString<K = string, V = string>( cookie: ParsedCookieMap<K, V> )
	{
		const values = (
			Array.from( cookie )
				.filter( ( [ key ] ) => key !== 'Name' && key !== 'Value' )
		)

		const nameValue = [ cookie.get( 'Name' ), cookie.get( 'Value' ) ]

		return (
			[ nameValue, ...values ]
				.map( ( [ key, value ] ) => {
					if ( key === 'Expires' && isValidDate( value ) ) {
						value = value.toUTCString()
					}
					if ( key === 'MaxAge' ) key = 'Max-Age' as K

					return [ key, stringifyValue( value ) ].join( '=' )
				} )
				.join( ';' )
		)

	}


	/**
	 * Parse a cookie string to a Cookie Map.
	 * 
	 * @param	cookie The cookie string.
	 * @returns	The parsed Cookie Map or `null` if parsing fails.
	 */
	static fromString<K = string, V = string>( cookie: string ): ParsedCookieMap<K, V> | null
	{
		const [ kv, ...rawValues ] = cookie.split( ';' )

		if ( ! kv ) return null

		const [ name, value ] = kv.split( '=' )

		const values = (
			rawValues.map( kv => {

				const [ key, rawValue ] = (
					kv.split( '=' ) as [ keyof ParsedCookie<K, V> | undefined, string | undefined ]
				)
				
				if ( ! key || ! key.trim().length ) return null

				const value = Cookie.parseValue( rawValue, key )
				if ( value == null ) return null

				return [ ucFirst( toCamelCase( key ) ), value ]

			} ).filter( Boolean ) as [ keyof ParsedCookie<K, V>, ParsedCookie<K, V>[ keyof ParsedCookie<K, V> ] ][]
		)
		
		return getTypedMap<ParsedCookie<K, V>, false>( [
			[ 'Name', name ],
			[ 'Value', Cookie.parseValue<V>( value ) ],
			...values,
		] )
	}
	

	/**
	 * Parse a cookie list string to a Map of cookies.
	 * 
	 * @param	list The cookie list string.
	 * @returns	The Map of parsed cookies.
	 */
	static fromListString<T extends Record<string, unknown>, K extends keyof T = keyof T>( list: string )
	{
		const cookies = getTypedMap<{ [ P in K ]: ParsedCookieMap<P, T[ P ]> }>()

		list.split( '; ' ).map( cookieString => {
			const cookie = Cookie.fromString<K, T[ K ]>( cookieString )
			if ( ! cookie ) return null
			cookies.set( cookie.get( 'Name' ), cookie )
		} )

		return cookies
	}


	/**
	 * Parse a value based on the key.
	 * 
	 * @param	value	The value to parse.
	 * @param	key		The key associated with the value.
	 * 
	 * @returns	The parsed value.
	 */
	static parseValue<T>( value?: string, key?: keyof ParsedCookie )
	{
		if ( key === 'Expires' && value ) {
			const date = new Date( value )
			if ( ! isValidDate( date ) ) return undefined
			return date as T
		}

		if ( key === 'HttpOnly' || key === 'Secure' || key === 'Partitioned' ) {
			return ( value !== 'false' ) as T
		}

		return parseValue<T>( value )
	}
}