import { Module } from '@nestjs/common'
import { getConfigModule, getTypeOrmModule } from './modules'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ReportsModule } from './reports/reports.module'
import { QuestionsModule } from './questions/questions.module'

@Module({
	imports: [
		getConfigModule(),
		getTypeOrmModule(),
		ReportsModule,
		QuestionsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
