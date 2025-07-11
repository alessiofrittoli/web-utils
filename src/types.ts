/**
 * Check whether Node.js runtime environment is in development mode.
 * 
 * @returns True if current runtime environment is in development environment, false otherwise.
 */
export const isDev = () => process.env.NODE_ENV === 'development'


/**
 * Check whether Node.js runtime environment is in test mode.
 * 
 * @returns True if current runtime environment is in test environment, false otherwise.
 */
export const isTest = () => (
	process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID !== undefined
)


/**
 * Check whether result is a Promise.
 * 
 * @param	p The result to check. 
 * @returns	True if result is a Promise, false otherwise.
 */
export const isPromise = <T>(
	p: unknown
): p is Promise<T> => p instanceof Promise


/**
 * Check whether variable is an AsyncFunction.
 * 
 * @param	f The variable to check. 
 * @returns	True if variable is an AsyncFunction, false otherwise.
 */
export const isAsyncFunction = <T extends CallableFunction>(
	f: T
): f is T => f instanceof Function && f.constructor.name === 'AsyncFunction'


/**
 * Check whether a variable is a string or not.
 * 
 * @param	s The variable to check.
 * @returns	boolean
 */
export const isString = (
	s: unknown
): s is string => typeof s === 'string' || s instanceof String


/**
 * Check if object is array.
 * 
 * @param	a The object / array to check.
 * 
 * @returns	boolean
 */
export const isArray = (
	a: unknown
): a is Array<unknown> => ( !! a ) && ( a.constructor === Array )


/**
 * Check whether an Array is an empty Array.
 * 
 * @param	a The Array to check.
 * @returns	True if the Array has no entries, false otherwise.
 */
export const isEmptyArray = <T>(
	a: Array<T>
) => isArray( a ) && a.length <= 0


/**
 * Check if object is an object.
 * 
 * @param	a The object / array to check.
 * 
 * @returns	boolean
 */
export const isObject = (
	a: unknown
): a is object => ( !! a ) && ( a.constructor === Object )


/**
 * Check whether an object is an empty object.
 * 
 * @param	obj The object to check.
 * @returns	True if the object has no entries, false otherwise.
 */
export const isEmptyObject = (
	obj: object
) => Object.keys( obj ).length === 0


/**
 * Check if string is a valid JSON object.
 * 
 * @param	string 
 * 
 * @returns	boolean
 */
export const isJson = ( string: unknown ): string is string => {

	try {
		JSON.parse( string as string )
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch ( e ) {
		return false
	}
	return true
	
}


/**
 * Check whether a variable is a NodeList or not.
 * 
 * @param	n The variable to check.
 * @returns	boolean
 */
export const isNodeList = (
	n: unknown
): n is NodeList => n instanceof NodeList


/**
 * Check whether a variable is an HTML DOM Element or not.
 * 
 * @param 	e The variable to check.
 * @returns	boolean
 */
export const isNodeElement = (
	e: unknown
): e is Element => e instanceof Element


/**
 * Check if event is a TouchEvent.
 * 
 * @param	event The native event interface. 
 * 
 * @returns	True if event is TouchEvent, false otherwise.
 */
export const isTouchEvent = ( event: Event ): event is TouchEvent => window.TouchEvent && event instanceof TouchEvent


/**
 * Check if device is a Touch device.
 * 
 * @returns	True if device is a Touch device, false otherwise.
 */
export const isTouchDevice = () => (
	( typeof window !== 'undefined' && 'ontouchstart' in window && typeof window.ontouchstart === 'function' ) ||
	( typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0 ) ||
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	( typeof navigator !== 'undefined' && 'msMaxTouchPoints' in navigator && ( navigator.msMaxTouchPoints as any ) > 0 )
)