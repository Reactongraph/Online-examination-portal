import { ApiProperty } from '@nestjs/swagger';

class QuizDTO {
  id: Int32Array;
  @ApiProperty()
  quiz_name: string;
  @ApiProperty()
  quiz_image: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  start_date: string;
  @ApiProperty()
  start_time: string;
  @ApiProperty()
  level_id: string;
  @ApiProperty()
  module_id: string[];
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  status: boolean;
}

export { QuizDTO };
