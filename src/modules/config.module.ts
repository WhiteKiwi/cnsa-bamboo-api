import { ConfigModule } from '@nestjs/config'
import configuration from '../config/configuration'
import validationSchema from '../config/validation-schema'

export function getConfigModule({ test = false } = {}) {
	return ConfigModule.forRoot({
		isGlobal: true,
		envFilePath: test ? 'test/.env' : '.env',
		load: [configuration],
		validationSchema,
	})
}
