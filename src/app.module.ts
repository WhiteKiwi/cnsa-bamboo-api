import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import path from 'path'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TYPEORM } from './config'
import configuration from './config/configuration'
import validationSchema from './config/validation-schema'
import { ApplicationModule } from './modules/application/application.module'
import { ravenInterceptor } from './utils/interceptors/raven'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
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
					path.join(__dirname, './typeorm/entities/*.{ts,js}'),
				],
				migrations: [
					path.join(__dirname, './typeorm/migrations/*.{ts,js}'),
				],
				migrationsRun: true,
				keepConnectionAlive: true,
				// This value must be false! - https://typeorm.io/#/connection-options/common-connection-options
				synchronize: false,
			}),
			inject: [ConfigService],
		}),
		ApplicationModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useValue: ravenInterceptor,
		},
	],
})
export class AppModule {}
