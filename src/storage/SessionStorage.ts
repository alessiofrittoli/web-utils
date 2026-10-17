import { parseValue, stringifyValue } from '@/strings'

/**
 * A browser-compatible implementation of [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage). Data is stored in
 * memory, with a storage quota of 10 MB. `sessionStorage` data persists only within
 * the currently running process, and is not shared between workers.
 */
export class SessionStorage {
	/**
	 * Get the current value associated with the given `key`, or `undefined` if the given `key` does not exist.
	 *
	 * @param	key The item name.
	 * @returns	The current value associated with the given `key`, or `undefined` if the given `key` does not exist.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/getItem)
	 */
	public static get<T>(key: string): T | undefined {
		return parseValue<T>(sessionStorage.getItem(key) || undefined)
	}

	/**
	 * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
	 *
	 * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
	 *
	 * Dispatches a storage event on Window objects holding an equivalent Storage object.
	 *
	 * @param	key		The item name.
	 * @param	value	The item value.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/setItem)
	 */
	public static set<T>(key: string, value: T): void {
		const stringified = stringifyValue(value)

		if (value == null || !stringified) {
			return SessionStorage.delete(key)
		}

		return sessionStorage.setItem(key, stringified)
	}

	/**
	 * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
	 *
	 * Dispatches a storage event on Window objects holding an equivalent Storage object.
	 *
	 * @param key The item name.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/removeItem)
	 */
	public static delete(key: string): void {
		return sessionStorage.removeItem(key)
	}

	/**
	 * Removes all key/value pairs, if there are any.
	 *
	 * Dispatches a storage event on Window objects holding an equivalent Storage object.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/clear)
	 */
	public static clear(): void {
		return sessionStorage.clear()
	}

	/**
	 * Get storage item name by item numeric index.
	 *
	 * @param	index The item index in the storage.
	 * @returns	The name of the nth key, or `undefined` if n is greater than or equal to the number of key/value pairs.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/key)
	 */
	public static key(index: number): string | undefined {
		return sessionStorage.key(index) || undefined
	}

	/**
	 * Get the number of key/value pairs.
	 *
	 * @returns	The number of key/value pairs.
	 *
	 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Storage/length)
	 */
	public static getLength(): number {
		return sessionStorage.length
	}
}
