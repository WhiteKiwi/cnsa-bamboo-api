import { UpperCasePipe } from './upper-case.pipe'

describe('UpperCasePipe', () => {
	let upperCasePipe: UpperCasePipe

	beforeEach(() => {
		upperCasePipe = new UpperCasePipe()
	})

	it('should return upper-cased string', () => {
		const str = 'abc1234ABCD'
		const upperCasedStr = upperCasePipe.transform(str)

		expect(upperCasedStr).toBe(str.toUpperCase())
	})

	it('should return empty string', () => {
		const emptyStr = ''
		const upperCasedStr = upperCasePipe.transform(emptyStr)

		expect(upperCasedStr).toBe(emptyStr)
	})
})
