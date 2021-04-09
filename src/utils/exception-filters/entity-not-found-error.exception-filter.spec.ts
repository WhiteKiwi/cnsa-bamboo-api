import { ArgumentsHost, HttpStatus } from '@nestjs/common'
import { EntityNotFoundError } from 'typeorm'
import { Entity } from 'typeorm'
import { exceptionFilters } from '.'
import { EntityNotFoundErrorFilter } from './entity-not-found-error.exception-filter'

describe('EntityNotFoundErrorFilter', () => {
	const ctx = {
		response: {
			httpCode: 0,
			obj: {},
			status(httpCode: number) {
				this.httpCode = httpCode
				return this
			},
			json(obj: any) {
				this.obj = obj
				return null
			},
		},
		getResponse() {
			return this.response
		},
	}
	const mockedHost: ArgumentsHost = {
		switchToHttp(): any {
			return ctx
		},
		getArgs() {
			return null
		},
		getArgByIndex() {
			return null
		},
		switchToRpc() {
			return null
		},
		switchToWs() {
			return null
		},
		getType() {
			return null
		},
	}
	it('From return 404 and "Entity Not Found"', () => {
		const entityNotFoundErrorFilter = exceptionFilters.find(
			(filter) => filter instanceof EntityNotFoundErrorFilter,
		)
		entityNotFoundErrorFilter.catch(
			new EntityNotFoundError(Entity, {}),
			mockedHost,
		)
		expect(ctx.response.httpCode).toBe(HttpStatus.NOT_FOUND)
		expect(ctx.response.obj).toEqual({
			statusCode: HttpStatus.NOT_FOUND,
			error: 'Entity Not Found',
		})
	})
})
