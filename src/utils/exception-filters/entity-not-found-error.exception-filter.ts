import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from '@nestjs/common'

import { Response } from 'express'
import { EntityNotFoundError } from 'typeorm'

@Catch(EntityNotFoundError)
export class EntityNotFoundErrorFilter implements ExceptionFilter {
	catch(exception: EntityNotFoundError, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		response.status(HttpStatus.NOT_FOUND).json({
			statusCode: HttpStatus.NOT_FOUND,
			error: 'Entity Not Found',
		})
	}
}
