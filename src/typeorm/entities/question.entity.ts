import { Entity, Column, OneToMany } from 'typeorm'
import { PrimaryIdWithDateColumns } from '../entity-bases'
import { Answer } from '.'

@Entity({ name: 'questions' })
export class Question extends PrimaryIdWithDateColumns {
	@Column('varchar', { length: 500, unique: true })
	content: string

	@OneToMany(() => Answer, (answer) => answer.question)
	answers: Answer[]
}
