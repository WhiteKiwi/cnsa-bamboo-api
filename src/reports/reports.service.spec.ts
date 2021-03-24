import { Test, TestingModule } from '@nestjs/testing'
import { ReportsService } from './reports.service'
import { getConfigModule, getTypeOrmModule } from '../modules'

import { TypeOrmModule } from '@nestjs/typeorm'
import { getRepository, Repository } from 'typeorm'
import { Report } from '../typeorm/entities'
import { REPORT_STATUS } from '../utils'

describe('ReportsService', () => {
	let service: ReportsService
	let questionRepository: Repository<Report>

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				getConfigModule({ isTest: true }),
				getTypeOrmModule(),
				TypeOrmModule.forFeature([Report]),
			],
			providers: [ReportsService],
		}).compile()

		service = module.get<ReportsService>(ReportsService)
		questionRepository = getRepository(Report)
	})

	it('Should be get all reports', async () => {
		const reports = await service.find()
		const reportsInDb = await questionRepository.find()

		expect(reports).toEqual(reportsInDb)
	})

	it('Reports should be filterd by status', async () => {
		const reportedReports = await service.find({
			status: REPORT_STATUS.REPORTED,
		})
		for (const report of reportedReports) {
			expect(report.status).toBe(REPORT_STATUS.REPORTED)
		}

		const appliedReports = await service.find({
			status: REPORT_STATUS.APPLIED,
		})
		for (const report of appliedReports) {
			expect(report.status).toBe(REPORT_STATUS.APPLIED)
		}

		const deniedReports = await service.find({
			status: REPORT_STATUS.DENIED,
		})
		for (const report of deniedReports) {
			expect(report.status).toBe(REPORT_STATUS.DENIED)
		}
	})
})
