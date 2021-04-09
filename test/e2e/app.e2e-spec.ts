import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import supertest from 'supertest'

import {
	getCacheModule,
	getConfigModule,
	getTypeOrmModule,
} from '../../src/modules'

import { AppService } from '../../src/app.service'
import { AppController } from '../../src/app.controller'
import { globalSetup } from './app-global-setup'

describe('AppController (e2e)', () => {
	let app: INestApplication
	let request: supertest.SuperTest<supertest.Test>
	let controller: AppController

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				getConfigModule({ test: true }),
				getTypeOrmModule(),
				getCacheModule(),
			],
			controllers: [AppController],
			providers: [AppService],
		}).compile()

		app = moduleFixture.createNestApplication()
		globalSetup(app)
		await app.init()
		request = supertest(app.getHttpServer())

		controller = moduleFixture.get<AppController>(AppController)
	})

	it('/ (GET)', async () => {
		const response = await request.get('/')
		expect(response.status).toBe(HttpStatus.OK)
		expect(response.body).toEqual(controller.getVersion())
	})
})
