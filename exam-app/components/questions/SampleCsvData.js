const sampleData = [
  {
    question: "What is 2+2?",
    question_type: "MCQ",
    option_type: "Single",
    option0: "sum is 2",
    correct0: false,
    option1: "sum is 4",
    correct1: true,
    option2: "sum is 5",
    correct2: false,
    question_time: "10 seconds",
    status: true,
    level_name: "easy",
    module_name: "c++",
    marks: "1",
  },
];

const headers = [
  {
    label: "Question",
    key: "question",
  },
  {
    label: "Question type",
    key: "question_type",
  },
  {
    label: "Option type",
    key: "option_type",
  },
  {
    label: "Option A",
    key: "option0",
  },
  {
    label: "Correct A",
    key: "correct0",
  },
  {
    label: "Option B",
    key: "option1",
  },
  {
    label: "Correct B",
    key: "correct1",
  },
  {
    label: "Option etc...",
    key: "option2",
  },
  {
    label: "Correct etc...",
    key: "option2",
  },
  {
    label: "Question time",
    key: "question_time",
  },
  {
    label: "Question Status",
    key: "status",
  },
  {
    label: "Level",
    key: "level_name",
  },
  {
    label: "Module",
    key: "module_name",
  },
  {
    label: "Marks",
    key: "marks",
  },
];

export const csvlink = {
  filename: "sampleQuestions.csv",
  headers: headers,
  data: sampleData,
};
