import { UpdateDateColumn } from 'typeorm'
import { TimestampTransformer } from '../transformers'
import { CreatedAt } from '.'

export class DateColumns extends CreatedAt {
	@UpdateDateColumn({
		type: 'timestamp',
		precision: 3,
		name: 'updated_at',
		default: () => 'CURRENT_TIMESTAMP(3)',
		onUpdate: 'CURRENT_TIMESTAMP(3)',
		transformer: TimestampTransformer,
		select: false,
	})
	updatedAt: number
}
