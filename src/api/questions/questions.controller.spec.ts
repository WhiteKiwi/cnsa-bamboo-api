import { Test, TestingModule } from '@nestjs/testing'
import { QuestionsController } from './questions.controller'
import { QuestionsService } from './questions.service'
import {
	getCacheModule,
	getConfigModule,
	getTypeOrmModule,
} from '../../modules'
import { sleep } from '../../../test/test-env/utils'
import { createMockedResponse } from '../../../test/test-env/utils'

import { TypeOrmModule } from '@nestjs/typeorm'
import { getRepository, Repository } from 'typeorm'
import { Question } from '../../typeorm/entities'
import { HttpStatus } from '@nestjs/common'

describe('QuestionsController', () => {
	let controller: QuestionsController
	let service: QuestionsService
	let questionRepository: Repository<Question>

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				getConfigModule({ test: true }),
				getTypeOrmModule(),
				getCacheModule(),
				TypeOrmModule.forFeature([Question]),
			],
			controllers: [QuestionsController],
			providers: [QuestionsService],
		}).compile()

		controller = module.get<QuestionsController>(QuestionsController)
		service = module.get<QuestionsService>(QuestionsService)
		questionRepository = getRepository(Question)
	})

	it('Should be get all question', async () => {
		const questions = await controller.getAll()

		const questionsInDb = await service.find()

		expect(questions).toEqual(questionsInDb)
	})

	it('Should be return one question randomly', async () => {
		const question = await controller.getRandomOne()

		let diffenceCheck = false
		for (let i = 0; i < 100; i++) {
			const randomQuestion = await controller.getRandomOne()
			if (question.id !== randomQuestion.id) {
				diffenceCheck = true
				break
			}

			await sleep(500)
		}

		expect(diffenceCheck).toBe(true)
	})

	it('Should be create question', async () => {
		const question = '감자의 키는?'
		await controller.create(question, createMockedResponse())

		const data = await questionRepository.find({ content: question })

		expect(data).not.toBeNull()
	})

	it('Should be return 409 Conflict', async () => {
		const question = 'ADRFSGABVDFS'

		await controller.create(question, createMockedResponse())
		const mockedResponse = createMockedResponse()
		await controller.create(question, mockedResponse)

		expect(mockedResponse.httpStatus).toBe(HttpStatus.CONFLICT)
	})
})
