import { isGeneratorFunction, isDefaultGeneratorFunction, isAsyncGeneratorFunction } from '@/generators'
import { isGeneratorObject, isDefaultGeneratorObject, isAsyncGeneratorObject } from '@/generators'


function standardFunction() {
	return 'foo'
}


function* generatorFunction() {
	yield 'data'
}


async function* asyncGeneratorFunction()
{
	yield 'data 1'
}


describe( 'isDefaultGeneratorFunction', () => {

	it( 'returns `true` when a GeneratorFunction is provided', () => {
		
		expect( isDefaultGeneratorFunction( generatorFunction ) )
			.toBe( true )

	} )
	
	
	it( 'returns `false` when a standard function is provided', () => {
		
		expect( isDefaultGeneratorFunction( standardFunction ) )
			.toBe( false )

	} )
	
	
	it( 'returns `false` when a non-function reference data is provided', () => {
		
		expect( isDefaultGeneratorFunction( 'non-function reference data' ) )
			.toBe( false )
		expect( isDefaultGeneratorFunction( 1 ) )
			.toBe( false )
		expect( isDefaultGeneratorFunction( true ) )
			.toBe( false )
		expect( isDefaultGeneratorFunction( undefined ) )
			.toBe( false )
		expect( isDefaultGeneratorFunction( null ) )
			.toBe( false )
		expect( isDefaultGeneratorFunction( { prop: 'value' } ) )
			.toBe( false )
		expect( isDefaultGeneratorFunction( [] ) )
			.toBe( false )

	} )


	it( 'returns `false` when a Generator or AsyncGenerator is provided', () => {
		
		expect( isDefaultGeneratorFunction( generatorFunction() ) )
			.toBe( false )
		expect( isDefaultGeneratorFunction( asyncGeneratorFunction() ) )
			.toBe( false )

	} )


	it( 'returns `false` when an AsyncGeneratorFunction is provided', () => {
		
		expect( isDefaultGeneratorFunction( asyncGeneratorFunction ) )
			.toBe( false )

	} )

} )


describe( 'isAsyncGeneratorFunction', () => {

	it( 'returns `true` when an AsyncGeneratorFunction is provided', () => {
		
		expect( isAsyncGeneratorFunction( asyncGeneratorFunction ) )
			.toBe( true )

	} )
	
	
	it( 'returns `false` when a standard function is provided', () => {
		
		expect( isAsyncGeneratorFunction( standardFunction ) )
			.toBe( false )

	} )
	
	
	it( 'returns `false` when a non-function reference data is provided', () => {
		
		expect( isAsyncGeneratorFunction( 'non-function reference data' ) )
			.toBe( false )
		expect( isAsyncGeneratorFunction( 1 ) )
			.toBe( false )
		expect( isAsyncGeneratorFunction( true ) )
			.toBe( false )
		expect( isAsyncGeneratorFunction( undefined ) )
			.toBe( false )
		expect( isAsyncGeneratorFunction( null ) )
			.toBe( false )
		expect( isAsyncGeneratorFunction( { prop: 'value' } ) )
			.toBe( false )
		expect( isAsyncGeneratorFunction( [] ) )
			.toBe( false )

	} )


	it( 'returns `false` when a Generator or AsyncGenerator is provided', () => {
		
		expect( isAsyncGeneratorFunction( generatorFunction() ) )
			.toBe( false )
		expect( isAsyncGeneratorFunction( asyncGeneratorFunction() ) )
			.toBe( false )

	} )


	it( 'returns `false` when a GeneratorFunction is provided', () => {
		
		expect( isAsyncGeneratorFunction( generatorFunction ) )
			.toBe( false )

	} )

} )


describe( 'isGeneratorFunction', () => {

	it( 'returns `true` when a GeneratorFunction is provided', () => {
		
		expect( isGeneratorFunction( generatorFunction ) )
			.toBe( true )

	} )


	it( 'returns `true` when an AsyncGeneratorFunction is provided', () => {
		
		expect( isGeneratorFunction( asyncGeneratorFunction ) )
			.toBe( true )

	} )
	
	
	it( 'returns `false` when a standard function is provided', () => {
		
		expect( isGeneratorFunction( standardFunction ) )
			.toBe( false )

	} )
	
	
	it( 'returns `false` when a non-function reference data is provided', () => {
		
		expect( isGeneratorFunction( 'non-function reference data' ) )
			.toBe( false )
		expect( isGeneratorFunction( 1 ) )
			.toBe( false )
		expect( isGeneratorFunction( true ) )
			.toBe( false )
		expect( isGeneratorFunction( undefined ) )
			.toBe( false )
		expect( isGeneratorFunction( null ) )
			.toBe( false )
		expect( isGeneratorFunction( { prop: 'value' } ) )
			.toBe( false )
		expect( isGeneratorFunction( [] ) )
			.toBe( false )

	} )


	it( 'returns `false` when a Generator or AsyncGenerator is provided', () => {
		
		expect( isGeneratorFunction( generatorFunction() ) )
			.toBe( false )
		expect( isGeneratorFunction( asyncGeneratorFunction() ) )
			.toBe( false )

	} )

} )




describe( 'isDefaultGeneratorObject', () => {

	it( 'returns `true` when a Generator is provided', () => {
		expect( isDefaultGeneratorObject( generatorFunction() ) )
			.toBe( true )
	} )


	it( 'returns `false` when a non-object reference data is provided', () => {

		expect( isDefaultGeneratorObject( 'non-object reference data' ) )
			.toBe( false )
		expect( isDefaultGeneratorObject( 1 ) )
			.toBe( false )
		expect( isDefaultGeneratorObject( true ) )
			.toBe( false )
		expect( isDefaultGeneratorObject( undefined ) )
			.toBe( false )
		expect( isDefaultGeneratorObject( null ) )
			.toBe( false )
		expect( isDefaultGeneratorObject( { prop: 'value' } ) )
			.toBe( false )
		expect( isDefaultGeneratorObject( [] ) )
			.toBe( false )
		expect( isDefaultGeneratorObject( () => {} ) )
			.toBe( false )

	} )


	it( 'returns `false` when a GeneratorFunction or AsyncGeneratorFunction is provided', () => {
		
		expect( isDefaultGeneratorObject( generatorFunction ) )
			.toBe( false )
		expect( isDefaultGeneratorObject( asyncGeneratorFunction ) )
			.toBe( false )

	} )


	it( 'returns `false` when an AsyncGenerator is provided', () => {
		
		expect( isDefaultGeneratorObject( asyncGeneratorFunction() ) )
			.toBe( false )

	} )

} )


describe( 'isAsyncGeneratorObject', () => {

	it( 'returns `true` when an AsyncGenerator is provided', () => {
		expect( isAsyncGeneratorObject( asyncGeneratorFunction() ) )
			.toBe( true )
	} )


	it( 'returns `false` when a non-object reference data is provided', () => {

		expect( isAsyncGeneratorObject( 'non-object reference data' ) )
			.toBe( false )
		expect( isAsyncGeneratorObject( 1 ) )
			.toBe( false )
		expect( isAsyncGeneratorObject( true ) )
			.toBe( false )
		expect( isAsyncGeneratorObject( undefined ) )
			.toBe( false )
		expect( isAsyncGeneratorObject( null ) )
			.toBe( false )
		expect( isAsyncGeneratorObject( { prop: 'value' } ) )
			.toBe( false )
		expect( isAsyncGeneratorObject( [] ) )
			.toBe( false )
		expect( isAsyncGeneratorObject( () => {} ) )
			.toBe( false )

	} )


	it( 'returns `false` when a GeneratorFunction or AsyncGeneratorFunction is provided', () => {
		
		expect( isAsyncGeneratorObject( generatorFunction ) )
			.toBe( false )
		expect( isAsyncGeneratorObject( asyncGeneratorFunction ) )
			.toBe( false )

	} )


	it( 'returns `false` when a Generator is provided', () => {
		
		expect( isAsyncGeneratorObject( generatorFunction() ) )
			.toBe( false )

	} )

} )


describe( 'isGeneratorObject', () => {

	it( 'returns `true` when a Generator is provided', () => {
		
		expect( isGeneratorObject( generatorFunction() ) )
			.toBe( true )

	} )


	it( 'returns `true` when an AsyncGenerator is provided', () => {
		
		expect( isGeneratorObject( asyncGeneratorFunction() ) )
			.toBe( true )

	} )
	
	
	it( 'returns `false` when a non-object reference data is provided', () => {

		expect( isGeneratorObject( 'non-object reference data' ) )
			.toBe( false )
		expect( isGeneratorObject( 1 ) )
			.toBe( false )
		expect( isGeneratorObject( true ) )
			.toBe( false )
		expect( isGeneratorObject( undefined ) )
			.toBe( false )
		expect( isGeneratorObject( null ) )
			.toBe( false )
		expect( isGeneratorObject( { prop: 'value' } ) )
			.toBe( false )
		expect( isGeneratorObject( [] ) )
			.toBe( false )
		expect( isGeneratorObject( () => {} ) )
			.toBe( false )

	} )


	it( 'returns `false` when a GeneratorFunction or AsyncGeneratorFunction is provided', () => {
		
		expect( isGeneratorObject( generatorFunction ) )
			.toBe( false )
		expect( isGeneratorObject( asyncGeneratorFunction ) )
			.toBe( false )

	} )

} )