import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import path from 'path'

export function getTypeOrmModule() {
	return TypeOrmModule.forRootAsync({
		imports: [ConfigModule],
		useFactory: (configService: ConfigService) => ({
			type: 'mysql',
			host: configService.get('TYPEORM_HOST'),
			port: +configService.get<number>('TYPEORM_PORT'),
			database: configService.get('TYPEORM_DATABASE'),
			username: configService.get('TYPEORM_USERNAME'),
			password: configService.get('TYPEORM_PASSWORD'),

			entities: [path.join(__dirname, '../entities/*.{ts,js}')],
			migrations: [path.join(__dirname, '../migrations/*.{ts,js}')],
			migrationsRun: true,
			// This value must be false! - https://typeorm.io/#/connection-options/common-connection-options
			synchronize: false,
		}),
		inject: [ConfigService],
	})
}
