import { Controller, Get, Query } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

import { Report } from '../../typeorm/entities'
import { UpperCasePipe } from '../../utils/pipes'
import { ReportStatus } from '../../utils/types'
import { ReportsService } from './reports.service'

@ApiTags('Report')
@Controller('reports')
export class ReportsController {
	constructor(private readonly reportsService: ReportsService) {}

	@ApiOperation({
		summary: '제보들을 조회합니다',
	})
	@ApiQuery({ name: 'status', enum: ReportStatus, required: false })
	// TODO: @ApiResponse
	@Get()
	async find(
		@Query('status', UpperCasePipe)
		status?: ReportStatus,
	): Promise<Report[]> {
		return await this.reportsService.find({ status })
	}
}
