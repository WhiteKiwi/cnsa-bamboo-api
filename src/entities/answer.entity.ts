import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Question } from './question.entity'

@Entity({ name: 'answers' })
export class Answer {
	@ManyToOne(() => Question, (question) => question.answers, {
		onDelete: 'CASCADE',
		primary: true,
	})
	@JoinColumn({ name: 'question_id' })
	question: Question

	@Column('varchar', { length: 100, primary: true })
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
