import { Entity, Column, Index } from 'typeorm'
import { ReportStatus } from '../../utils/types'
import { PrimaryIdWithDateColumns } from '../entity-bases'

@Entity({ name: 'reports' })
export class Report extends PrimaryIdWithDateColumns {
	@Column('text')
	content: string

	@Column('enum', {
		enum: ReportStatus,
		default: ReportStatus.REPORTED,
	})
	@Index('status_index')
	status: string

	@Column('varchar', { length: 10 })
	code: string

	@Column('varchar', { name: 'reporter_ip', length: 30 })
	reporterIp: string
}
