import { getMediaMatches } from '@/browser-api/media-queries'

/**
 * Use this media query to check if document currently matches the portrait device orientation.
 * 
 */
export const portraitMediaQuery = '(orientation:portrait)'


/**
 * Check if device is in portrait orientation.
 *
 * @returns `true` if the device is in portrait orientation when this function is executed, `false` otherwise.
 */
export const isPortrait = () => getMediaMatches( portraitMediaQuery )