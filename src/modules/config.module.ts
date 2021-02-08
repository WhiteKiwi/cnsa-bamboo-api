import { ConfigModule } from '@nestjs/config'
import configuration from '../config/configuration'
import validationSchema from '../config/validation-schema'

export function getConfigModule({ isTest = false } = {}) {
	return ConfigModule.forRoot({
		isGlobal: true,
		envFilePath: isTest ? 'test/.env' : '.env',
		load: [configuration],
		validationSchema,
	})
}
