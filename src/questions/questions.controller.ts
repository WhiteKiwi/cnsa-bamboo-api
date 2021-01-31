import { Body, Controller, Get, Post } from '@nestjs/common'

import { QuestionsService } from './questions.service'
import { Question } from '../entities'

@Controller('questions')
export class QuestionsController {
	constructor(private readonly reportsService: QuestionsService) {}

	@Get()
	async getAll(): Promise<Question[]> {
		return await this.reportsService.find()
	}

	@Get('random')
	async getRandomOne() {
		return await this.reportsService.getRandomOne()
	}

	@Post()
	async create(@Body('question') question: string) {
		await this.reportsService.create({ content: question })
	}
}
