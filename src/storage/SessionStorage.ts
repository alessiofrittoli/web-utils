import { parseValue, stringifyValue } from '@/strings'

/**
 * A browser-compatible implementation of [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage). Data is stored in
 * memory, with a storage quota of 10 MB. `sessionStorage` data persists only within
 * the currently running process, and is not shared between workers.
 */
export class SessionStorage
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
		return sessionStorage.clear()
	}


	/**
	 * Returns the current value associated with the given key, or undefined if the given key does not exist.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/getItem)
	 */
	static get<T>( name: string )
	{
		return (
			parseValue<T>( sessionStorage.getItem( name ) || undefined )
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
		return sessionStorage.setItem( name, stringifyValue( value ) )
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
		return sessionStorage.removeItem( name )
	}
	
	
	/**
	 * Returns the name of the nth key, or null if n is greater than or equal to the number of key/value pairs.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/key)
	 */
	static key( index: number )
	{
		return sessionStorage.key( index )
	}

	
	/**
	 * Returns the number of key/value pairs.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/length)
	 */
	static getLength()
	{
		return sessionStorage.length
	}
}