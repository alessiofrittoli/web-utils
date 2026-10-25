export const PiPErrors = {
	DOCUMENT_PIP_NOT_SUPPORTED: 'ERR:DOCUMENTPIPNOTSUPPORTED',
} as const

export type PiPErrors = (typeof PiPErrors)[keyof typeof PiPErrors]
