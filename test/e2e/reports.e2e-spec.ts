import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import supertest from 'supertest'

import { AppController } from '../../src/app.controller'
import { AppService } from '../../src/app.service'
import { ReportsController } from '../../src/modules/application/reports/reports.controller'
import { ReportsModule } from '../../src/modules/application/reports/reports.module'
import { ReportStatus } from '../../src/utils/types'
import { defaultModulesForTest } from '../lib'
import { globalAppSetup } from '../lib/global-app-setup'

describe('ReportController (e2e)', () => {
	let app: INestApplication
	let request: supertest.SuperTest<supertest.Test>
	let controller: ReportsController

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [...defaultModulesForTest, ReportsModule],
			controllers: [AppController],
			providers: [AppService],
		}).compile()

		app = moduleFixture.createNestApplication()
		globalAppSetup(app)
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
			status: ReportStatus.REPORTED,
		})
		for (const report of reportedReports) {
			expect(report.status).toBe(ReportStatus.REPORTED)
		}

		const { body: appliedReports } = await request.get('/reports').query({
			status: ReportStatus.APPLIED,
		})
		for (const report of appliedReports) {
			expect(report.status).toBe(ReportStatus.APPLIED)
		}

		const { body: deniedReports } = await request.get('/reports').query({
			status: ReportStatus.DENIED,
		})
		for (const report of deniedReports) {
			expect(report.status).toBe(ReportStatus.DENIED)
		}
	})
})
