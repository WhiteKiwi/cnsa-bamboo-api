import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { PrimaryIdWithDateColumns } from '../entity-bases'
import { Question } from '.'

@Entity({ name: 'answers' })
export class Answer extends PrimaryIdWithDateColumns {
	@ManyToOne(() => Question, (question) => question.answers, {
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
		nullable: false,
	})
	@JoinColumn({ name: 'question_id' })
	question: Question
	@Column('int', { unsigned: true, name: 'question_id' })
	questionId: number

	@Column('varchar', { length: 100, unique: true })
	answer: string
}
