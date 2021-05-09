import { CACHE_MANAGER, Controller, Get, Inject, Query } from '@nestjs/common'
import { Cache } from 'cache-manager'

import { ReportsService } from './reports.service'
import { Report } from '../../typeorm/entities'

import { ReportStatus } from '../../utils/types'
import { UpperCasePipe } from '../../utils/pipes'

import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger'

@ApiTags('Report')
@Controller('reports')
export class ReportsController {
	constructor(
		private readonly reportsService: ReportsService,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
	) {}

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
		const cachedValue = await this.cacheManager.get<Report[]>(
			`reports.${status}`,
		)
		if (cachedValue) return cachedValue

		const reports = await this.reportsService.find({ status })
		await this.cacheManager.set<Report[]>(`reports.${status}`, reports)
		return reports
	}
}
