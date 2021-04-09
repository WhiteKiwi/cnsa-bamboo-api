import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { ENVIRONMENT, PORT, SENTRY, VERSION } from './config'
import { AppModule } from './app.module'
import { ENVIRONMENT as ENV } from './utils/types'
import { isEmpty } from 'lodash'
import { json, urlencoded } from 'express'
import { exceptionFilters } from './utils/exception-filters'

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

	setupSentry({
		app,
		dsn: configService.get(SENTRY.DSN),
		environment: configService.get(ENVIRONMENT),
		version: configService.get(VERSION),
	})

	app.useGlobalFilters(...exceptionFilters)

	app.use(json({ limit: '50mb' }))
	app.use(urlencoded({ limit: '50mb', extended: true }))

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
	environment: ENV
	version: string
}) {
	const debug = [ENV.TEST, ENV.LOCAL, ENV.DEVELOPMENT].includes(environment)
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
