import { setupMysql } from './mysql'
import { setupFixtures } from './fixtures'

export default async () => {
	await setupMysql()
	await setupFixtures()

	console.log('Setup complete!')
}
