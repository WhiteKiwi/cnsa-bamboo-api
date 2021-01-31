import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Answer } from './answer.entity'

@Entity({ name: 'questions' })
export class Question {
	@PrimaryGeneratedColumn('increment')
	id: number

	@Column('varchar', { length: 500 })
	content: string

	@OneToMany(() => Answer, (answer) => answer.question)
	answers: Answer[]

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
