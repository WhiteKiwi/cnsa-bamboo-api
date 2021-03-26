import { getConnection } from 'typeorm'

import { questions } from '../fixtures'
// fixtures['EntitiyName'] = Entity[] 여야 함
const fixtures = {
	Question: questions,
}

export async function setupFixtures() {
	console.log('Start to set mocking data. Set up the db')

	const connection = await getConnection()

	await connection.query('SET FOREIGN_KEY_CHECKS = 0')

	for (const entityName of Object.keys(fixtures)) {
		const repository = await connection.getRepository(entityName)
		for (const fixture of fixtures[entityName]) {
			try {
				await repository.save(fixture)
			} catch (e) {
				console.log(
					`Bad Entity(${entityName}): ${JSON.stringify(fixture)}`,
				)
				throw e
			}
		}
	}

	await connection.query('SET FOREIGN_KEY_CHECKS = 1')
}
