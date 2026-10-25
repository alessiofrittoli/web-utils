import { emailDataToString, type EmailData } from '@/strings'

/**
 * Check whether the web page can leverage share APIs.
 *
 * @returns	`true` if web page is running in a secure context (HTTPS) and can leverage share APIs.
 */
export const canWebApiShare = (): boolean =>
	typeof navigator !== 'undefined' &&
	typeof navigator.canShare === 'function' &&
	typeof navigator.share === 'function'

/**
 * Check whether the web page can share the given data.
 *
 * @param	data (Optional) The data that is going to be shared.
 * @returns	`true` if web page is running in a secure context (HTTPS) and can share the given data, `false` otherwise.
 */
export const canWebApiShareData = (data?: globalThis.ShareData): boolean =>
	canWebApiShare() && navigator.canShare(data)

/**
 * Share data via Email.
 *
 */
export const shareViaEmail = (data: EmailData = {}): void => {
	window.location.href = emailDataToString(data)
}
