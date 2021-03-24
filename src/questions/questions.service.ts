import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'
import { Question } from '../typeorm/entities'

@Injectable()
export class QuestionsService {
	constructor(
		@InjectRepository(Question)
		private readonly questionRepository: Repository<Question>,
	) {}

	async find(): Promise<Question[]> {
		return await this.questionRepository.find()
	}

	async getRandomOne(): Promise<Question> {
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
