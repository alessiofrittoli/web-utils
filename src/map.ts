/**
 * A type-safe extension of the Map class that enforces key-value relationships based on a provided type.
 *
 * @template T The object type defining the key-value relationships.
 * @template P Defines whether the `Map.get()` method should return a possibily undefined value.
 * @template K Internal - The subset of keys in T that are allowed in the Map. Defaults to all keys of T.
 */
export interface TypedMap<
	T,
	P extends boolean = true,
	K extends keyof T = keyof T,
> extends Map<K, T[ K ]>
{
	/**
	 * Executes a provided function once per each key/value pair in the Map, in insertion order.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	forEach<K extends keyof T>( callbackfn: ( value: T[ K ], key: K, map: TypedMap<T, P, K> ) => void, thisArg?: any ): void
	
	
	/**
	 * Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.
	 * @returns Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.
	 */
	get<K extends keyof T>( key: K ): P extends true ? T[ K ] | undefined : T[ K ]
	
	
	/**
	 * Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.
	 */
	set<K extends keyof T>( key: K, value: T[ K ] ): this
}


/**
 * Creates a new instance of a type-safe Map with the given type.
 *
 * @template T The object type defining the key-value relationships.
 * @template P Defines whether the `Map.get()` method should return a possibily undefined value.
 * 
 * @param iterable Initial `Map` constructor iterable object.
 * 
 * @returns A new instance of a type-safe Map.
 */
export const getTypedMap = <
	T,
	P extends boolean = true,
	K extends keyof T = keyof T,
>(
	iterable?: Iterable<readonly [ K, T[ K ] ]> | null
) => (
	new Map<K, T[ K ]>( iterable ) as TypedMap<T, P, K>
)