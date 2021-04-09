import { Module } from '@nestjs/common'
import { getConfigModule, getTypeOrmModule } from './modules'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ravenInterceptor } from './utils/interceptors/raven'

import { ReportsModule } from './api/reports/reports.module'
import { QuestionsModule } from './api/questions/questions.module'

@Module({
	imports: [
		getConfigModule(),
		getTypeOrmModule(),
		ReportsModule,
		QuestionsModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useValue: ravenInterceptor,
		},
	],
})
export class AppModule {}
