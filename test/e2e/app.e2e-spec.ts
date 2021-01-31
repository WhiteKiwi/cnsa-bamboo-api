import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import supertest from 'supertest'

import { getConfigModule, getTypeOrmModule } from '../../src/modules'

import { AppService } from '../../src/app.service'
import { AppController } from '../../src/app.controller'

describe('AppController (e2e)', () => {
	let app: INestApplication
	let request: supertest.SuperTest<supertest.Test>

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [getConfigModule({ isTest: true }), getTypeOrmModule()],
			controllers: [AppController],
			providers: [AppService],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
		request = supertest(app.getHttpServer())
	})

	it('/ (GET)', async () => {
		const response = await request.get('/')
		expect(response.status).toBe(HttpStatus.OK)
		expect(response.body).toEqual({
			version: '0.0.1',
		})
	})
})
