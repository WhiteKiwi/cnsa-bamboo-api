import { PrimaryGeneratedColumn } from 'typeorm'

export class PrimaryId {
	@PrimaryGeneratedColumn('increment', { unsigned: true })
	id: number
}
