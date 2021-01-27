import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { PORT } from './config/constants'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const configService: ConfigService = app.get(ConfigService)
	const port = configService.get<number>(PORT)

	await app.listen(port, () =>
		console.log(`API_BACKEND listening on port ${port}`),
	)
}
bootstrap()
