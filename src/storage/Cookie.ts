import { isValidDate } from '@alessiofrittoli/date-utils'
import { parseValue, stringifyValue, toCamelCase, lcFirst, ucFirst } from '@/strings'

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
	name: K
	/**
	 * The Cookie value.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#cookie-namecookie-value)
	 */
	value?: V
	/**
	 * Defines the host to which the cookie will be sent.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#domaindomain-value)
	 */
	domain?: string
	/**
	 * Indicates the maximum lifetime of the cookie.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#expiresdate)
	 */
	expires?: string | number | Date
	/**
	 * Forbids JavaScript from accessing the cookie, for example, through the [`Document.cookie`](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie) property.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#httponly)
	 */
	httpOnly?: boolean
	/**
	 * Indicates the number of seconds until the cookie expires.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#max-agenumber)
	 */
	maxAge?: number
	/**
	 * Indicates that the cookie should be stored using partitioned storage.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#partitioned)
	 */
	partitioned?: boolean
	/**
	 * Indicates the path that must exist in the requested URL for the browser to send the `Cookie` header.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#pathpath-value)
	 */
	path?: string
	/**
	 * Controls whether or not a cookie is sent with cross-site requests, providing some protection against cross-site request forgery attacks ([CSRF](https://developer.mozilla.org/en-US/docs/Glossary/CSRF)).
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value)
	 */
	sameSite?: SameSite
	/**
	 * Indicates that the cookie is sent to the server only when a request is made with the https: scheme.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#secure)
	 */
	secure?: boolean
	/**
	 * Defines the Cookie priority.
	 * 
	 */
	priority?: Priority
}


/**
 * Interface representing Cookie properties after it get parsed.
 * 
 */
export interface ParsedCookie<K = string, V = string> extends Omit<RawCookie<K, V>, 'expires'>
{
	/**
	 * Indicates the maximum lifetime of the cookie.
	 * 
	 * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#expiresdate)
	 */
	expires?: Date
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
	 * @returns	The found parsed cookie or `undefined` if no cookie has been found in `Document.cookie`.
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
	 * @param	options The cookie options or a parsed Cookie Map.
	 * @returns	The set Cookie Map if successful, `false` otherwise.
	 */
	static set<K = string, V = string>( options: RawCookie<K, V> | ParsedCookieMap<K, V> )
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
	static delete( name: string )
	{
		return (
			!! Cookie.set( {
				name	: name,
				maxAge	: 0,
			} )
		)
	}


	/**
	 * Parse the given cookie options to a Cookie Map.
	 * 
	 * @param	options The Cookie options.
	 * @returns	The parsed Cookie Map.
	 */
	static parse<K = string, V = string>( options: RawCookie<K, V> ): ParsedCookieMap<K, V>
	{
		const expires	= options.expires ? new Date( options.expires ) : undefined
		const cookie	= getTypedMap<ParsedCookie<K, V>, false>()

		cookie
			.set( 'name', options.name )
			.set( 'value', options.value )

		if ( expires ) cookie.set( 'expires', expires )
		if ( typeof options.maxAge !== 'undefined' ) cookie.set( 'maxAge', options.maxAge )
		if ( options.path ) cookie.set( 'path', options.path )
		if ( options.priority ) cookie.set( 'priority', options.priority )
		if ( options.domain ) cookie.set( 'domain', options.domain )
		if ( typeof options.httpOnly !== 'undefined' ) cookie.set( 'httpOnly', options.httpOnly )
		if ( typeof options.secure !== 'undefined' ) cookie.set( 'secure', options.secure )
		if ( options.sameSite ) cookie.set( 'sameSite', options.sameSite )
		if ( typeof options.partitioned !== 'undefined' ) cookie.set( 'partitioned', options.partitioned )

		return cookie
	}


	/**
	 * Stringify a Cookie ready to be stored.
	 * 
	 * @param	options The cookie options or a parsed Cookie Map.
	 * @returns	The stringified Cookie ready to be stored.
	 */
	static toString<K = string, V = string>( options: RawCookie<K, V> | ParsedCookieMap<K, V> )
	{
		const cookie = options instanceof Map ? options : Cookie.parse( options )
		
		const values = (
			Array.from( cookie )
				.filter( ( [ key ] ) => key !== 'name' && key !== 'value' )
		)

		const name		= cookie.get( 'name' )
		const nameValue	= [ name, cookie.get( 'value' ) ]

		return (
			[ nameValue, ...values ]
				.map( ( [ key, value ] ) => {
					if ( ! key ) return null
					key = key !== name ? ucFirst( key.toString() ) as K : key
					
					if ( key === 'Expires' && isValidDate( value ) ) {
						value = value.toUTCString()
					}

					if ( key === 'MaxAge' ) key = 'Max-Age' as K

					return [ key, stringifyValue( value ) ].join( '=' )
				} )
				.filter( Boolean )
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

				const parsedKey	= lcFirst( toCamelCase( key ) ) as keyof ParsedCookie
				const value		= Cookie.parseValue( rawValue, parsedKey )

				if ( value == null ) return null

				return [ parsedKey, value ]

			} ).filter( Boolean ) as [ keyof ParsedCookie<K, V>, ParsedCookie<K, V>[ keyof ParsedCookie<K, V> ] ][]
		)
		
		return getTypedMap<ParsedCookie<K, V>, false>( [
			[ 'name', name ],
			[ 'value', Cookie.parseValue<V>( value ) ],
			...values,
		] )
	}
	

	/**
	 * Parse a cookie list string to a Map of cookies.
	 * 
	 * @param	list The cookie list string.
	 * @returns	The Map of parsed cookies indexed by the Cookie name.
	 */
	static fromListString<T extends Record<string, unknown>, K extends keyof T = keyof T>( list: string )
	{
		const cookies = getTypedMap<{ [ P in K ]: ParsedCookieMap<P, T[ P ]> }>()

		list.split( '; ' ).map( cookieString => {
			const cookie = Cookie.fromString<K, T[ K ]>( cookieString )
			if ( ! cookie ) return null
			cookies.set( cookie.get( 'name' ), cookie )
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
	private static parseValue<T>( value?: string, key?: keyof ParsedCookie )
	{
		if ( key === 'expires' && value ) {
			const date = new Date( value )
			if ( ! isValidDate( date ) ) return undefined
			return date as T
		}

		if ( key === 'httpOnly' || key === 'secure' || key === 'partitioned' ) {
			return ( value !== 'false' ) as T
		}

		return parseValue<T>( value )
	}
}