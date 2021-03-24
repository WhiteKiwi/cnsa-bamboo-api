import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	Index,
} from 'typeorm'
import { Answer } from './answer.entity'

@Entity({ name: 'questions' })
export class Question {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column('varchar', { length: 500, unique: true })
	@Index('content_index')
	content: string

	@OneToMany(() => Answer, (answer) => answer.question)
	answers: Answer[]

	@Column('timestamp', {
		name: 'created_at',
		default: () => 'CURRENT_TIMESTAMP',
	})
	@Index('created_at_index')
	createdAt: Date

	@Column('timestamp', {
		name: 'updated_at',
		default: () => 'CURRENT_TIMESTAMP',
	})
	@Index('updated_at_index')
	updatedAt: Date
}
