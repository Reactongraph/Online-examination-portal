import React, { useState } from "react";
import { useRouter } from "next/router";
import { CSVLink } from "react-csv";
import { csvlink } from "./SampleCsvData";

const PageComponentTitle = ({
  title,
  titleDescription,
  buttonTitle,
  editForm,
}) => {
  const [modal, setModal] = useState(false);
  const [csvData, setCsvData] = useState();
  const [csvArray, setCsvArray] = useState([]);
  const router = useRouter();

  const checkModal = (title) => {};
  const handleAddClick = () => {
    router.push("/dashboard/questions/addQuestion");
  };

  const handleCsv = (e) => {
    // console.log('this is the cssv');
    let csvFile = e.target.files[0];
    const reader = new FileReader();

    const processCSV = (str, delim = ",") => {
      const headers = str.slice(0, str.indexOf("\n")).split(delim);
      const rows = str.slice(str.indexOf("\n") + 1).split("\n");

      const newArray = rows.map((row) => {
        const values = row.split(delim);
        const eachObject = headers.reduce((obj, header, i) => {
          obj[header] = values[i];
          return obj;
        }, {});
        return eachObject;
      });
      setCsvArray(newArray);
      console.log("this is the array for the backend");

      const newCSVDataArray = newArray.map((oneObject) => {
        let options = [];
        let count = 0;
        Object.entries(oneObject).forEach((entry) => {
          const [key, value] = entry;
          if (key.includes("option") && !key.includes("option_type")) {
            let obj = {
              option: value,
              correct: oneObject[`correct${count + 1}`],
            };
            options.push(obj);
            count++;
            //   console.log(options)
          }
        });
        oneObject["options"] = options;
        oneObject['status'] = true;
        return oneObject;
      });

      console.log(newCSVDataArray);
    };

    reader.onload = function (data) {
      const text = data.target.result;
      console.log(text);
      processCSV(text);
    };
    reader.readAsText(csvFile);
    setCsvData(csvFile);
  };

  return (
    <>
      <div className="mr-6">
        <h1 className="text-4xl font-semibold mb-2">{title}</h1>
        <h2 className="text-gray-600 ml-0.5">{titleDescription}</h2>
      </div>

      <div className="flex  flex-wrap items-start justify-end -mb-3">
        <CSVLink {...csvlink}>
          <button
            type="button"
            class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Download sample (.csv)
          </button>
        </CSVLink>
        <input
          type="file"
          accept=".csv"
          title="helo"
          placeholder="Add Questions (.csv) "
          onChange={(e) => {
            handleCsv(e);
          }}
          // value = "Add CSV"
          // style="display:none"
          class="inline-block px-6 py-2 mx-2 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
        />
        {/* <div class="relative">
            <input type="file" id="csvfile" class="block w-full p-4 pl-10 text-sm  border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
        <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-400 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload CSV</button>
    </div> */}

        {/* </input> */}
        <button
          className="inline-flex px-5 py-3 text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 rounded-md ml-6 mb-3"
          onClick={handleAddClick}
        >
          <svg
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          {buttonTitle}
        </button>
      </div>
    </>
  );
};

export default PageComponentTitle;

// const data = [
//   {
//       "question": "What is 2+2?",
//       "question_type": "MCQ",
//       "option_type": "Single",
//       "option1": "sum is 2",
//       "correct1": "FALSE",
//       "option2": "sum is 4",
//       "correct2": "TRUE",
//       "option3": "sum is 5",
//       "correct3": "sum is 5",
//       "question_time": "10 seconds",
//       "question_status": "TRUE",
//       "level": "easy",
//       "module": "c++",
//       "marks": "1"
//   },
//   {
//       "question": "what is 3?",
//       "question_type": "MCQ",
//       "option_type": "Multiple",
//       "option1": "sum is 3",
//       "correct1": "TRUE",
//       "option2": "sum is 5",
//       "correct2": "FALSE",
//       "option3": "sum is 6",
//       "correct3": "sum is 4",
//       "question_time": "20 seconds",
//       "question_status": "FALSE",
//       "level": "hard",
//       "module": "java",
//       "marks\r": "2\r"
//   }
// ]

// console.log(data[0])
// const newData = data.map((oneObject)=>{
//      let options = []
//      let count = 0;
//  Object.entries(oneObject).forEach((entry)=>{
//      const [key , value ] = entry;
//      if(key.includes('option')&&!key.includes('option_type')){
//       let obj= {
//           option : value,
//           correct: oneObject[`correct${count+1}`]
//       }
//            options.push(obj)
//            count++;
//     console.log(options)
//     return options
//      }

//  })
// })
// console.log(newData)
