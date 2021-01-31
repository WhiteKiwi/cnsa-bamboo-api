import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import supertest from 'supertest'

import { getConfigModule, getTypeOrmModule } from '../../src/modules'

import { AppService } from '../../src/app.service'
import { AppController } from '../../src/app.controller'

import { QuestionsModule } from '../../src/questions/questions.module'
import { Question } from '../../src/entities'
import { getRepository, Repository } from 'typeorm'

describe('QuestionController (e2e)', () => {
	let app: INestApplication
	let request: supertest.SuperTest<supertest.Test>
	let questionRepository: Repository<Question>

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				getConfigModule({ isTest: true }),
				getTypeOrmModule(),
				QuestionsModule,
			],
			controllers: [AppController],
			providers: [AppService],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
		request = supertest(app.getHttpServer())

		questionRepository = getRepository(Question)
	})

	it('/ (POST)', async () => {
		const question = '감자는 바보?'
		const response = await request.post('/questions').send({ question })
		expect(response.status).toBe(HttpStatus.CREATED)

		const data = await questionRepository.findOne({ content: question })
		expect(data).not.toBeNull()
		expect(data.content).toBe(question)
	})
})
