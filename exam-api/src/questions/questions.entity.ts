class QuestionDTO {
  id: Int32Array;
  question: string;
  question_type: string;
  question_time: string;
  options: object;
  images: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  level_id: string;
  module_id: string;
  marks: string;
  option_type: string;
}

export { QuestionDTO };