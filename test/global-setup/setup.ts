import path from 'path'
import {
	buildDockerImage,
	isDockerContainerRunning,
	isImageExist,
	runDockerContainer,
	sleep,
	teardownDockerContainer,
} from '../utils'

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
		// TODO: 모든 테이블 초기화
	}

	// Insert mock data
	// TODO: Mock data 생성

	console.log('Setup complete!')
}
