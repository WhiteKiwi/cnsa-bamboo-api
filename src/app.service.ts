import { Injectable } from '@nestjs/common'
import packageInfo from '../package.json'

@Injectable()
export class AppService {
	getVersion(): string {
		return packageInfo.version
	}
}
