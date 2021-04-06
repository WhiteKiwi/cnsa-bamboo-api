import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class UpperCasePipe implements PipeTransform<string> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	transform(value: string, metadata?: ArgumentMetadata): string {
		return (value || '').toUpperCase()
	}
}
