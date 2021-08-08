import { ExceptionFilter } from '@nestjs/common'

import { EntityNotFoundErrorFilter } from './entity-not-found-error.exception-filter'

export const exceptionFilters: ExceptionFilter[] = [
	new EntityNotFoundErrorFilter(),
]
