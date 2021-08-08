import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Res,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { Question } from '../../../typeorm/entities'
import { QuestionsService } from './questions.service'

@ApiTags('Question')
@Controller('questions')
export class QuestionsController {
	constructor(private readonly questionsService: QuestionsService) {}

	@Get()
	async getAll(): Promise<Question[]> {
		return await this.questionsService.find()
	}

	@Get('random')
	async getRandomOne(): Promise<Question> {
		return await this.questionsService.getRandomOne()
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body('question') question: string, @Res() res) {
		try {
			await this.questionsService.create({ content: question })
		} catch (e) {
			// istanbul ignore next line
			if (e?.code === '23505') {
				res.status(HttpStatus.CONFLICT)
				// istanbul ignore next line
			} else {
				throw e
			}
		}
		res.send()
	}
}
