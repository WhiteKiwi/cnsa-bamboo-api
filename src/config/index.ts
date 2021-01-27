import { ConfigModule } from '@nestjs/config'
import configuration from './configuration'
import validationSchema from './validation-schema'

export default ({ isTest = false } = {}) =>
	ConfigModule.forRoot({
		isGlobal: true,
		envFilePath: isTest ? 'test/.env' : '.env',
		load: [configuration],
		validationSchema,
	})
