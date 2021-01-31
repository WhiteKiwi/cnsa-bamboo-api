import { Controller, Param, Post } from '@nestjs/common'

import { QuestionsService } from './questions.service'

@Controller('questions')
export class QuestionsController {
	constructor(private readonly reportsService: QuestionsService) {}

	@Post()
	async create(@Param('question') question: string) {
		await this.reportsService.create({ content: question })
	}
}
