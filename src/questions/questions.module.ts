import { Module } from '@nestjs/common'
import { QuestionsController } from './questions.controller'
import { QuestionsService } from './questions.service'

import { TypeOrmModule } from '@nestjs/typeorm'
import { Question } from '../typeorm/entities'

@Module({
	imports: [TypeOrmModule.forFeature([Question])],
	controllers: [QuestionsController],
	providers: [QuestionsService],
})
export class QuestionsModule {}
