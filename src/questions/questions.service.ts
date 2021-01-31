import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'
import { Question } from '../entities'

@Injectable()
export class QuestionsService {
	constructor(
		@InjectRepository(Question)
		private readonly questionRepository: Repository<Question>,
	) {}

	async find() {
		return await this.questionRepository.find()
	}

	async getRandomOne() {
		const data = await this.questionRepository
			.createQueryBuilder()
			.select('question.id')
			.from(Question, 'question')
			.getMany()
		const randomIndex = Math.floor(Math.random() * data.length)

		return await this.questionRepository.findOne({
			id: data[randomIndex].id,
		})
	}

	async create({ content }) {
		await this.questionRepository.insert({ content })
	}
}
