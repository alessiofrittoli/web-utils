import { TextEncoder, TextDecoder } from 'util'

class Response
{
	private _data?: BodyInit | null
	private _init?: ResponseInit

	constructor( body?: BodyInit | null, init?: ResponseInit )
	{
		this._data = body
		this._init = init
	}

	async blob()
	{
		return new Blob( [ this._data?.toString() || '' ] )
	}
}


Object.assign( global, { TextDecoder, TextEncoder, Response } )