import { ErrorCode as Exception } from '@alessiofrittoli/exception/code';

export const WebUtils = {
	DOCUMENT_PIP_NOT_SUPPORTED: 'ERR:DOCUMENTPIPNOTSUPPORTED',
} as const

export const ErrorCode = { ...Exception, ...WebUtils }
export type ErrorCode = ( typeof ErrorCode )[ keyof typeof ErrorCode ]