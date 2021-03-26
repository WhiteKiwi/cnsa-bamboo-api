import { PrimaryGeneratedColumn } from 'typeorm'
import { CreatedAt } from '.'

export class PrimaryIdWithCreatedAt extends CreatedAt {
	@PrimaryGeneratedColumn('increment', { unsigned: true })
	id: number
}
