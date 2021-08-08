import { setupFixtures } from './fixtures'
import { setupPostgres } from './postgres'

export default async () => {
	await setupPostgres()
	await setupFixtures()

	console.log('Setup complete!')
}
