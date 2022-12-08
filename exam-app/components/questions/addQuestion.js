import React, { useState } from "react";
import ComponentTitle from "./ComponentTitle";
import QuestionTable from "./QuestionTable";
import { RiDeleteBinLine } from "react-icons/ri";
import { SERVER_LINK } from "../../helpers/config";
import { useForm } from "react-hook-form";

import axios from "axios";

const addQuestion = ({ question_data }) => {
  //  console.log("The level_data "+ level_data);
  const [selectedImage, setSelectedImage] = useState(null);
  const [question, setQuestion] = useState('');
  const [optionType, setOptionType] = useState("");
  const [levelData, setLevelData] = useState();
  const [moduleData, setModuleData] = useState();
  const [inputFields, setInputFields] = useState([
    { option: "" },
    { option: "" },
    { option: "" },
    { option: "" },
  ]);
  const { register,  handleSubmit ,reset} = useForm();

  // console.log(question_data);

  const handleLevelClick = async () => {
    let levels = await axios.get(`${SERVER_LINK}/level/find`);
    setLevelData(levels.data);
  };
  const handleModuleClick = async () => {
    let modules = await axios.get(`${SERVER_LINK}/module/find`);
    setModuleData(modules.data);
  };

  const handleSelect = (event) => {
    // console.log('selectd');
    let optionType = event.target.value;
    // console.log(event.target.value);
    setOptionType(optionType);
  };
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index].option = event.target.value;
    setInputFields(data);
  };

  const addFields = () => {
    let newfield = { option: "" };
    setInputFields([...inputFields, newfield]);
  };
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const checkWithDatabase = (e) => {
    console.log("The submit button");
    e = JSON.stringify(e)
    console.log(e);
    reset()
  };
  return (
    <main>
      {/* question side */}
      <form
        className="flex  sm:p-10 "
        onSubmit={handleSubmit((data) => checkWithDatabase(data))}
      >
        <div className="flex-auto mx-7">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div className="mr-6 my-4">
              <h1 className="text-4xl font-semibold mb-2">Add Question</h1>
              <h2 className="text-gray-600 ml-0.5">Easy to understand</h2>
            </div>
          </div>

          <section className="flex md:grid-cols-1 xl:grid-cols-1 gap-6">
            {/* <form className = "flex-auto  items-center p-8 bg-white shadow rounded-lg"> */}
            <div className="flex-auto  items-center p-8 bg-white shadow rounded-lg">
              <div className="mr-6">
                {/* <h1 className="text-4xl font-semibold mb-2">Add Question</h1> */}
                {/* <h2 className="text-gray-600 ml-0.5">Question </h2> */}

                <div className="flex justify-center mt-8">
                  <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
                    <div className="m-4">
                      {selectedImage ? (
                        <>
                          {" "}
                          <label className="inline-block mb-2 text-gray-500">
                            Your Image
                          </label>
                          <div>
                            <img
                              alt="not fount"
                              width={"250px"}
                              src={URL.createObjectURL(selectedImage)}
                            />
                            <br />
                            <button
                              onClick={() => setSelectedImage(null)}
                              className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl"
                            >
                              Remove
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          {" "}
                          <label className="inline-block mb-2 text-gray-500">
                            Upload Question image
                          </label>
                          <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                              <div className="flex flex-col items-center justify-center pt-7">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  />
                                </svg>

                                <br />

                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                  Attach a file
                                </p>
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                className="opacity-0"
                                onChange={(event) => {
                                  setSelectedImage(event.target.files[0]);
                                }}
                              />
                            </label>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              {/* for question type section  */}
              <div className="mb-6">
                {/* <label for="default-input" className="block mb-2 text-sm font-medium">Default input</label> */}
                <input
                  type="text"
                  id="default-input"                 
                  {...register(`questions.0.question`)} 
                  placeholder="Type your question"
                  className="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {/* for options section  */}

              <div className="mb-6">
                {inputFields.map((input, index) => {
                  return (
                    <div className="flex items-center" key={index}>
                      {/* <p>{String.fromCharCode(65+index)} */}
                      <input
                        type="text"
                        id="default-input"
                        className="bg-gray-50 border my-3 text-left border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        name="option"
                        {...register(`options.${index}.option`)} 
                        // value={input.option}
                        // onChange={(event) => handleFormChange(index, event)}
                        placeholder={`Option ${String.fromCharCode(
                          65 + index
                        )}`}
                      />
                      <input
                        type={optionType == "Multiple" ? "checkbox" : "radio"}
                        className="mx-5"
                        id={index}
                        name="fav_language"
                        value="HTML"
                      />
                      <button onClick={() => removeFields(index)}>
                        <RiDeleteBinLine />
                      </button>

                      <br />
                      {/* <input name="age" placeholder="Age" /> */}
                    </div>
                  );
                })}
                <button type = "button" onClick={addFields} className="text-blue-400">
                  Add More...
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  // onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
            {/* </form> */}
          </section>
        </div>

        {/* corner side  */}
        <div className="flex-wrap items-center px-8 bg-dark ">
          <label
            htmlFor="default"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Question Type
          </label>
          <select
            id="default"
            className="bg-gray-50 border  w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Select" hidden>
              Select
            </option>
            <option value="US">MCQ</option>
            <option value="CA">TRUE/FALSE</option>
            <option value="FR">ONE-WORD</option>
            <option value="DE">Don't Know</option>
          </select>

          <label
            htmlFor="default"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Time Limit
          </label>
          <select
            id="default"
            className="bg-gray-50 border  w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Select" hidden>
              Select
            </option>
            <option value="US">10 Seconds</option>
            <option value="CA">20 Seconds</option>
            <option value="FR">30 Seconds</option>
            <option value="DE">40 Seconds</option>
          </select>
          <label
            htmlFor="default"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Option Type
          </label>
          <select
            id="default"
            onChange={handleSelect}
            className="bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Select" hidden>
              Select
            </option>
            <option value="Single">Single</option>
            <option value="Multiple">Multiple</option>
          </select>
          <label
            htmlFor="default"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Question Level
          </label>
          <select
            id="default"
            onClick={handleLevelClick}
            className="bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Select" hidden>
              Select
            </option>
            {levelData &&
              levelData.map((response) => (
                <option value={response.level}>{response.level}</option>
              ))}
          </select>
          <label
            htmlFor="default"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Question Module
          </label>
          <select
            id="default"
            onClick={handleModuleClick}
            className="bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Select" hidden>
              Select
            </option>
            {moduleData &&
              moduleData.map((response) => (
                <option value={response.module}>{response.module}</option>
              ))}
          </select>
        </div>
      </form>
    </main>
  );
};

export default addQuestion;
