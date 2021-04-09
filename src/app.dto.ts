import { ApiProperty } from '@nestjs/swagger'

export class GetVersionResponseDto {
	@ApiProperty({ example: '1.0.0' })
	version: string
}
