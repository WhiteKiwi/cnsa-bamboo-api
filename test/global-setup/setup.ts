import path from 'path'
import {
	buildDockerImage,
	isDockerContainerRunning,
	isImageExist,
	runDockerContainer,
	sleep,
	teardownDockerContainer,
} from '../utils'

import { createConnection } from 'typeorm'
import { DEFAULT_TYPEORM } from '../../src/config/default'

const IMAGE_NAME = `bamboo-test-db`
const CONTAINER_NAME = 'bamboo-test-db'

export default async () => {
	console.log('Start to set mocking data. Set up the db')

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
			'-d --rm -p 3306:3306',
		)

		// DB 실행 확인
		console.log('Waiting DB starts...')
		await sleep(20000)
	} else {
		console.log('Initialize DB...')

		// DB 초기화
		const connection = await createConnection({
			type: 'mysql',
			host: DEFAULT_TYPEORM.HOST,
			port: DEFAULT_TYPEORM.PORT,
			database: DEFAULT_TYPEORM.DATABASE,
			username: DEFAULT_TYPEORM.USERNAME,
			password: DEFAULT_TYPEORM.PASSWORD,
			entities: [path.join(__dirname, '../../server/src/entities/*.js')],
		})

		await connection.query('SET FOREIGN_KEY_CHECKS = 0')

		for (const entity of connection.entityMetadatas) {
			const repository = await connection.getRepository(entity.name)
			await repository.query(`TRUNCATE TABLE \`${entity.tableName}\``)
		}

		await connection.query('SET FOREIGN_KEY_CHECKS = 1')
		connection.close()
	}

	// Insert mock data
	// TODO: Mock data 생성

	console.log('Setup complete!')
}
