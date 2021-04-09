import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import supertest from 'supertest'

import { getConfigModule, getTypeOrmModule } from '../../src/modules'

import { AppService } from '../../src/app.service'
import { AppController } from '../../src/app.controller'
import { ReportsModule } from '../../src/api/reports/reports.module'
import { QuestionsModule } from '../../src/api/questions/questions.module'
import { globalSetup } from '../../src/main'

describe('AppController (e2e)', () => {
	let app: INestApplication
	let request: supertest.SuperTest<supertest.Test>
	let controller: AppController

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				getConfigModule({ test: true }),
				getTypeOrmModule(),
				ReportsModule,
				QuestionsModule,
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
