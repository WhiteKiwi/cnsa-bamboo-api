import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'

import { AppService } from '../../src/app.service'
import { AppController } from '../../src/app.controller'

import { getConfigModule } from '../../src/modules'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

describe('AppController (e2e)', () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				getConfigModule({ isTest: true }),
				TypeOrmModule.forRootAsync({
					imports: [ConfigModule],
					useFactory: (configService: ConfigService) => ({
						type: 'mysql',
						host: configService.get('TYPEORM_HOST'),
						port: +configService.get<number>('TYPEORM_PORT'),
						database: configService.get('TYPEORM_DATABASE'),
						username: configService.get('TYPEORM_USERNAME'),
						password: configService.get('TYPEORM_PASSWORD'),

						entities: [__dirname + '/../../src/entities/*.ts'],
						migrations: [__dirname + '/../../src/migrations/*.ts'],
						// This value must be false! - https://typeorm.io/#/connection-options/common-connection-options
						synchronize: false,
					}),
					inject: [ConfigService],
				}),
			],
			controllers: [AppController],
			providers: [AppService],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it('/ (GET)', () => {
		return request(app.getHttpServer()).get('/').expect(200).expect({
			version: '0.0.1',
		})
	})
})
