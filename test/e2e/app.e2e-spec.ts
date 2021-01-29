import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'

import { getConfigModule, getTypeOrmModule } from '../../src/modules'

import { AppService } from '../../src/app.service'
import { AppController } from '../../src/app.controller'

describe('AppController (e2e)', () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [getConfigModule({ isTest: true }), getTypeOrmModule()],
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
