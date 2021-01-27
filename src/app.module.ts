import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import GetConfigModule from './config'

@Module({
	imports: [GetConfigModule()],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
