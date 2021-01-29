import Joi from '@hapi/joi'
import { DEFAULT_PORT, DEFAULT_TYPEORM } from './default'
import { ENVIRONMENT } from './constants'
import { ENVIRONMENT as ENV } from '../utils/constants'

export default Joi.object({
	PORT: Joi.number().empty('').default(DEFAULT_PORT),
	ENVIRONMENT: Joi.string()
		.empty('')
		.valid(...Object.keys(ENV))
		.default(ENV.DEVELOPMENT),
	TYPEORM: {
		HOST: Joi.string()
			.empty('')
			.default(DEFAULT_TYPEORM.HOST)
			.when(ENVIRONMENT, [
				{
					is: ENV.PRODUCTION,
					then: Joi.string().required(),
				},
				{
					is: ENV.STATGING,
					then: Joi.string().required(),
				},
			]),
		PORT: Joi.number()
			.empty('')
			.default(DEFAULT_TYPEORM.PORT)
			.when(ENVIRONMENT, [
				{
					is: ENV.PRODUCTION,
					then: Joi.number().required(),
				},
				{
					is: ENV.STATGING,
					then: Joi.number().required(),
				},
			]),
		DATABASE: Joi.string()
			.empty('')
			.default(DEFAULT_TYPEORM.DATABASE)
			.when(ENVIRONMENT, [
				{
					is: ENV.PRODUCTION,
					then: Joi.string().required(),
				},
				{
					is: ENV.STATGING,
					then: Joi.string().required(),
				},
			]),
		USERNAME: Joi.string()
			.empty('')
			.default(DEFAULT_TYPEORM.USERNAME)
			.when(ENVIRONMENT, [
				{
					is: ENV.PRODUCTION,
					then: Joi.string().required(),
				},
				{
					is: ENV.STATGING,
					then: Joi.string().required(),
				},
			]),
		PASSWORD: Joi.string()
			.empty('')
			.default(DEFAULT_TYPEORM.PASSWORD)
			.when(ENVIRONMENT, [
				{
					is: ENV.PRODUCTION,
					then: Joi.string().required(),
				},
				{
					is: ENV.STATGING,
					then: Joi.string().required(),
				},
			]),
	},
})
