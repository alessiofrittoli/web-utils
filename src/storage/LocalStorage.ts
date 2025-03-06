import { Storage } from './Storage'


/**
 * A browser-compatible implementation of [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). Data is stored
 * unencrypted in the file specified by the `--localstorage-file` CLI flag.
 * The maximum amount of data that can be stored is 10 MB.
 * Any modification of this data outside of the Web Storage API is not supported.
 * Enable this API with the `--experimental-webstorage` CLI flag.
 * `localStorage` data is not stored per user or per request when used in the context
 * of a server, it is shared across all users and requests.
 */
export class LocalStorage
{
	/**
	 * Removes all key/value pairs, if there are any.
	 *
	 * Dispatches a storage event on Window objects holding an equivalent Storage object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/clear)
	 */
	static clear()
	{
		return localStorage.clear()
	}


	/**
	 * Returns the current value associated with the given key, or undefined if the given key does not exist.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/getItem)
	 */
	static get<T>( name: string )
	{
		return (
			Storage.parseValue<T>( localStorage.getItem( name ) || undefined )
		)
	}


	/**
	 * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
	 *
	 * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
	 *
	 * Dispatches a storage event on Window objects holding an equivalent Storage object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/setItem)
	 */
	static set<T>( name: string, value: T )
	{
		return localStorage.setItem( name, Storage.stringifyValue( value ) )
	}
	

	/**
	 * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
	 *
	 * Dispatches a storage event on Window objects holding an equivalent Storage object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/removeItem)
	 */
	static delete( name: string )
	{
		return localStorage.removeItem( name )
	}
	
	
	/**
	 * Returns the name of the nth key, or null if n is greater than or equal to the number of key/value pairs.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/key)
	 */
	static key( index: number )
	{
		return localStorage.key( index )
	}

	
	/**
	 * Returns the number of key/value pairs.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/length)
	 */
	static getLength()
	{
		return localStorage.length
	}
}