import { Test, TestingModule } from '@nestjs/testing'
import { ReportsService } from './reports.service'
import { getConfigModule, getTypeOrmModule } from '../../modules'

import { TypeOrmModule } from '@nestjs/typeorm'
import { getRepository, Repository } from 'typeorm'
import { Report } from '../../typeorm/entities'
import { ReportStatus } from '../../utils/types'

describe('ReportsService', () => {
	let service: ReportsService
	let questionRepository: Repository<Report>

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				getConfigModule({ test: true }),
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
			status: ReportStatus.REPORTED,
		})
		for (const report of reportedReports) {
			expect(report.status).toBe(ReportStatus.REPORTED)
		}

		const appliedReports = await service.find({
			status: ReportStatus.APPLIED,
		})
		for (const report of appliedReports) {
			expect(report.status).toBe(ReportStatus.APPLIED)
		}

		const deniedReports = await service.find({
			status: ReportStatus.DENIED,
		})
		for (const report of deniedReports) {
			expect(report.status).toBe(ReportStatus.DENIED)
		}
	})
})
