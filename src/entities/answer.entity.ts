import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm'
import { Question } from './question.entity'

@Entity({ name: 'answers' })
export class Answer {
	@PrimaryGeneratedColumn('increment')
	id: number

	@ManyToOne(() => Question, (question) => question.answers, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'question_id' })
	question: Question

	@Column('varchar', { length: 100 })
	answer: string

	@Column('timestamp', {
		name: 'created_at',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date

	@Column('timestamp', {
		name: 'updated_at',
		default: () => 'CURRENT_TIMESTAMP',
	})
	updatedAt: Date
}
