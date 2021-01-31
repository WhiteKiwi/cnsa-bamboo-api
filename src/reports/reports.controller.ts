import { Controller, Get, Query } from '@nestjs/common'

import { ReportsService } from './reports.service'
import { Report } from '../entities'

import { REPORT_STATUS } from '../utils'
import { upperCasePipe } from '../pipes'

@Controller('reports')
export class ReportsController {
	constructor(private readonly reportsService: ReportsService) {}

	@Get()
	async find(
		@Query('status', upperCasePipe)
		status?: REPORT_STATUS,
	): Promise<Report[]> {
		return await this.reportsService.find({ status })
	}
}
