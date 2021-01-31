import { Test, TestingModule } from '@nestjs/testing'
import { QuestionsController } from './questions.controller'
import { QuestionsService } from './questions.service'
import { getConfigModule, getTypeOrmModule } from '../modules'

import { TypeOrmModule } from '@nestjs/typeorm'
import { getRepository, Repository } from 'typeorm'
import { Question } from '../entities'

describe('QuestionsController', () => {
	let controller: QuestionsController
	let service: QuestionsService
	let questionRepository: Repository<Question>

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				getConfigModule({ isTest: true }),
				getTypeOrmModule(),
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
		}

		expect(diffenceCheck).toBe(true)
	})

	it('Should be create question', async () => {
		const question = '감자의 키는?'
		await controller.create(question)

		const data = await questionRepository.find({ content: question })

		expect(data).not.toBeNull()
	})
})
