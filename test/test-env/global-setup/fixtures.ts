import { getConnection } from 'typeorm'

import { questions } from '../fixtures'
// fixtures['EntitiyName'] = Entity[] 여야 함
const fixtures = {
	Question: questions,
}

export async function setupFixtures() {
	console.log('Start to set mocking data. Set up the db')

	const connection = await getConnection()

	// Turn off foreign key checks
	for (const entity of connection.entityMetadatas) {
		const repository = await connection.getRepository(entity.name)
		await repository.query(
			`ALTER TABLE ${entity.tableName} DISABLE TRIGGER ALL`,
		)
	}

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

	// Turn on foreign key checks
	for (const entity of connection.entityMetadatas) {
		const repository = await connection.getRepository(entity.name)
		await repository.query(
			`ALTER TABLE ${entity.tableName} ENABLE TRIGGER ALL`,
		)
	}
}
