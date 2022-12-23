import { ApiProperty } from '@nestjs/swagger';
class organization_dto {
  id: Int32Array;

  @ApiProperty({})
  email: string;

  @ApiProperty({})
  name: string;

  @ApiProperty({})
  quota: string;

  @ApiProperty({})
  status: boolean;

  @ApiProperty({})
  mobile: string;

  @ApiProperty({})
  address: string;

  @ApiProperty({})
  city: string;

  @ApiProperty({})
  state: string;

  @ApiProperty({})
  pincode: string;

  @ApiProperty({})
  createdAt: Date;

  @ApiProperty({})
  updatedAt: Date;

  @ApiProperty({})
  password: string;
}

export { organization_dto };
