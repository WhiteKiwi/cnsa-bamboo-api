import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { VERSION } from './config'

@Injectable()
export class AppService {
	constructor(private readonly configService: ConfigService) {}

	getVersion(): string {
		return this.configService.get(VERSION)
	}
}
