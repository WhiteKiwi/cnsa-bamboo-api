import { HttpStatus } from '@nestjs/common'

import { Response } from 'express'

export function createMockedResponse() {
	const response: Response | any = {
		headers: {},
		httpStatus: undefined,
		result: null,
		user: null,
		setHeader(key: string, value: string) {
			this.headers[key] = value
			return this
		},
		status(httpStatus: HttpStatus) {
			this.httpStatus = httpStatus
			return this
		},
		end(result: any) {
			this.result = result
		},
		send(text: string) {
			this.result = text
		},
		json(obj: any) {
			this.result = obj
		},
	}
	return response
}
