import DEFAULT from './default'
import Joi, { Types as JoiTypes } from 'joi'
import { ENVIRONMENT } from './constants'
import { Environment } from '../utils/types'
import { isArray } from 'lodash'

export default flatJoiObject({
	PORT: makeJoiSchema({
		type: 'number',
		defaultValue: DEFAULT.PORT,
		requiredOnDeployment: false,
	}),
	ENVIRONMENT: makeJoiSchema({
		defaultValue: Environment.DEVELOPMENT,
		valid: Object.values(Environment),
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
type MakeJoiSchemaParameters = {
	type?: JoiTypes
	allowEmpty?: boolean
	valid?: any[]
	defaultValue?: any
	requiredOnDeployment?: boolean
}
const DEFAULT_MAKE_JOI_SCHEMA_PARAMETERS: MakeJoiSchemaParameters = {
	type: 'number',
	allowEmpty: true,
	requiredOnDeployment: true,
}
function makeJoiSchema({
	type = DEFAULT_MAKE_JOI_SCHEMA_PARAMETERS.type,
	allowEmpty = DEFAULT_MAKE_JOI_SCHEMA_PARAMETERS.allowEmpty,
	valid,
	defaultValue,
	requiredOnDeployment = DEFAULT_MAKE_JOI_SCHEMA_PARAMETERS.requiredOnDeployment,
}: MakeJoiSchemaParameters = DEFAULT_MAKE_JOI_SCHEMA_PARAMETERS): Joi.AnySchema {
	let schmea = Joi[type]()

	// istanbul ignore next line
	if (allowEmpty) schmea = schmea.empty('')

	// valid value
	if (isArray(valid)) schmea = schmea.valid(...valid)

	// 기본 값
	if (defaultValue) schmea = schmea.default(defaultValue)

	// 배포 환경에서 필수 여부
	if (requiredOnDeployment)
		schmea = schmea.when(ENVIRONMENT, [
			{
				is: Environment.PRODUCTION,
				then: Joi[type]().required(),
			},
			{
				is: Environment.STAGING,
				then: Joi[type]().required(),
			},
		])
	return schmea
}

/**
 * 내부 object를 '_'로 묶어서 JOI_SCHEMA로 반환함
 * const obj = {
 * 		SENTRY: {
 * 			DSN: Joi.string(),
 * 			ESN: Joi.string(),
 * 		}
 * 	}
 * 	console.log(makeJoiObject(obj))
 * 	=> {
 * 		SENTRY_DSN: Joi.string(),
 * 		SENTRY_ESN: Joi.string(),
 * 	}
 */
type SchemaObject = {
	[key: string]: SchemaObject | Joi.AnySchema
}
function flatJoiObject(obj: SchemaObject): Joi.ObjectSchema {
	const convertedObj: { [key: string]: Joi.AnySchema } = {}
	const keys = Object.keys(obj)
	for (const key of keys) {
		if (Joi.isSchema(obj[key])) {
			convertedObj[key] = obj[key] as Joi.AnySchema
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
