/**
 * Filter object removing falsey values.
 * 
 * @param object	The object|array to iterate through.
 * @returns			The updated object.
 */
export const filterObject = <T>( object: T ) => {
	const clone = { ...object }
	for ( const prop in clone ) {
		const element = clone[ prop ]
		if ( element != null ) continue 
		delete clone[ prop ]
	}
	return clone
}


/**
 * Convert Map to Object.
 * 
 * @param	map The Map to convert.
 * @returns The Object representation of the given Map.
 */
export const mapToObject = <
	K extends string, V, R extends Record<K, V> = Record<K, V>
>( map: Map<K, V> ): R => (
	Object.fromEntries( map.entries() ) as R
)


/**
 * Clone object.
 * 
 * @param	a The object or class instance to clone.
 * @returns	The cloned object.
 */
export const cloneObject = <T extends object>( a: T ) => (
	Object.assign(
		Object.create(
			Object.getPrototypeOf( a )
		) as T, a
	)
)


/**
 * Get an Object key by value.
 * 
 * @param	obj		The object
 * @param	value	The key value to look for.
 * @returns	The given object key name.
 */
export const getObjectKey = <T extends object>( obj: T, value: ValueOf<T> ) => (
	Object.keys( obj )
		.find( key => obj[ key as keyof T ] === value )
)