/**
 * @jest-environment jsdom
 */
import { openBrowserPopUp, type OpenBrowserPopUpOptions } from '@/browser-api/popup'

describe( 'openBrowserPopUp', () => {

	let windowOpenSpy: jest.SpyInstance

	beforeEach( () => {
		windowOpenSpy = jest.spyOn( window, 'open' ).mockImplementation( () => null )
	} )

	afterEach( () => {
		jest.restoreAllMocks()
	} )


	it( 'opens a popup with default options', () => {

		openBrowserPopUp()

		expect( windowOpenSpy ).toHaveBeenCalledWith(
			undefined,
			undefined,
			expect.stringContaining( 'popup=yes,width=600,height=800' ),
		)

	} )


	it( 'opens a popup with custom `width` and `height`', () => {

		const options: OpenBrowserPopUpOptions = { width: 400, height: 500 }
		openBrowserPopUp( options )

		expect( windowOpenSpy ).toHaveBeenCalledWith(
			undefined,
			undefined,
			expect.stringContaining( 'width=400,height=500' ),
		)

	} )


	it( 'opens a popup with a custom URL', () => {

		openBrowserPopUp( {
			url: 'https://example.com'
		} )

		expect( windowOpenSpy ).toHaveBeenCalledWith(
			'https://example.com',
			undefined,
			expect.any( String ),
		)
		
		
		openBrowserPopUp( {
			url: {
				pathname: '/path-name',
				query	: { param: 'value' },
			}
		} )

		expect( windowOpenSpy ).toHaveBeenCalledWith(
			'/path-name?param=value',
			undefined,
			expect.any( String ),
		)


		openBrowserPopUp( {
			url: new URL( '/path-name', 'http://localhost:3000' )
		} )

		expect( windowOpenSpy ).toHaveBeenCalledWith(
			'http://localhost:3000/path-name',
			undefined,
			expect.any( String ),
		)


		openBrowserPopUp( { url: '' } )

		expect( windowOpenSpy ).toHaveBeenCalledWith(
			'',
			undefined,
			expect.any( String ),
		)

	} )


	it( 'opens a popup with a custom context', () => {

		const options: OpenBrowserPopUpOptions = { context: 'customContext' };
		openBrowserPopUp( options )

		expect( windowOpenSpy ).toHaveBeenCalledWith(
			undefined,
			'customContext',
			expect.any( String ),
		)

	} )

	it( 'includes additional custom features', () => {

		const options: OpenBrowserPopUpOptions = {
			features: { attributionsrc: 'true', noreferrer: 'true' },
		}

		openBrowserPopUp( options )

		expect( windowOpenSpy ).toHaveBeenCalledWith(
			undefined,
			undefined,
			expect.stringContaining( 'attributionsrc=true,noreferrer=true' )
		)

	} )

	
	it( 'calculates default left and top positions', () => {

		const screen = {
			width	: 1920,
			height	: 1080,
		}

		Object.defineProperty( window.screen, 'width', { value: screen.width, writable: true } )
		Object.defineProperty( window.screen, 'height', { value: screen.height, writable: true } )

		openBrowserPopUp()

		const expectedLeft	= ( screen.width / 2 ) - ( ( 600 / 2 ) + 10 )
		const expectedTop	= ( screen.height / 2 ) - ( ( 800 / 2 ) + 50 )

		expect( windowOpenSpy ).toHaveBeenCalledWith(
			undefined,
			undefined,
			expect.stringContaining( `left=${ expectedLeft },top=${ expectedTop }` )
		)

	} )


	it( 'overrides default left and top positions if provided', () => {
		
		const options: OpenBrowserPopUpOptions = {
			features: { left: '100', top: '200' },
		}

		openBrowserPopUp( options )

		expect( windowOpenSpy ).toHaveBeenCalledWith(
			undefined,
			undefined,
			expect.stringContaining( 'left=100,top=200' )
		)

	} )

} )