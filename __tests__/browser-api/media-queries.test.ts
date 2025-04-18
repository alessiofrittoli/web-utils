/**
 * @jest-environment jsdom
 */

import { getMediaMatches } from '@/browser-api/media-queries'


describe( 'getMediaMatches', () => {

	const originalWindow = global.window

	beforeEach( () => {
		// Reset any mocks before each test
		jest.resetAllMocks()
	} )

	afterEach( () => {
		global.window = originalWindow
	} )


	it( 'returns false if window is undefined', () => {

		// @ts-expect-error no one should do this
		delete global.window

		expect( getMediaMatches( '(max-width: 600px)' ) ).toBe( false )

	} )


	it( 'returns true if the media query matches', () => {

		const matchMedia = jest.fn().mockImplementation( query => ( {
			matches	: true,
			media	: query,
		} ) )

		global.window = {
			...global.window, matchMedia
		} as unknown as Window & typeof globalThis

		expect( getMediaMatches( '(max-width: 600px)' ) ).toBe( true )
		expect( matchMedia ).toHaveBeenCalledWith( '(max-width: 600px)' )
		
	} )


	it( 'returns false if the media query does not match', () => {
		
		const matchMedia = jest.fn().mockImplementation( query => ( {
			matches	: false,
			media	: query,
		} ) )

		global.window = {
			...global.window, matchMedia
		} as unknown as Window & typeof globalThis

		expect( getMediaMatches( '(max-width: 600px)' ) ).toBe( false )
		expect( matchMedia ).toHaveBeenCalledWith( '(max-width: 600px)' )

	} )

} )