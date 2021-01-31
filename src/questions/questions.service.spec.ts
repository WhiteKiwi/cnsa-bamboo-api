import { Test, TestingModule } from '@nestjs/testing'
import { QuestionsService } from './questions.service'
import { getConfigModule, getTypeOrmModule } from '../modules'

import { TypeOrmModule } from '@nestjs/typeorm'
import { Question } from '../entities'
import { getRepository } from 'typeorm'

describe('QuestionsService', () => {
	let service: QuestionsService

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
	})

	it('Should be create question', async () => {
		const question = '감자의 별명은?'
		await service.create({ content: question })

		const questionRepository = getRepository(Question)
		const data = await questionRepository.find({ content: question })

		expect(data).not.toBeNull()
	})
})
