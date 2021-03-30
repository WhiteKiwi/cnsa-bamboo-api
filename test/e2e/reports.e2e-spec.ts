import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import supertest from 'supertest'

import { getConfigModule, getTypeOrmModule } from '../../src/modules'

import { AppService } from '../../src/app.service'
import { AppController } from '../../src/app.controller'

import { ReportsModule } from '../../src/reports/reports.module'
import { ReportsController } from '../../src/reports/reports.controller'
import { REPORT_STATUS } from '../../src/utils/types'

describe('ReportController (e2e)', () => {
	let app: INestApplication
	let request: supertest.SuperTest<supertest.Test>
	let controller: ReportsController

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				getConfigModule({ test: true }),
				getTypeOrmModule(),
				ReportsModule,
			],
			controllers: [AppController],
			providers: [AppService],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
		request = supertest(app.getHttpServer())

		controller = moduleFixture.get<ReportsController>(ReportsController)
	})

	it('Should be get all reports', async () => {
		const { body } = await request.get('/reports')
		const reports = await controller.find()

		expect(body).toEqual(reports)
	})

	it('Reports should be filterd by status', async () => {
		const { body: reportedReports } = await request.get('/reports').query({
			status: REPORT_STATUS.REPORTED,
		})
		for (const report of reportedReports) {
			expect(report.status).toBe(REPORT_STATUS.REPORTED)
		}

		const { body: appliedReports } = await request.get('/reports').query({
			status: REPORT_STATUS.APPLIED,
		})
		for (const report of appliedReports) {
			expect(report.status).toBe(REPORT_STATUS.APPLIED)
		}

		const { body: deniedReports } = await request.get('/reports').query({
			status: REPORT_STATUS.DENIED,
		})
		for (const report of deniedReports) {
			expect(report.status).toBe(REPORT_STATUS.DENIED)
		}
	})
})
