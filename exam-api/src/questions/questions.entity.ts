import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

class QuestionDTO {
  id: Int32Array;

  @ApiProperty()
  @IsNotEmpty()
  question: string;

  @ApiProperty()
  question_type: string;

  @ApiProperty()
  question_time: string;

  @ApiProperty()
  options: object;
  @ApiProperty()
  images: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  status: string;
  @ApiProperty()
  level_id: string;
  @ApiProperty()
  module_id: string;
  @ApiProperty()
  marks: string;
  @ApiProperty()
  option_type: string;
}

export { QuestionDTO };
