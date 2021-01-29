import { Module } from '@nestjs/common'
import { getConfigModule, getTypeOrmModule } from './modules'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
	imports: [getConfigModule(), getTypeOrmModule()],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
