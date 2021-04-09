import { Controller, Get, Query } from '@nestjs/common'

import { ReportsService } from './reports.service'
import { Report } from '../../typeorm/entities'

import { REPORT_STATUS } from '../../utils/types'
import { UpperCasePipe } from '../../utils/pipes'

@Controller('reports')
export class ReportsController {
	constructor(private readonly reportsService: ReportsService) {}

	@Get()
	async find(
		@Query('status', UpperCasePipe)
		status?: REPORT_STATUS,
	): Promise<Report[]> {
		return await this.reportsService.find({ status })
	}
}
