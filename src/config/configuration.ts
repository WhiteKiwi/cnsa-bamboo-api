import { version } from '../../package.json'

export default () => ({
	VERSION: version,
	PORT: process.env.PORT,
	ENVIRONMENT: process.env.ENVIRONMENT,
	TYPEORM: {
		HOST: process.env.TYPEORM_HOST,
		PORT: process.env.TYPEORM_PORT,
		DATABASE: process.env.TYPEORM_DATABASE,
		USERNAME: process.env.TYPEORM_USERNAME,
		PASSWORD: process.env.TYPEORM_PASSWORD,
	},
	REDIS: {
		HOST: process.env.REDIS_HOST,
		PORT: process.env.REDIS_PORT,
		USER: process.env.REDIS_USER,
		PASSWORD: process.env.REDIS_PASSWORD,
	},
	SENTRY: {
		DSN: process.env.SENTRY_DSN,
	},
})
