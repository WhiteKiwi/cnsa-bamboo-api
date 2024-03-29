import { INestApplication, ValidationPipe } from '@nestjs/common'
import { json, urlencoded } from 'express'
import { exceptionFilters } from '../../src/utils/exception-filters'
import helmet from 'helmet'

// Export for e2e testing modules
export function globalSetup(app: INestApplication) {
	app.useGlobalFilters(...exceptionFilters)
	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	app.use(json({ limit: '50mb' }))
	app.use(urlencoded({ limit: '50mb', extended: true }))
	app.use(helmet())
}
