import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { ENVIRONMENT, PORT, SENTRY, VERSION } from './config'
import { AppModule } from './app.module'
import { Environment } from './utils/types'
import { isEmpty } from 'lodash'
import { json, urlencoded } from 'express'
import { exceptionFilters } from './utils/exception-filters'
import helmet from 'helmet'

// This allows TypeScript to detect our global value
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface Global {
			__rootdir__: string
		}
	}
}
global.__rootdir__ = __dirname || process.cwd()

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const configService: ConfigService = app.get(ConfigService)
	const port = configService.get<number>(PORT)

	if (configService.get(ENVIRONMENT) !== Environment.PRODUCTION) {
		setupSwagger(app)
	}
	setupSentry({
		app,
		dsn: configService.get(SENTRY.DSN),
		environment: configService.get(ENVIRONMENT),
		version: configService.get(VERSION),
	})

	app.useGlobalFilters(...exceptionFilters)
	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	app.use(json({ limit: '50mb' }))
	app.use(urlencoded({ limit: '50mb', extended: true }))
	app.use(helmet())

	await app.listen(port, () =>
		console.log(`API_BACKEND listening on port ${port}`),
	)
}
bootstrap()

// Sentry
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import { RewriteFrames } from '@sentry/integrations'

function setupSentry({
	app,
	dsn,
	environment,
	version,
}: {
	app
	dsn: string
	environment: Environment
	version: string
}) {
	const debug = [
		Environment.TEST,
		Environment.LOCAL,
		Environment.DEVELOPMENT,
	].includes(environment)
	Sentry.init({
		dsn,
		environment,
		release: version,
		debug,
		beforeSend: (event: Sentry.Event) => {
			if (debug) return null

			try {
				// set request info to tag
				if (isEmpty(event.tags)) {
					event.tags = {}
				}
				event.tags.request = `${event.extra.req['method']}: ${event.extra.req['url']}`
			} catch (e) {}
			return event
		},
		integrations: [
			new RewriteFrames({
				root: global.__rootdir__,
			}),
			new Tracing.Integrations.Express({ app }),
		],
		tracesSampler: (sample) => {
			// GET / => Health Check에 사용됨
			// GET / 는 1%만 check
			return new URL(sample.request.url).pathname !== '/' ? 1 : 0.01
		},
	})
	app.use(Sentry.Handlers.tracingHandler())
}

// Swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { version } from '../package.json'

function setupSwagger(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle('CNSA Bamboo App API')
		.setDescription('CNSA Bamboo App API description')
		.setVersion(version)
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, config)
	const swaggerCustomOptions = {
		customSiteTitle: 'CNSA Bamboo App API Docs',
	}
	SwaggerModule.setup('docs', app, document, swaggerCustomOptions)
}
