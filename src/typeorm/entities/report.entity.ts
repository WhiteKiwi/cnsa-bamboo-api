import { Entity, Column, Index } from 'typeorm'
import { REPORT_STATUS } from '../../utils/types'
import { PrimaryIdWithDateColumns } from '../entity-bases'

@Entity({ name: 'reports' })
export class Report extends PrimaryIdWithDateColumns {
	@Column('longtext')
	content: string

	@Column('enum', {
		enum: REPORT_STATUS,
		default: REPORT_STATUS.REPORTED,
	})
	@Index('status_index')
	status: string

	@Column('varchar', { length: 10 })
	code: string

	@Column('varchar', { name: 'reporter_ip', length: 30 })
	reporterIp: string
}
