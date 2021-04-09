import { Module } from '@nestjs/common'
import { ReportsController } from './reports.controller'
import { ReportsService } from './reports.service'

import { TypeOrmModule } from '@nestjs/typeorm'
import { Report } from '../../typeorm/entities'
import { getCacheModule } from '../../modules'

@Module({
	imports: [getCacheModule(), TypeOrmModule.forFeature([Report])],
	controllers: [ReportsController],
	providers: [ReportsService],
})
export class ReportsModule {}
