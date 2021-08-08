import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import supertest from 'supertest'
import { getRepository, Repository } from 'typeorm'

import { AppController } from '../../src/app.controller'
import { AppService } from '../../src/app.service'
import { QuestionsController } from '../../src/modules/application/questions/questions.controller'
import { QuestionsModule } from '../../src/modules/application/questions/questions.module'
import { Question } from '../../src/typeorm/entities'
import { defaultModulesForTest } from '../lib'
import { globalAppSetup } from '../lib/global-app-setup'
import { sleep } from '../test-env/utils'

describe('QuestionController (e2e)', () => {
	let app: INestApplication
	let request: supertest.SuperTest<supertest.Test>
	let controller: QuestionsController
	let questionRepository: Repository<Question>

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [...defaultModulesForTest, QuestionsModule],
			controllers: [AppController],
			providers: [AppService],
		}).compile()

		app = moduleFixture.createNestApplication()
		globalAppSetup(app)
		await app.init()
		request = supertest(app.getHttpServer())

		controller = moduleFixture.get<QuestionsController>(QuestionsController)
		questionRepository = getRepository(Question)
	})

	it('/ (GET)', async () => {
		const response = await request.get('/questions')
		expect(response.status).toBe(HttpStatus.OK)

		const questions = await controller.getAll()
		expect(response.body).toEqual(questions)
	})

	it('/random (GET)', async () => {
		const { body: question, status } = await request.get(
			'/questions/random',
		)
		expect(status).toBe(HttpStatus.OK)

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

	it('/ (POST) - Should be return 409 Conflict', async () => {
		const question = 'GDFSBHIJID'
		const firstResponse = await request
			.post('/questions')
			.send({ question })
		expect(firstResponse.status).toBe(HttpStatus.CREATED)

		const secondResponse = await request
			.post('/questions')
			.send({ question })
		expect(secondResponse.status).toBe(HttpStatus.CONFLICT)
	})
})
