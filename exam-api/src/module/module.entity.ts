import { ApiProperty } from '@nestjs/swagger';

export class module_dto {
  @ApiProperty()
  module: string;

  @ApiProperty()
  status: boolean;
}
