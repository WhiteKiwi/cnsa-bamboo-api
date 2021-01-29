import { Test, TestingModule } from '@nestjs/testing'
import { getConfigModule, getTypeOrmModule } from '../modules'

import { TypeOrmModule } from '@nestjs/typeorm'
import { ReportsController } from './reports.controller'
import { ReportsService } from './reports.service'
import { Report } from '../entities'

describe('ReportsController', () => {
	let controller: ReportsController

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
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
