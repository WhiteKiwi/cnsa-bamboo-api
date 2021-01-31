import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import supertest from 'supertest'

import { getConfigModule, getTypeOrmModule } from '../../src/modules'
import { sleep } from '../../src/utils'

import { AppService } from '../../src/app.service'
import { AppController } from '../../src/app.controller'

import { QuestionsModule } from '../../src/questions/questions.module'
import { QuestionsService } from '../../src/questions/questions.service'
import { Question } from '../../src/entities'
import { getRepository, Repository } from 'typeorm'

describe('QuestionController (e2e)', () => {
	let app: INestApplication
	let request: supertest.SuperTest<supertest.Test>
	let questionRepository: Repository<Question>
	let service: QuestionsService

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

		service = moduleFixture.get<QuestionsService>(QuestionsService)
		questionRepository = getRepository(Question)
	})

	it('/ (GET)', async () => {
		const response = await request.get('/questions')
		expect(response.status).toBe(HttpStatus.OK)

		const receivedQuestions = response.body.map((question) => {
			question.updatedAt = new Date(question.updatedAt)
			question.createdAt = new Date(question.createdAt)
			return question
		})

		const questions = await service.find()
		expect(receivedQuestions).toEqual(questions)
	})

	it('/random (GET)', async () => {
		const { body: question } = await request.get('/questions/random')

		let diffenceCheck = false
		for (let i = 0; i < 100; i++) {
			const { body: randomQuestion } = await request.get(
				'/questions/random',
			)
			if (question.id !== randomQuestion.id) {
				diffenceCheck = true
				break
			}

			await sleep(500)
		}

		expect(diffenceCheck).toBe(true)
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
