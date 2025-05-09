import { isNotEmpty, isEmpty } from '@/validation'
import { isValidEmail, isValidPhoneNumber, isValidVat } from '@/validation'
import { isLessThan, isGreaterThan, isInRange } from '@/validation'
import { isStrictEqual, isSQLStatement } from '@/validation'


describe( 'Validation Utils', () => {

	describe( 'isEmpty', () => {
		it( 'returns `true` for empty strings', () => {
			expect( isEmpty( 'String value' ) ).toBe( false )
			expect( isEmpty( '' ) ).toBe( true )
			expect( isEmpty( ' ' ) ).toBe( true )
			expect( isEmpty( '    ' ) ).toBe( true )
		} )
	} )


	describe( 'isNotEmpty', () => {
		it( 'returns `true` for non-empty strings', () => {
			expect( isNotEmpty( 'String value' ) ).toBe( true )
			expect( isNotEmpty( '' ) ).toBe( false )
			expect( isNotEmpty( ' ' ) ).toBe( false )
			expect( isNotEmpty( '    ' ) ).toBe( false )
		} )
	} )


	describe( 'isValidEmail', () => {
		it( 'returns `true` for valid email addresses', () => {
			expect( isValidEmail( 'test@example.com' ) ).toBe( true )
			expect( isValidEmail( 'invalid-email@example-with-no-exstension' ) ).toBe( false )
			expect( isValidEmail( 'invalid-email' ) ).toBe( false )
		} )
	} )


	describe( 'isValidPhoneNumber', () => {
		it( 'returns `true` for valid phone numbers', () => {
			expect( isValidPhoneNumber( '(123) 456-7890' ) ).toBe( true )
			expect( isValidPhoneNumber( '+(123) 456-7890' ) ).toBe( true )
			expect( isValidPhoneNumber( '+(123)-456-7890' ) ).toBe( true )
			expect( isValidPhoneNumber( '+(123) - 456-7890' ) ).toBe( true )
			expect( isValidPhoneNumber( '+(123) - 456-78-90' ) ).toBe( true )
			expect( isValidPhoneNumber( '123-456-7890' ) ).toBe( true )
			expect( isValidPhoneNumber( '123.456.7890' ) ).toBe( true )
			expect( isValidPhoneNumber( '1234567890' ) ).toBe( true )
			expect( isValidPhoneNumber( '+393204567890' ) ).toBe( true )
			expect( isValidPhoneNumber( '+39 320 456 7890' ) ).toBe( true )
			expect( isValidPhoneNumber( '00393204567890' ) ).toBe( true )
			expect( isValidPhoneNumber( '075-63546725' ) ).toBe( true )
			expect( isValidPhoneNumber( '075-635-467-25' ) ).toBe( true )
			expect( isValidPhoneNumber( '0075-635-467-25' ) ).toBe( true )

			expect( isValidPhoneNumber( '00(123) 456-7890' ) ).toBe( false )
			expect( isValidPhoneNumber( 'invalid-phone' ) ).toBe( false )

		} )
	} )


	describe( 'isValidVat', () => {
		it( 'returns `true` for valid VAT numbers', () => {
			expect( isValidVat( 'IT12345678912' ) ).toBe( true )
			expect( isValidVat( 'DE123456789' ) ).toBe( true )
			expect( isValidVat( 'invalid-vat' ) ).toBe( false )
		} )
	} )


	describe( 'isLessThan', () => {
		it( 'returns `true` if `value` is less than `a`', () => {
			expect( isLessThan( 10, 5 ) ).toBe( true )
			expect( isLessThan( 10, 15 ) ).toBe( false )
		} )


		it( 'checks string length if `string` given as `value`', () => {
			expect( isLessThan( 10, 'short' ) ).toBe( true )
			expect( isLessThan( 10, 'longer string' ) ).toBe( false )
		} )
		
		
		it( 'fallbacks `value` to `0`', () => {
			expect( isLessThan( 1 ) ).toBe( true )
			expect( isLessThan( -1 ) ).toBe( false )
		} )
	} )


	describe( 'isGreaterThan', () => {
		it( 'returns `true` if `value` is greather than `a`', () => {
			expect( isGreaterThan( 10, 5 ) ).toBe( false )
			expect( isGreaterThan( 10, 15 ) ).toBe( true )
		} )


		it( 'checks string length if `string` given as `value`', () => {
			expect( isGreaterThan( 10, 'short' ) ).toBe( false )
			expect( isGreaterThan( 10, 'longer string' ) ).toBe( true )
		} )


		it( 'fallbacks `value` to `0`', () => {
			expect( isGreaterThan( 1 ) ).toBe( false )
			expect( isGreaterThan( -1 ) ).toBe( true )
		} )
	} )


	describe( 'isInRange', () => {
		it( 'returns `true` if `value` is greather than `a` and less than `b`', () => {
			expect( isInRange( 5, 10, 7 ) ).toBe( true )
			expect( isInRange( 5, 10, 4 ) ).toBe( false )
		} )


		it( 'checks string length if `string` given as `value`', () => {
			expect( isInRange( 5, 10, 'seven' ) ).toBe( true )
			expect( isInRange( 5, 10, 'longer string' ) ).toBe( false )
		} )


		it( 'fallbacks `value` to `0`', () => {
			expect( isInRange( 0, 0 ) ).toBe( true )
		} )
	} )


	describe( 'isStrictEqual', () => {
		it( 'returns `true` if both values are equal', () => {
			expect( isStrictEqual( 'test', 'test' ) ).toBe( true )
			expect( isStrictEqual( 'test', 'different' ) ).toBe( false )	
			expect( isStrictEqual( [], [] ) ).toBe( false )

			const ref1: unknown[] = []
			const ref2 = ref1

			expect( isStrictEqual( ref1, ref2 ) ).toBe( true )
		} )
	} )


	describe( 'isSQLStatement', () => {
		it( 'detects SQL statements', () => {
			expect( isSQLStatement( 'SELECT * FROM users' ) ).toBe( true )
			expect( isSQLStatement( 'DELETE FROM users WHERE id = 1' ) ).toBe( true )
			expect( isSQLStatement( 'INSERT INTO users (name) VALUES ("John")' ) ).toBe( true )
			expect( isSQLStatement( 'UPDATE users SET name = "John" WHERE `id` = 1' ) ).toBe( true )
			expect( isSQLStatement( 'UNION SELECT * FROM users' ) ).toBe( true )
			expect( isSQLStatement( 'REPLACE INTO users (id, name) VALUES (1, "John")' ) ).toBe( true )
			expect( isSQLStatement( 'CREATE TABLE users (id INT, name VARCHAR(255))' ) ).toBe( true )
			expect( isSQLStatement( 'DROP TABLE users' ) ).toBe( true )
			expect( isSQLStatement( 'ALTER TABLE users ADD COLUMN age INT' ) ).toBe( true )
			expect( isSQLStatement( 'RENAME TABLE users TO customers' ) ).toBe( true )
			expect( isSQLStatement( 'SELECT * FROM users; --' ) ).toBe( true )
		} )
	

		it( 'does not detect non-SQL statements', () => {
			expect( isSQLStatement( 'This is a regular sentence.' ) ).toBe( false )
			expect( isSQLStatement( 'SELECTING a book FROM the shelf' ) ).toBe( false )
			expect( isSQLStatement( 'DROP the ball' ) ).toBe( false )
			expect( isSQLStatement( 'ALTER your plans' ) ).toBe( false )
			expect( isSQLStatement( 'RENAME the file' ) ).toBe( false )
			expect( isSQLStatement( 'SELECT this is a normal string' ) ).toBe( false )
		} )
	

		it('returns false for non-string values', () => {
			expect( isSQLStatement( null ) ).toBe( false )
			expect( isSQLStatement( undefined ) ).toBe( false )
			expect( isSQLStatement( 123 ) ).toBe( false )
			expect( isSQLStatement( {} ) ).toBe( false )
			expect( isSQLStatement( [] ) ).toBe( false )
		} )
	} )

} )