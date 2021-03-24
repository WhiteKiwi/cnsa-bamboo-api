import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'
import { REPORT_STATUS } from '../../utils'

@Entity({ name: 'reports' })
export class Report {
	@PrimaryGeneratedColumn('uuid')
	id: string

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

	@Column('timestamp', {
		name: 'reported_at',
		default: () => 'CURRENT_TIMESTAMP',
	})
	@Index('reported_at_index')
	reportedAt: Date

	@Column('timestamp', {
		name: 'updated_at',
		default: () => 'CURRENT_TIMESTAMP',
	})
	@Index('updated_at_index')
	updatedAt: Date
}
