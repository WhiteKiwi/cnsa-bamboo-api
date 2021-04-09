import {
	Body,
	CacheInterceptor,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Res,
	UseInterceptors,
} from '@nestjs/common'

import { QuestionsService } from './questions.service'
import { Question } from '../../typeorm/entities'

import { ApiTags } from '@nestjs/swagger'

@ApiTags('Question')
@Controller('questions')
export class QuestionsController {
	constructor(private readonly questionsService: QuestionsService) {}

	@Get()
	@UseInterceptors(CacheInterceptor)
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
			if (e.code === 'ER_DUP_ENTRY') {
				res.status(HttpStatus.CONFLICT)
				// istanbul ignore next line
			} else {
				throw e
			}
		}
		res.send()
	}
}
