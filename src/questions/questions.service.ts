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

	async create({ content }) {
		await this.questionRepository.insert({ content })
	}
}
