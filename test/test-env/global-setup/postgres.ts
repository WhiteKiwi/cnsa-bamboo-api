import path from 'path'
import {
	buildDockerImage,
	isDockerContainerRunning,
	isImageExist,
	runDockerContainer,
	sleep,
	teardownDockerContainer,
} from '../utils'

import DEFAULT from '../../../src/config/default'
import { Connection, createConnection } from 'typeorm'

const IMAGE_NAME = `bamboo-test-db`
const CONTAINER_NAME = 'bamboo-test-db'

export async function setupPostgres() {
	let connection: Connection
	console.log('Start to set up the db')

	if (!(await isImageExist(IMAGE_NAME))) {
		const isTeardowned = await teardownDockerContainer(CONTAINER_NAME)
		if (isTeardowned) console.log('Tear down the exist container')

		console.log('Docker image is not the latest version')
		console.log('Start to build new image...')
		await buildDockerImage(IMAGE_NAME, path.join(__dirname, '../docker/'))
	}

	if (!(await isDockerContainerRunning(IMAGE_NAME))) {
		console.log('There is no docker container')
		console.log('Run a new container...')
		await runDockerContainer(
			CONTAINER_NAME,
			IMAGE_NAME,
			'-d --rm -p 5432:5432',
		)

		// DB 실행 확인
		console.log('Waiting DB starts...')
		await sleep(20000)

		await createConnection({
			type: 'postgres',
			host: DEFAULT.TYPEORM.HOST,
			port: DEFAULT.TYPEORM.PORT,
			database: DEFAULT.TYPEORM.DATABASE,
			username: DEFAULT.TYPEORM.USERNAME,
			password: DEFAULT.TYPEORM.PASSWORD,
			entities: [
				path.join(
					__dirname,
					'../../../server/**/src/typeorm/entities/*.js',
				),
			],
			migrations: [
				path.join(
					__dirname,
					'../../../server/**/src/typeorm/migrations/*.js',
				),
			],
			migrationsTableName: 'migrations',
			migrationsRun: true,
		})
	} else {
		console.log('Initialize DB...')

		// DB 초기화
		connection = await createConnection({
			type: 'postgres',
			host: DEFAULT.TYPEORM.HOST,
			port: DEFAULT.TYPEORM.PORT,
			database: DEFAULT.TYPEORM.DATABASE,
			username: DEFAULT.TYPEORM.USERNAME,
			password: DEFAULT.TYPEORM.PASSWORD,
			entities: [
				path.join(
					__dirname,
					'../../../server/**/src/typeorm/entities/*.js',
				),
			],
			migrations: [
				path.join(
					__dirname,
					'../../../server/**/src/typeorm/migrations/*.js',
				),
			],
			migrationsTableName: 'migrations',
			migrationsRun: true,
		})

		for (const entity of connection.entityMetadatas) {
			const repository = await connection.getRepository(entity.name)
			await repository.query(`TRUNCATE TABLE ${entity.tableName} CASCADE`)
		}
	}
}
