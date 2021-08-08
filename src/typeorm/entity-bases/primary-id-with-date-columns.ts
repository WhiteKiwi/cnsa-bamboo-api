import { PrimaryGeneratedColumn } from 'typeorm'

import { DateColumns } from '.'

export class PrimaryIdWithDateColumns extends DateColumns {
	@PrimaryGeneratedColumn('increment', { unsigned: true })
	id: number
}
