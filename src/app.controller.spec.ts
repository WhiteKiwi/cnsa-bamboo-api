import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { getConfigModule } from './modules'

describe('AppController', () => {
	let appController: AppController
	let appService: AppService

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [getConfigModule({ isTest: true })],
			controllers: [AppController],
			providers: [AppService],
		}).compile()

		appController = app.get<AppController>(AppController)
		appService = new AppService()
	})

	describe('root', () => {
		it('should return "Hello World!"', () => {
			expect(appController.getVersion().version).toBe(
				appService.getVersion(),
			)
		})
	})
})
