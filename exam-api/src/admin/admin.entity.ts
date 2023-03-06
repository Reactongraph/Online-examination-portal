import { ApiProperty } from '@nestjs/swagger'

export class admin_dto {
	@ApiProperty()
	name: string

	@ApiProperty()
	email: string

	@ApiProperty()
	password: string
}
