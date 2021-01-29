import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { isEmpty } from 'lodash'

@Injectable()
export class UpperCasePipe implements PipeTransform<string> {
	transform(value: string, metadata: ArgumentMetadata): string {
		if (isEmpty(value)) {
			return ''
		}
		return value.toUpperCase()
	}
}
