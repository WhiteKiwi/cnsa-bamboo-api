import { TimestampTransformer } from '.'

describe('TimestampTransformer', () => {
	it('should transform number from number', () => {
		const timestamp = 1612833477000
		expect(TimestampTransformer.from(timestamp)).toBe(timestamp)
	})

	it('should transform null from null', () => {
		expect(TimestampTransformer.from(null)).toBeNull()
	})

	it('should transform number from Date', () => {
		const date = new Date()
		expect(TimestampTransformer.from(date)).toBe(Math.floor(date.getTime()))
	})

	it('should transform number to Date', () => {
		const timestamp = 1612801398000
		const isoString = '2021-02-08T16:23:18.000Z'
		expect(new Date(timestamp).toISOString()).toBe(isoString)
		expect(TimestampTransformer.to(timestamp)).toBeInstanceOf(Date)
		expect(TimestampTransformer.to(timestamp).toISOString()).toBe(isoString)
	})

	it('should transform string to Date', () => {
		const isoString = '2021-02-08T16:23:18.000Z'
		const timestamp = new Date(isoString).getTime()
		expect(TimestampTransformer.to(isoString).getTime()).toBe(timestamp)
		expect(TimestampTransformer.to(isoString).toISOString()).toBe(isoString)
	})

	it('should transform undefined to undefined', () => {
		expect(TimestampTransformer.to(undefined)).toBeUndefined()
	})
})
