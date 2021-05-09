import { setupPostgres } from './postgres'
import { setupFixtures } from './fixtures'

export default async () => {
	await setupPostgres()
	await setupFixtures()

	console.log('Setup complete!')
}
