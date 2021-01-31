import { Test, TestingModule } from '@nestjs/testing'
import { QuestionsService } from './questions.service'
import { getConfigModule, getTypeOrmModule } from '../modules'

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

	it('Should be create question', async () => {
		const question = '감자의 별명은?'
		await service.create({ content: question })

		const data = await questionRepository.findOne({ content: question })

		expect(data).not.toBeNull()
		expect(data.content).toBe(question)
	})
})
