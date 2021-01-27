import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import GetConfigModule from './config'

@Module({
	imports: [
		GetConfigModule(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'mysql',
				host: configService.get('TYPEORM_HOST'),
				port: +configService.get<number>('TYPEORM_PORT'),
				database: configService.get('TYPEORM_DATABASE'),
				username: configService.get('TYPEORM_USERNAME'),
				password: configService.get('TYPEORM_PASSWORD'),

				entities: [configService.get('TYPEORM_ENTITIES')],
				migrations: [configService.get('TYPEORM_MIGRATIONS')],
				// This value must be false! - https://typeorm.io/#/connection-options/common-connection-options
				synchronize: false,
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
