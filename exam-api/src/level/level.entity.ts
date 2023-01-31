import { ApiProperty } from '@nestjs/swagger'

export class level_dto {
	@ApiProperty()
	level: string

	@ApiProperty()
	status: boolean
}
