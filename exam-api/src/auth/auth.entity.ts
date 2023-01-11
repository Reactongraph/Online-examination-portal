import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class auth_dto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
    email: string

  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 24)
    password: string

  @ApiProperty()
    decodeid: string

  @ApiProperty()
    token: string

  @ApiProperty()
    role: string
}
