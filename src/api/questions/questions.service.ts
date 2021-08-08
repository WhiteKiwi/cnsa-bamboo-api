import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Question } from '../../typeorm/entities'

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
		const questions = await this.find()
		const randomIndex = Math.floor(Math.random() * questions.length)

		return await this.questionRepository.findOne({
			id: questions[randomIndex].id,
		})
	}

	async create({ content }) {
		await this.questionRepository.insert({ content })
	}
}
