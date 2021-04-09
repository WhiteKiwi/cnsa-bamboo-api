import { Controller, Get, Query } from '@nestjs/common'

import { ReportsService } from './reports.service'
import { Report } from '../../typeorm/entities'

import { REPORT_STATUS } from '../../utils/types'
import { UpperCasePipe } from '../../utils/pipes'

import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger'

@ApiTags('Report')
@Controller('reports')
export class ReportsController {
	constructor(private readonly reportsService: ReportsService) {}

	@ApiOperation({
		summary: '제보들을 조회합니다',
	})
	@ApiQuery({ name: 'status', enum: REPORT_STATUS, required: false })
	// TODO: @ApiResponse
	@Get()
	async find(
		@Query('status', UpperCasePipe)
		status?: REPORT_STATUS,
	): Promise<Report[]> {
		return await this.reportsService.find({ status })
	}
}
