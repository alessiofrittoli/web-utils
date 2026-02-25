/**
 * @jest-environment jsdom
 */
import {
	isDocumentPictureInPictureSupported,
	requiresDocumentPictureInPictureAPI,
	openDocumentPictureInPicture,
	type OpenDocumentPictureInPictureOptions,
} from '@/browser-api/picture-in-picture'
import { ErrorCode } from '@/errors'

import { cloneStyleSheets as _cloneStyleSheets, type Styles } from '@/dom'


jest.mock( '@/dom', () => ( {
	cloneStyleSheets: jest.fn( async () => {
		return [
			document.createElement( 'style' )
		]
	} )
} ) )


const cloneStyleSheets = _cloneStyleSheets as (
	jest.Mock<ReturnType<typeof _cloneStyleSheets>, Parameters<typeof _cloneStyleSheets>>
)


interface RequestWindowOptions extends Omit<OpenDocumentPictureInPictureOptions, 'sizes'| 'styles' | 'onQuit'>
{
	width: number
	height: number
}


describe( 'Document Picture-in-Picture', () => {

	let mockDocumentPiPWindow: {
		width: number
		height: number
		disallowReturnToOpener?: boolean
		preferInitialWindowPlacement?: boolean
		addEventListener: jest.Mock<void, [ event: string, listener: ( event: Event ) => void ]>
		document: {
			head: HTMLHeadElement
		}
	}

	let mockRequestWindow: jest.Mock<typeof mockDocumentPiPWindow, [ options: RequestWindowOptions ]>

	let mockDocumentPictureInPicture: jest.Mock<{
		requestWindow?: typeof mockRequestWindow
	}>

	beforeEach( () => {

		mockDocumentPiPWindow = {
			width: 0,
			height: 0,
			disallowReturnToOpener: undefined,
			preferInitialWindowPlacement: undefined,
			addEventListener: jest.fn( ( event, listener ) => {
				listener( new Event( event ) )
			} ),
			document: {
				head: document.createElement( 'head' )
			}
		}

		mockRequestWindow = jest.fn( options => {
			Object.entries( options ).map( ( [ key, value ] ) => {
				// @ts-expect-error couldn't infer types
				mockDocumentPiPWindow[ key as keyof typeof mockDocumentPiPWindow ] = value
			} )				
			return mockDocumentPiPWindow
		} )

		mockDocumentPictureInPicture = jest.fn( () => ( {
			requestWindow: mockRequestWindow
		} ) )

		Object.defineProperty( window, 'documentPictureInPicture', {
			configurable	: true,
			get				: mockDocumentPictureInPicture,
		} )

	} )


	afterEach( () => {
		jest.clearAllMocks()
		Object.defineProperty( window, 'documentPictureInPicture', {
			configurable	: true,
			get				: undefined,
		} )
	} )


	describe( 'isDocumentPictureInPictureSupported', () => {
		
		it( 'returns true if Document Picture-in-Picture API is available', () => {

			expect( isDocumentPictureInPictureSupported() ).toBe( true )

		} )


		it( 'returns false if Document Picture-in-Picture API is not available', () => {

			mockDocumentPictureInPicture.mockReturnValue( {} )
			expect( isDocumentPictureInPictureSupported() ).toBe( false )

		} )

	} )
	
	
	describe( 'requiresDocumentPictureInPictureAPI', () => {
		
		it( 'throws an Exception if Document Picture-in-Picture is not supported', () => {

			mockDocumentPictureInPicture.mockReturnValue( {} )
			
			expect( requiresDocumentPictureInPictureAPI )
				.toThrow( expect.objectContaining( { code: ErrorCode.DOCUMENT_PIP_NOT_SUPPORTED } ) )

		} )


		it( 'doesn\'t throw any Exception if Document Picture-in-Picture is supported', () => {

			expect( requiresDocumentPictureInPictureAPI ).not.toThrow()

		} )

	} )


	describe( 'openDocumentPictureInPicture', () => {

		it( 'returns the new browsing context inside the Document Picture-in-Picture window with default options', async () => {

			const { window: pipWindow } = await openDocumentPictureInPicture()
			
			expect( pipWindow ).toBeDefined()
			expect( pipWindow ).toBe( mockDocumentPiPWindow ) // this pass only because we mocked the return value of `requestWindow`
			expect( mockRequestWindow )
				.toHaveBeenCalledWith( {
					width: 250,
					height: 250,
					disallowReturnToOpener: undefined,
					preferInitialWindowPlacement: undefined,
				} )

		} )
		
		
		it( 'opens the Document Picture-in-Picture window with the given options', async () => {

			await openDocumentPictureInPicture( {
				sizes: [ 200, 300 ],
				disallowReturnToOpener: true,
				preferInitialWindowPlacement: true,
			} )

			expect( mockRequestWindow )
				.toHaveBeenCalledWith( {
					width: 200,
					height: 300,
					disallowReturnToOpener: true,
					preferInitialWindowPlacement: true,
				} )

		} )


		it( 'clones the current document stylesheets', async () => {

			await openDocumentPictureInPicture()

			expect( cloneStyleSheets )
				.toHaveBeenCalledWith( document.styleSheets )

		} )


		it( 'clones the given stylesheets', async () => {

			const styles: Styles = { url: '/path-to-custom-style.css', fetch: true }

			await openDocumentPictureInPicture( { styles } )

			expect( cloneStyleSheets )
				.toHaveBeenNthCalledWith( 2, styles )

		} )


		it( 'calls given onQuit callback on Document Picture-in-Picture pagehide event', async () => {

			const onQuit = jest.fn()

			await openDocumentPictureInPicture( { onQuit } )

			expect( onQuit ).toHaveBeenCalled()

		} )

	} )

} )