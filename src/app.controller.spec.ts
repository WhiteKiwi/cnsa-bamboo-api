import { Test, TestingModule } from '@nestjs/testing'

import { defaultModulesForTest } from '../test/lib'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
	let controller: AppController
	let service: AppService

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [...defaultModulesForTest],
			controllers: [AppController],
			providers: [AppService],
		}).compile()

		controller = app.get<AppController>(AppController)
		service = app.get<AppService>(AppService)
	})

	describe('root', () => {
		it('should return version of package', () => {
			expect(controller.getVersion().version).toBe(service.getVersion())
		})
	})
})
