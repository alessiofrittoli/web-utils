/**
 * @jest-environment jsdom
 */

import { blockScroll, restoreScroll } from '@/dom'
import { cloneStyleSheetList, cloneStyleSheets } from '@/dom'

describe( 'dom utilities', () => {

	let originalHtmlStyle: CSSStyleDeclaration

	beforeEach( () => {
		originalHtmlStyle = {
			...document.documentElement.style
		}
	} )


	afterEach( () => {
		document.documentElement.style.cssText = ''
		Object.assign( document.documentElement.style, originalHtmlStyle )
	} )

	describe( 'blockScroll', () => {

		it( 'adds oveflow hidden to the <html /> node', () => {
			
			blockScroll()

			const htmlElement = document.documentElement
			
			expect( htmlElement.style.overflow ).toBe( 'hidden' )

		} )


		it( 'calculates the scrollbar width and sets the `--scrollbar-size` CSS variable to the <html /> node', () => {
			
			blockScroll()
			
			const htmlElement = document.documentElement

			expect( htmlElement.style.paddingRight ).toMatch( /px$/ )
			expect( htmlElement.style.getPropertyValue( '--scrollbar-size' ) ).toMatch( /px$/ )
			
		} )


		it( 'adds oveflow hidden to a custom HTML node', () => {
			
			const div = document.createElement( 'div' )
			document.body.appendChild( div )

			blockScroll( div )
			
			expect( div.style.overflow ).toBe( 'hidden' )

		} )


		it( 'calculates the scrollbar width and sets the `--scrollbar-size` CSS variable to a custom HTML node', () => {
			
			const div = document.createElement( 'div' )
			document.body.appendChild( div )

			blockScroll( div )

			expect( div.style.paddingRight ).toMatch( /px$/ )
			expect( div.style.getPropertyValue( '--scrollbar-size' ) ).toMatch( /px$/ )
			
		} )

	} )


	describe( 'restoreScroll', () => {

		it( 'restores scroll of the <html /> element', () => {

			blockScroll()
			restoreScroll()

			const htmlElement = document.documentElement

			expect( htmlElement.style.overflow ).toBe( '' )
			expect( htmlElement.style.paddingRight ).toBe( '' )
			expect( htmlElement.style.getPropertyValue( '--scrollbar-size' ) ).toBe( '' )

		} )

		
		it( 'restores scroll of a custom HTML element', () => {

			const div = document.createElement( 'div' )
			document.body.appendChild( div )

			blockScroll( div )
			restoreScroll( div )

			expect( div.style.overflow ).toBe( '' )
			expect( div.style.paddingRight ).toBe( '' )
			expect( div.style.getPropertyValue( '--scrollbar-size' ) ).toBe( '' )

			document.body.removeChild( div )

		} )

	} )


	describe( 'cloneStyleSheetList', () => {

		beforeEach( () => {
			// clean styles
			document.querySelectorAll( 'style' ).forEach( style => {
				style.remove()
			} )
		} )


		it( 'clones StyleSheetList into HTMLStyleElements', () => {

			const styles = Array.from( Array( 2 ) ).map( ( _, index ) => {
				const style = document.createElement( 'style' )
				style.innerHTML = `h${ index + 1 } {color: green;}`

				document.head.appendChild( style )
				return style
			} )

			const cloned = cloneStyleSheetList( document.styleSheets )

			expect( cloned.length ).toBe( styles.length )

			cloned.forEach( ( style, index ) => {
				expect( style ).toBeInstanceOf( HTMLStyleElement )
				expect( style.innerText )
					.toBe( styles[ index ]?.innerText )
			} )

		} )


		it( 'clones an array of CSSStyleSheet into HTMLStyleElements', () => {

			const styles = Array.from( Array( 2 ) ).map( ( _, index ) => {
				const style = new CSSStyleSheet()
				style.insertRule( `h${ index + 1 }: {color: green;}` )
				return style
			} )

			const cloned = cloneStyleSheetList( styles )

			expect( cloned.length ).toBe( styles.length )

			cloned.forEach( ( style, index ) => {
				const rules = Array.from( styles[ index ]?.cssRules || [] )

				expect( style ).toBeInstanceOf( HTMLStyleElement )
				expect( style.innerHTML )
					.toBe( rules.at( 0 )?.cssText )
			} )

		} )


		it( 'filters out stylesheets with inaccessible cssRules', () => {
			
			const cloned = cloneStyleSheetList( [ new CSSStyleSheet() ] )

			expect( cloned.length ).toBe( 0 )

		} )


		it( 'logs error to console when an error occurs and skips iteration', () => {

			const consoleSpy = jest.spyOn( console, 'error' ).mockImplementation( () => {} )

			const createElementSpy = jest.spyOn( document, 'createElement' ).mockImplementation( () => {
				throw new Error( 'Unexpected error' )
			} )

			const result = cloneStyleSheetList( [ {} as CSSStyleSheet ] )

			expect( result ).toEqual( [] )

			expect( consoleSpy ).toHaveBeenCalledWith(
				'Error while cloning styles.', expect.any( Error )
			)

			consoleSpy.mockRestore()
			createElementSpy.mockRestore()

		} )

	} )
	

	describe( 'cloneStyleSheets', () => {

		beforeEach( () => {
			// clean styles
			document.querySelectorAll( 'style' ).forEach( style => {
				style.remove()
			} )
		} )


		describe( 'StyleSheetList', () => {
			
			it( 'clones a StyleSheetList or an array of StyleSheetList', async () => {

				const styles = Array.from( Array( 2 ) ).map( ( _, index ) => {
					const style = document.createElement( 'style' )
					style.innerHTML = `h${ index + 1 } {color: green;}`

					document.head.appendChild( style )
					return style
				} )

				const cloned = await cloneStyleSheets( document.styleSheets )

				expect( cloned.length ).toBe( styles.length )

				cloned.forEach( ( style, index ) => {
					expect( style ).toBeInstanceOf( HTMLStyleElement )
					expect( style.innerText )
						.toBe( styles[ index ]?.innerText )
				} )

			} )

		} )


		describe( 'CSSStyleSheet', () => {
			
			it( 'clones a CSSStyleSheet', async () => {
	
				const style = new CSSStyleSheet()
				style.insertRule( 'h1: {color: green;}' )
	
				const cloned = await cloneStyleSheets( style )
	
				expect( cloned.length ).toBe( 1 )
	
				expect( cloned.at( 0 ) ).toBeInstanceOf( HTMLStyleElement )
				expect( cloned.at( 0 )?.innerHTML ).toBe( 'h1: {color: green;}' )
	
			} )
	
	
			it( 'clones an array of CSSStyleSheet', async () => {
				const styles = Array.from( Array( 2 ) ).map( ( _, index ) => {
					const style = new CSSStyleSheet()
					style.insertRule( `h${ index + 1 }: {color: green;}` )
					return style
				} )
	
				const cloned = await cloneStyleSheets( styles )
	
				expect( cloned.length ).toBe( styles.length )
	
				cloned.forEach( ( style, index ) => {
					const rules = Array.from( styles[ index ]?.cssRules || [] )
	
					expect( style ).toBeInstanceOf( HTMLStyleElement )
					expect( style.innerHTML )
						.toBe( rules.at( 0 )?.cssText )
				} )
			} )

		} )


		describe( 'HTMLStyleElement', () => {
			
			it( 'clones a single HTMLStyleElement', async () => {
	
				const style		= document.createElement( 'style' )
				style.innerHTML	= 'body { color: red; }'
				const result	= await cloneStyleSheets( style )
	
				expect( result ).toHaveLength( 1 )
				expect( result[ 0 ] ).toBeInstanceOf( HTMLStyleElement )
				expect( result[ 0 ]?.innerHTML ).toBe( 'body { color: red; }' )
	
			} )
			
			
			it( 'clones multiple styles from an array of HTMLStyleElement', async () => {
	
				const styles = Array.from( Array( 2 ) ).map( ( _, index ) => {
					const style		= document.createElement( 'style' )
					style.innerHTML	= `h${ index + 1 } {color: green;}`
					return style
				} )
	
				const cloned = await cloneStyleSheets( styles )
	
				expect( cloned.length ).toBe( styles.length )
	
				cloned.forEach( ( style, index ) => {
					expect( style ).toBeInstanceOf( HTMLStyleElement )
					expect( style.innerHTML )
						.toBe( styles[ index ]?.innerHTML )
				} )
	
			} )

		} )


		describe( 'UrlStylesheet', () => {

			it( 'creates a link element for URL stylesheet with fetch false', async () => {

				const result = await cloneStyleSheets( 'https://example.com/style.css' )

				expect( result ).toHaveLength( 1 )
				expect( result[ 0 ] ).toBeInstanceOf( HTMLLinkElement )
				expect( ( result[ 0 ] as HTMLLinkElement ).href ).toBe( 'https://example.com/style.css' )
				expect( ( result[ 0 ] as HTMLLinkElement ).rel ).toBe( 'stylesheet' )

			} )


			it( 'creates a link element for URL stylesheet object with fetch undefined', async () => {

				const result = await cloneStyleSheets( { url: { pathname: '/style.css' }, fetch: undefined } )

				expect( result ).toHaveLength( 1 )
				expect( result[ 0 ] ).toBeInstanceOf( HTMLLinkElement )
				expect( ( result[ 0 ] as HTMLLinkElement ).href ).toBe( 'http://localhost/style.css' )

			} )
			
			
			it( 'creates a link element for URL stylesheet object with fetch false', async () => {

				const result = await cloneStyleSheets( { url: 'https://example.com/style.css', fetch: false } )

				expect( result ).toHaveLength( 1 )
				expect( result[ 0 ] ).toBeInstanceOf( HTMLLinkElement )
				expect( ( result[ 0 ] as HTMLLinkElement ).href ).toBe( 'https://example.com/style.css' )

			} )


			describe( 'fetch', () => {
	
				let deleteFetch = false
				let fetchSpy: jest.SpyInstance<ReturnType<typeof fetch>>
				const responseText = jest.fn()
	
				beforeAll( () => {
					if ( ! global.fetch ) {
						Object.defineProperty( global, 'fetch', {
							writable: true,
							value	: jest.fn(),
						} )
						deleteFetch = true
					}
	
					fetchSpy = jest.spyOn( global, 'fetch' ).mockResolvedValue( {
						ok		: true,
						status	: 200,
						text	: responseText,
						headers	: new Headers( { 'Content-Type': 'text/css' } ),
					} as unknown as Response )
				} )
	
				afterAll( () => {
					fetchSpy.mockRestore()
	
					if ( deleteFetch ) {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						delete ( global as any ).fetch
					}
				} )
	
				it( 'returns HTMLStyleElement with fetched content if fetch is set to true', async () => {
					
					const css = 'h1 {color: green}'
					responseText.mockReturnValueOnce( css )
					const result = await cloneStyleSheets( { url: 'https://example.com/style.css', fetch: true } )
		
					expect( fetchSpy ).toHaveBeenCalled()
					expect( result ).toHaveLength( 1 )
					expect( result[ 0 ] ).toBeInstanceOf( HTMLStyleElement )
					expect( result[ 0 ]?.textContent ).toBe( css )
		
				} )
				
				
				it( 'doesn\'t return a HTMLStyleElement if fetch fails', async () => {
					
					fetchSpy.mockResolvedValueOnce( {
						ok		: false,
						status	: 404,
						text	: responseText,
						headers	: new Headers(),
					} as unknown as Response )
	
					const result = await cloneStyleSheets( { url: 'https://example.com/style.css', fetch: true } )
		
					expect( fetchSpy ).toHaveBeenCalled()
					expect( result ).toHaveLength( 0 )
		
				} )
	
			} )

		} )

	} )

} )