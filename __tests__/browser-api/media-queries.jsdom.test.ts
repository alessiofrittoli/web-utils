/**
 * @jest-environment jsdom
 */

import { getMediaMatches } from '@/browser-api/media-queries'


describe( 'getMediaMatches', () => {

	beforeAll( () => {
		Object.defineProperty( window, 'matchMedia', {
			value		: undefined,
			writable	: true,
			configurable: true,
		} )
	} )

	afterAll( () => {
		Object.defineProperty( window, 'matchMedia', {
			value		: undefined,
			writable	: true,
			configurable: true,
		} )
	} )


	it( 'returns true if the media query matches', () => {

		const matchMedia = jest.fn().mockImplementation( query => ( {
			matches	: true,
			media	: query,
		} ) )

		Object.defineProperty( window, 'matchMedia', {
			value: matchMedia,
		} )

		expect( getMediaMatches( '(max-width: 600px)' ) ).toBe( true )
		expect( matchMedia ).toHaveBeenCalledWith( '(max-width: 600px)' )
		
	} )


	it( 'returns false if the media query does not match', () => {
		
		const matchMedia = jest.fn().mockImplementation( query => ( {
			matches	: false,
			media	: query,
		} ) )

		Object.defineProperty( window, 'matchMedia', {
			value: matchMedia,
		} )

		expect( getMediaMatches( '(max-width: 600px)' ) ).toBe( false )
		expect( matchMedia ).toHaveBeenCalledWith( '(max-width: 600px)' )

	} )

} )