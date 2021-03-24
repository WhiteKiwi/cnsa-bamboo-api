module.exports = {
	globalSetup: '<rootDir>/../test/global-setup/setup.ts',
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: 'src',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	collectCoverageFrom: [
		'**/*.(t|j)s',
		'!**/*.(module|dto|mock).ts',
		'!**/index.ts',
	],
	coveragePathIgnorePatterns: [
		'<rootDir>/typeorm',
		'<rootDir>/utils/interceptors',
		'<rootDir>/modules',
		'<rootDir>/main.ts',
	],
	coverageDirectory: '../coverage',
	testEnvironment: 'node',
	testTimeout: 60000,
}
