import Joi from 'joi'
import DEFAULT from './default'
import { ENVIRONMENT } from './constants'
import { ENVIRONMENT as ENV } from '../utils/types'
import { isArray } from 'lodash'

export default flatMapToJoiObject({
	PORT: makeJoiSchema({
		type: 'number',
		defaultValue: DEFAULT.PORT,
		requiredOnDeployment: false,
	}),
	ENVIRONMENT: makeJoiSchema({
		defaultValue: ENV.DEVELOPMENT,
		valid: Object.values(ENV),
		requiredOnDeployment: false,
	}),
	TYPEORM: {
		HOST: makeJoiSchema({ defaultValue: DEFAULT.TYPEORM.HOST }),
		PORT: makeJoiSchema({
			type: 'number',
			defaultValue: DEFAULT.TYPEORM.PORT,
		}),
		DATABASE: makeJoiSchema({ defaultValue: DEFAULT.TYPEORM.DATABASE }),
		USERNAME: makeJoiSchema({ defaultValue: DEFAULT.TYPEORM.USERNAME }),
		PASSWORD: makeJoiSchema({ defaultValue: DEFAULT.TYPEORM.PASSWORD }),
	},
	SENTRY: {
		DSN: makeJoiSchema(),
	},
})

// Joi schema를 만듬
function makeJoiSchema(
	{
		type = 'string',
		defaultValue,
		valid,
		requiredOnDeployment = true,
	}: {
		type?: string
		defaultValue?: any
		valid?: any[]
		requiredOnDeployment?: boolean
	} = { type: 'string', requiredOnDeployment: true },
): Joi.AnySchema {
	let schmea = Joi[type]().empty('')

	// valid value
	if (isArray(valid)) schmea = schmea.valid(...valid)

	// 기본 값
	if (defaultValue) schmea = schmea.default(defaultValue)

	// 배포 환경에서 필수 여부
	if (requiredOnDeployment)
		schmea = schmea.when(ENVIRONMENT, [
			{
				is: ENV.PRODUCTION,
				then: Joi[type]().required(),
			},
			{
				is: ENV.STAGING,
				then: Joi[type]().required(),
			},
		])
	return schmea
}

/**
 * 내부 object를 '_'로 묶어서 JOI_SCHEMA로 반환함
 * const obj = {
 * 		SENTRY: {
 * 			DSN: JOI_SCHEMA,
 * 			ESN: JOI_SCHEMA,
 * 		}
 * 	}
 * 	console.log(makeJoiObject(obj))
 * 	=> {
 * 		SENTRY_DSN: JOI_SCHEMA,
 * 		SENTRY_ESN: JOI_SCHEMA,
 * 	}
 */
function flatMapToJoiObject(obj: any) {
	const convertedObj = {}
	const keys = Object.keys(obj)
	for (const key of keys) {
		if (Joi.isSchema(obj[key])) {
			convertedObj[key] = obj[key]
		} else {
			for (const innerKey of Object.keys(obj[key])) {
				const unitedKey = key + '_' + innerKey
				obj[unitedKey] = obj[key][innerKey]
				keys.push(unitedKey)
			}
		}
	}
	return Joi.object(convertedObj)
}
