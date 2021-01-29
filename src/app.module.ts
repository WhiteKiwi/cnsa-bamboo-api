import { Module } from '@nestjs/common'
import { getConfigModule, getTypeOrmModule } from './modules'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { ReportsModule } from './reports/reports.module'

@Module({
	imports: [getConfigModule(), getTypeOrmModule(), ReportsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
