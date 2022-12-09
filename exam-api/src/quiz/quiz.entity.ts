class QuizDTO {
  id: Int32Array;
  quiz_name: string;
  quiz_image: string;
  description: string;
  start_date: string;
  start_time: string;
  level_id: string;
  module_id: string[];
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
}

export { QuizDTO };
