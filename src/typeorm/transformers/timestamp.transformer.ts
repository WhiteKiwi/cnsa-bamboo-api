import { ValueTransformer } from 'typeorm'
import { isDate } from 'lodash'

export const TimestampTransformer: ValueTransformer = {
	from(value: any): number {
		if (typeof value === 'number') {
			return value
		}
		if (isDate(value)) {
			return value.getTime()
		}

		return value
	},
	to(value: any): Date {
		if (typeof value === 'number') {
			return new Date(value)
		}
		if (typeof value === 'string') {
			return new Date(value)
		}

		return value
	},
}
