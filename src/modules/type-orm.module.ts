import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import path from 'path'

import { TYPEORM } from '../config'

export function getTypeOrmModule() {
	return TypeOrmModule.forRootAsync({
		imports: [ConfigModule],
		useFactory: (configService: ConfigService) => ({
			type: 'mysql',
			host: configService.get(TYPEORM.HOST),
			port: +configService.get<number>(TYPEORM.PORT),
			database: configService.get(TYPEORM.DATABASE),
			username: configService.get(TYPEORM.USERNAME),
			password: configService.get(TYPEORM.PASSWORD),

			entities: [path.join(__dirname, '../typeorm/entities/*.{ts,js}')],
			migrations: [
				path.join(__dirname, '../typeorm/migrations/*.{ts,js}'),
			],
			migrationsRun: true,
			keepConnectionAlive: true,
			// This value must be false! - https://typeorm.io/#/connection-options/common-connection-options
			synchronize: false,
		}),
		inject: [ConfigService],
	})
}
