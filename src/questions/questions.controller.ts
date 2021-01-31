import { Body, Controller, Get, Post } from '@nestjs/common'

import { QuestionsService } from './questions.service'

@Controller('questions')
export class QuestionsController {
	constructor(private readonly reportsService: QuestionsService) {}

	@Get()
	async getAll() {
		return await this.reportsService.find()
	}

	@Post()
	async create(@Body('question') question: string) {
		await this.reportsService.create({ content: question })
	}
}
