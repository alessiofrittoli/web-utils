import { getMediaMatches as _getMediaMatches } from '@/browser-api/media-queries'
import { afterEach, describe, expect, it, vi, type Mock } from 'vitest'
import { isPortrait, portraitMediaQuery } from '@/device'

vi.mock('@/browser-api/media-queries', () => ({
	getMediaMatches: vi.fn(),
}))

const getMediaMatches = _getMediaMatches as Mock<typeof _getMediaMatches>

describe('isPortrait', () => {
	const originalWindow = global.window

	afterEach(() => {
		global.window = originalWindow
	})

	it('should return true when the device is in portrait orientation', () => {
		getMediaMatches.mockReturnValue(true)

		const result = isPortrait()

		expect(getMediaMatches).toHaveBeenCalledWith(portraitMediaQuery)
		expect(result).toBe(true)
	})

	it('should return false when the device is not in portrait orientation', () => {
		getMediaMatches.mockReturnValue(false)

		const result = isPortrait()

		expect(getMediaMatches).toHaveBeenCalledWith(portraitMediaQuery)
		expect(result).toBe(false)
	})
})
