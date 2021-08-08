import { Test, TestingModule } from '@nestjs/testing'
import { defaultModulesForTest } from '../../../test/lib'

import { TypeOrmModule } from '@nestjs/typeorm'
import { ReportsController } from './reports.controller'
import { ReportsService } from './reports.service'
import { Report } from '../../typeorm/entities'
import { ReportStatus } from '../../utils/types'

describe('ReportsController', () => {
	let controller: ReportsController
	let service: ReportsService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				...defaultModulesForTest,
				TypeOrmModule.forFeature([Report]),
			],
			controllers: [ReportsController],
			providers: [ReportsService],
		}).compile()

		controller = module.get<ReportsController>(ReportsController)
		service = module.get<ReportsService>(ReportsService)
	})

	it('Should be get all reports', async () => {
		const reports = await controller.find()
		const reportsInDb = await service.find()

		expect(reports).toEqual(reportsInDb)
	})

	it('Reports should be filterd by status', async () => {
		const reportedReports = await controller.find(ReportStatus.REPORTED)
		for (const report of reportedReports) {
			expect(report.status).toBe(ReportStatus.REPORTED)
		}

		const appliedReports = await controller.find(ReportStatus.APPLIED)
		for (const report of appliedReports) {
			expect(report.status).toBe(ReportStatus.APPLIED)
		}

		const deniedReports = await controller.find(ReportStatus.DENIED)
		for (const report of deniedReports) {
			expect(report.status).toBe(ReportStatus.DENIED)
		}
	})
})
