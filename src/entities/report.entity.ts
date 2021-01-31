import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'
import { REPORT_STATUS } from '../utils/constants'

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
	@Index()
	status: string

	@Column('varchar', { name: 'reporter_ip', length: 30 })
	reporterIp: string

	@Column('timestamp', {
		name: 'reported_at',
		default: () => 'CURRENT_TIMESTAMP',
	})
	@Index()
	reportedAt: Date

	@Column('timestamp', {
		name: 'updated_at',
		default: () => 'CURRENT_TIMESTAMP',
	})
	@Index()
	updatedAt: Date
}
