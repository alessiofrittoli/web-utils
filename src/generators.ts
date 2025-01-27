/**
 * Check if a function is a `GeneratorFunction` or `AsyncGeneratorFunction`.
 * 
 * @param	reference The function to check.
 * @returns	`true` if the given `reference` is a `GeneratorFunction` or `AsyncGeneratorFunction`.
 */
export const isGeneratorFunction = ( reference: unknown ): reference is ( GeneratorFunction | AsyncGeneratorFunction ) => (
	!! reference && ( isDefaultGeneratorFunction( reference ) || isAsyncGeneratorFunction( reference ) )
)


/**
 * Check if a function is a `GeneratorFunction`.
 * 
 * @param	reference The function to check.
 * @returns	`true` if the given `reference` is a `GeneratorFunction`.
 */
export const isDefaultGeneratorFunction = ( reference: unknown ): reference is GeneratorFunction => (
	!! reference && ( typeof reference === 'function' || typeof reference === 'object' ) && reference!.constructor.name === 'GeneratorFunction'
)


/**
 * Check if a function is an `AsyncGeneratorFunction`.
 * 
 * @param	reference The function to check.
 * @returns	`true` if the given `reference` is an `AsyncGeneratorFunction`.
 */
export const isAsyncGeneratorFunction = ( reference: unknown ): reference is AsyncGeneratorFunction => (
	!! reference && ( typeof reference === 'function' || typeof reference === 'object' ) && reference!.constructor.name === 'AsyncGeneratorFunction'
)


/**
 * Check if reference is a `Generator` or `AsyncGenerator`.
 * 
 * @param	reference The reference to check.
 * @returns	`true` if the given `generator` is a `Generator` or `AsyncGenerator`.
 */
export const isGeneratorObject = <T>( reference: unknown ): reference is ( Generator<T> | AsyncGenerator<T> ) => (
	!! reference && ( isDefaultGeneratorObject( reference ) || isAsyncGeneratorObject( reference ) )
)


/**
 * Check if reference is a `Generator`.
 * 
 * @param	reference The reference to check.
 * @returns	`true` if the given `generator` is a `Generator`.
 */
export const isDefaultGeneratorObject = <T>( reference: unknown ): reference is Generator<T> => (
	!! reference && typeof reference === 'object' && isDefaultGeneratorFunction( reference!.constructor )
)


/**
 * Check if reference is an `AsyncGenerator`.
 * 
 * @param	reference The reference to check.
 * @returns	`true` if the given `generator` is an `AsyncGenerator`.
 */
export const isAsyncGeneratorObject = <T>( reference: unknown ): reference is AsyncGenerator<T> => (
	!! reference && typeof reference === 'object' && isAsyncGeneratorFunction( reference!.constructor )
)