import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { REPORT_STATUS } from '../utils/constants'

@Entity()
export class Report {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column('longtext', { nullable: false })
	content: string

	@Column('enum', {
		nullable: false,
		enum: REPORT_STATUS,
		default: REPORT_STATUS.REPORTED,
	})
	status: string

	@Column('varchar', { nullable: false, length: 30 })
	reporterIp: string

	@Column('timestamp', {
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
	})
	reportedAt: Date

	@Column('timestamp')
	updatedAt: Date
}
