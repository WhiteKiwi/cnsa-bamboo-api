import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import supertest from 'supertest'

import { AppController } from '../../src/app.controller'
import { AppService } from '../../src/app.service'
import { defaultModulesForTest } from '../lib'
import { globalAppSetup } from '../lib/global-app-setup'

describe('AppController (e2e)', () => {
	let app: INestApplication
	let request: supertest.SuperTest<supertest.Test>
	let controller: AppController

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [...defaultModulesForTest],
			controllers: [AppController],
			providers: [AppService],
		}).compile()

		app = moduleFixture.createNestApplication()
		globalAppSetup(app)
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
