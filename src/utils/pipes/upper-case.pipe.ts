import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class UpperCasePipe implements PipeTransform<string> {
	transform(value: string, metadata?: ArgumentMetadata): string {
		return (value || '').toUpperCase()
	}
}
