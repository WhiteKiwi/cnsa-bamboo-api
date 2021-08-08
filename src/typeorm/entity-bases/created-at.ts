import { CreateDateColumn } from 'typeorm'

import { TimestampTransformer } from '../transformers'

export class CreatedAt {
	@CreateDateColumn({
		type: 'timestamp',
		precision: 3,
		name: 'created_at',
		default: () => 'CURRENT_TIMESTAMP(3)',
		transformer: TimestampTransformer,
		select: false,
	})
	createdAt: number
}
