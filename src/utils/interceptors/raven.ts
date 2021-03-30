import { HttpException, HttpStatus } from '@nestjs/common'
import { RavenInterceptor } from 'nest-raven'
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'

export const ravenInterceptor = new RavenInterceptor({
	filters: [
		{
			type: HttpException,
			filter: (exception: HttpException) =>
				HttpStatus.INTERNAL_SERVER_ERROR > exception.getStatus(),
		},
		{
			type: EntityNotFoundError,
			filter: (exception: HttpException) => true,
		},
	],
})
