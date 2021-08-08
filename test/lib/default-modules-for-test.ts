import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import path from 'path'
import { TYPEORM } from '../../src/config'
import configuration from '../../src/config/configuration'
import validationSchema from '../../src/config/validation-schema'

export const defaultModulesForTest = [
	ConfigModule.forRoot({
		isGlobal: true,
		envFilePath: 'test/.env',
		load: [configuration],
		validationSchema,
	}),
	TypeOrmModule.forRootAsync({
		imports: [ConfigModule],
		useFactory: (configService: ConfigService) => ({
			type: 'postgres',
			host: configService.get(TYPEORM.HOST),
			port: +configService.get<number>(TYPEORM.PORT),
			database: configService.get(TYPEORM.DATABASE),
			username: configService.get(TYPEORM.USERNAME),
			password: configService.get(TYPEORM.PASSWORD),

			entities: [
				path.join(__dirname, '../../src/typeorm/entities/*.{ts,js}'),
			],
			migrations: [
				path.join(__dirname, '../../src/typeorm/migrations/*.{ts,js}'),
			],
			migrationsRun: true,
			keepConnectionAlive: true,
			// This value must be false! - https://typeorm.io/#/connection-options/common-connection-options
			synchronize: false,
		}),
		inject: [ConfigService],
	}),
]
