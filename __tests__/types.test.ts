/**
 * @jest-environment jsdom
 */

import { isDev, isTest } from '@/types'
import { isPromise, isAsyncFunction } from '@/types'
import { isString, isArray, isEmptyArray, isObject, isEmptyObject, isJson } from '@/types'
import { isNodeList, isNodeElement, isTouchEvent, isTouchDevice } from '@/types'


describe( 'isDev', () => {

	const nodeEnv = process.env.NODE_ENV

	afterAll( () => {
		process.env.NODE_ENV = nodeEnv
	} )

	it( 'returns `true` if NODE_ENV is development', () => {
		process.env.NODE_ENV = 'development'
		expect( isDev() ).toBe( true )
	} )


	it( 'returns `false` if NODE_ENV is not development', () => {
		process.env.NODE_ENV = 'production'
		expect( isDev() ).toBe( false )
	} )

} )


describe( 'isTest', () => {
	
	const nodeEnv	= process.env.NODE_ENV
	const workerId	= process.env.JEST_WORKER_ID

	afterAll( () => {
		process.env.NODE_ENV		= nodeEnv
		process.env.JEST_WORKER_ID	= workerId
	} )

	it( 'returns `true` if `NODE_ENV` is `test`', () => {
		expect( isTest() ).toBe( true )
	} )

	it( 'returns `true` if `NODE_ENV` is not `test` but `JEST_WORKER_ID` is defined', () => {
		expect( isTest() ).toBe( true )
	} )

	it( 'returns `false` if NODE_ENV is not `test` and `JEST_WORKER_ID` is not defined', () => {
		process.env.NODE_ENV = 'production'
		delete process.env.JEST_WORKER_ID
		expect( isTest() ).toBe( false )
	} )

} )


describe( 'isPromise', () => {

	it( 'returns `true` if the value is a Promise', () => {
		const promise = new Promise<void>( resolve => resolve() )
		expect( isPromise( promise ) ).toBe( true )
	} )

	it( 'returns `false` if the value is not a Promise', () => {
		expect( isPromise( 123 ) ).toBe( false )
	} )

} )


describe( 'isAsyncFunction', () => {

	it( 'returns `true` if the value is an AsyncFunction', () => {
		const asyncFunc = async () => {}
		expect( isAsyncFunction( asyncFunc ) ).toBe( true )
	} )

	it( 'returns `false` if the value is not an AsyncFunction', () => {
		const syncFunc = () => {}
		expect( isAsyncFunction( syncFunc ) ).toBe( false )
	} )

} )


describe( 'isString', () => {

	it( 'returns `true` if the value is a string', () => {
		expect( isString( 'test' ) ).toBe( true )
	} )

	it( 'returns `false` if the value is not a string', () => {
		expect( isString( 123 ) ).toBe( false )
	} )

} )


describe( 'isArray', () => {

	it( 'returns `true` if the value is an array', () => {
		expect( isArray( [] ) ).toBe( true )
	} )

	it( 'returns `false` if the value is not an array', () => {
		expect( isArray( {} ) ).toBe( false )
	} )

} )


describe( 'isEmptyArray', () => {
	
	it( 'returns `true` if the object is empty', () => {
		expect( isEmptyArray( [] ) ).toBe( true )
	} )

	it( 'returns `false` if the object is not empty', () => {
		expect( isEmptyArray( [ 1, 2, 3 ] ) ).toBe( false )
	} )

} )


describe( 'isObject', () => {

	it( 'returns `true` if the value is an object', () => {
		expect( isObject( {} ) ).toBe( true )
	} )

	it( 'returns `false` if the value is not an object', () => {
		expect( isObject( [] ) ).toBe( false )
	} )

} )


describe( 'isEmptyObject', () => {

	it( 'returns `true` if the object is empty', () => {
		expect( isEmptyObject( {} ) ).toBe( true )
	} )

	it( 'returns `false` if the object is not empty', () => {
		expect( isEmptyObject( { key: 'value' } ) ).toBe( false )
	} )

} )


describe( 'isJson', () => {

	it( 'returns `true` if the string is valid JSON', () => {
		expect( isJson( '{"key": "value"}' ) ).toBe( true )
	} )

	it( 'returns `false` if the string is not valid JSON', () => {
		expect( isJson( 'invalid json' ) ).toBe( false )
	} )

} )


describe( 'isNodeList', () => {

	it( 'returns `true` if the value is a NodeList', () => {
		const nodeList = document.querySelectorAll( 'div' )
		expect( isNodeList( nodeList ) ).toBe( true )
	} )

	it( 'returns `false` if the value is not a NodeList', () => {
		expect( isNodeList( [] ) ).toBe( false )
	} )

} )


describe( 'isNodeElement', () => {
	
	it( 'returns `true` if the value is an Element', () => {
		const element = document.createElement( 'div' )
		expect( isNodeElement( element ) ).toBe( true )
	} )

	it( 'returns `false` if the value is not an Element', () => {
		expect( isNodeElement( {} ) ).toBe( false )
	} )

} )


describe( 'isTouchEvent', () => {
	
	it( 'returns `true` if the event is a TouchEvent', () => {
		const touchEvent = new TouchEvent( 'touchstart' )
		expect( isTouchEvent( touchEvent ) ).toBe( true )
	} )

	it( 'returns `false` if the event is not a TouchEvent', () => {
		const mouseEvent = new MouseEvent( 'click' )
		expect( isTouchEvent( mouseEvent ) ).toBe( false )
	} )

} )


describe( 'isTouchDevice', () => {

	it( 'returns `false` if the device is not a touch device', () => {
		expect( isTouchDevice() ).toBe( false )
	} )

	it( 'returns `true` if the device is a touch device', () => {
		Object.defineProperty( window, 'ontouchstart', { value: true } )
		expect( isTouchDevice() ).toBe( true )
	} )

} )