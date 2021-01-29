import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { getConfigModule, getTypeOrmModule } from './modules'
import { ReportsModule } from './reports/reports.module'

describe('AppController', () => {
	let appController: AppController
	let appService: AppService

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [
				getConfigModule({ isTest: true }),
				getTypeOrmModule(),
				ReportsModule,
			],
			controllers: [AppController],
			providers: [AppService],
		}).compile()

		appController = app.get<AppController>(AppController)
		appService = new AppService()
	})

	describe('root', () => {
		it('should return version of package', () => {
			expect(appController.getVersion().version).toBe(
				appService.getVersion(),
			)
		})
	})
})
