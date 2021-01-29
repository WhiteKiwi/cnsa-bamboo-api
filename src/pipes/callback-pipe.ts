import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class CallbackPipe implements PipeTransform<string> {
	private callback: (value: any, metadata?: ArgumentMetadata) => any

	constructor(callback: (value: any, metadata?: ArgumentMetadata) => any) {
		this.callback = callback
	}

	transform(value: string, metadata: ArgumentMetadata): string {
		return this.callback(value, metadata)
	}
}
