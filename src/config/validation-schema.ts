import Joi from '@hapi/joi';
import { DEFAULT_PORT } from './default'
import { ENVIRONMENT as ENV } from '../utils/constants'

export default Joi.object({
	PORT: Joi.number().empty('').default(DEFAULT_PORT),
	ENVIRONMENT: Joi.string()
		.empty('')
		.valid(...Object.keys(ENV))
		.default(ENV.DEVELOPMENT),
})