import { Controller, Get, Query } from '@nestjs/common'

import { ReportsService } from './reports.service'
import { Report } from '../entities'

import { REPORT_STATUS } from '../utils/constants'

@Controller('reports')
export class ReportsController {
	constructor(private readonly reportsService: ReportsService) {}

	@Get()
	async getReports(
		@Query('status') status?: REPORT_STATUS,
	): Promise<Report[]> {
		return await this.reportsService.findReports({ status })
	}
}
