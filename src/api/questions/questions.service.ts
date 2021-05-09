import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'
import { Question } from '../../typeorm/entities'

@Injectable()
export class QuestionsService {
	constructor(
		@InjectRepository(Question)
		private readonly questionRepository: Repository<Question>,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
	) {}

	async find(): Promise<Question[]> {
		const cachedQuestions = await this.cacheManager.get<Question[]>(
			'questions',
		)
		let questions: Question[] = null
		if (cachedQuestions) {
			questions = cachedQuestions
		} else {
			questions = await this.questionRepository.find()
			this.cacheManager.set('questions', questions)
		}

		return questions
	}

	async getRandomOne(): Promise<Question> {
		const questions = await this.find()
		const randomIndex = Math.floor(Math.random() * questions.length)

		return await this.questionRepository.findOne({
			id: questions[randomIndex].id,
		})
	}

	async create({ content }) {
		await this.questionRepository.insert({ content })

		// Delete cache
		this.cacheManager.del('questions')
	}
}
