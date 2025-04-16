/**
 * @jest-environment jsdom
 */

import { blockScroll, restoreScroll } from '@/dom'

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
} )