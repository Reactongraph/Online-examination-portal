import { ApiProperty } from '@nestjs/swagger'

export class participants_dto {
	@ApiProperty()
	name: string

	@ApiProperty()
	email: string

	@ApiProperty()
	password: string

	@ApiProperty()
	mobile: string

	@ApiProperty()
	id: string
}
