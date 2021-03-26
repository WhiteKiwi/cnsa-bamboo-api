import { Test, TestingModule } from '@nestjs/testing'
import { getConfigModule, getTypeOrmModule } from '../modules'

import { TypeOrmModule } from '@nestjs/typeorm'
import { ReportsController } from './reports.controller'
import { ReportsService } from './reports.service'
import { Report } from '../typeorm/entities'
import { REPORT_STATUS } from '../utils/types'

describe('ReportsController', () => {
	let controller: ReportsController
	let service: ReportsService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				getConfigModule({ isTest: true }),
				getTypeOrmModule(),
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
		const reportedReports = await controller.find(REPORT_STATUS.REPORTED)
		for (const report of reportedReports) {
			expect(report.status).toBe(REPORT_STATUS.REPORTED)
		}

		const appliedReports = await controller.find(REPORT_STATUS.APPLIED)
		for (const report of appliedReports) {
			expect(report.status).toBe(REPORT_STATUS.APPLIED)
		}

		const deniedReports = await controller.find(REPORT_STATUS.DENIED)
		for (const report of deniedReports) {
			expect(report.status).toBe(REPORT_STATUS.DENIED)
		}
	})
})
