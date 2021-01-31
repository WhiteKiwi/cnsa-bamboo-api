import { Test, TestingModule } from '@nestjs/testing'
import { QuestionsService } from './questions.service'
import { getConfigModule, getTypeOrmModule } from '../modules'
import { sleep } from '../utils'

import { TypeOrmModule } from '@nestjs/typeorm'
import { getRepository, Repository } from 'typeorm'
import { Question } from '../entities'

describe('QuestionsService', () => {
	let service: QuestionsService
	let questionRepository: Repository<Question>

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				getConfigModule({ isTest: true }),
				getTypeOrmModule(),
				TypeOrmModule.forFeature([Question]),
			],
			providers: [QuestionsService],
		}).compile()

		service = module.get<QuestionsService>(QuestionsService)
		questionRepository = getRepository(Question)
	})

	it('Should be get all questions', async () => {
		const questions = await service.find()
		const questionsInDb = await questionRepository.find()

		expect(questions).toEqual(questionsInDb)
	})

	it('Should be return one question randomly', async () => {
		const question = await service.getRandomOne()

		let diffenceCheck = false
		for (let i = 0; i < 100; i++) {
			const randomQuestion = await service.getRandomOne()
			if (question.id !== randomQuestion.id) {
				diffenceCheck = true
				break
			}

			await sleep(500)
		}

		expect(diffenceCheck).toBe(true)
	})

	it('Should be create question', async () => {
		const question = '감자의 별명은?'
		await service.create({ content: question })

		const data = await questionRepository.findOne({ content: question })

		expect(data).not.toBeNull()
		expect(data.content).toBe(question)
	})

	it('Should be throw error: ER_DUP_ENTRY', async () => {
		const question = 'GDFSGRHBTRB'
		await service.create({ content: question })
		try {
			await service.create({ content: question })
		} catch (e) {
			expect(e.code).toBe('ER_DUP_ENTRY')
		}
	})
})
