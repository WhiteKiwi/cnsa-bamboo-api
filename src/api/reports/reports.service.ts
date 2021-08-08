import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { isEmpty } from 'lodash'
import { Repository } from 'typeorm'

import { Report } from '../../typeorm/entities'

@Injectable()
export class ReportsService {
	constructor(
		@InjectRepository(Report)
		private readonly reportRepository: Repository<Report>,
	) {}

	async find({ status }: { status?: string } = {}): Promise<Report[]> {
		if (!isEmpty(status)) {
			return await this.reportRepository.find({ status })
		}
		return await this.reportRepository.find()
	}
}
