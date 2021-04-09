import { Controller, Get, HttpStatus } from '@nestjs/common'
import { AppService } from './app.service'
import { GetVersionResponseDto } from './app.dto'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiTags('Version')
	@ApiOperation({
		summary: 'Current version of API',
		description: 'Api version을 반환합니다<br>Health Check에 사용됩니다',
	})
	@ApiResponse({
		status: HttpStatus.OK,
		type: GetVersionResponseDto,
	})
	@Get()
	getVersion(): any {
		return { version: this.appService.getVersion() }
	}
}
