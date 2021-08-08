import { Module } from '@nestjs/common'

import { QuestionsModule } from './questions/questions.module'
import { ReportsModule } from './reports/reports.module'

@Module({
	imports: [QuestionsModule, ReportsModule],
})
export class ApplicationModule {}
