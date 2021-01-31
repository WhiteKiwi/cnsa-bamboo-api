import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { isEmpty } from 'lodash'

import { Repository } from 'typeorm'
import { Report } from '../entities'

@Injectable()
export class ReportsService {
	constructor(
		@InjectRepository(Report)
		private readonly reportRepository: Repository<Report>,
	) {}

	async find({ status }): Promise<Report[]> {
		if (!isEmpty(status)) {
			return await this.reportRepository.find({ status })
		}
		return await this.reportRepository.find()
	}
}
