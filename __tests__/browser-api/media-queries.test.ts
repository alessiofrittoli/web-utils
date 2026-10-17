import { getMediaMatches } from '@/browser-api/media-queries'
import { describe, expect, it } from 'vitest'

describe('getMediaMatches', () => {
	it('returns false if window is undefined', () => {
		expect(getMediaMatches('(max-width: 600px)')).toBe(false)
	})
})
