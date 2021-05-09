import { Entity, Column } from 'typeorm'
import { PrimaryIdWithDateColumns } from '../entity-bases'

@Entity({ name: 'questions' })
export class Question extends PrimaryIdWithDateColumns {
	@Column('varchar', { length: 500, unique: true })
	content: string

	@Column('json', { nullable: false, default: [] })
	answers: string[]
}
