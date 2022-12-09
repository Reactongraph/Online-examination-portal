import React, { useState, useEffect } from "react";
import ComponentTitle from "./ComponentTitle";
import QuestionTable from "./QuestionTable";
import { RiDeleteBinLine } from "react-icons/ri";
import { SERVER_LINK } from "../../helpers/config";
import { useForm } from "react-hook-form";

import axios from "axios";

const addQuestion = ({ question_data }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [question, setQuestion] = useState("");
  const [optionType, setOptionType] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [selectedLevelId, setSelectedLevelId] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [timeLimitSelect, setTimeLimitSelect] = useState("");
  const [requiredOptionField, setRequiredOptionField] = useState(true);
  const [levelData, setLevelData] = useState();
  const [moduleData, setModuleData] = useState();
  const [numberOfOptionSelect, setNumberOfOptionSelect] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState();
  const [inputFields, setInputFields] = useState([
    { option: "", correct: "" },
    { option: "", correct: "" },
    { option: "", correct: "" },
    { option: "", correct: "" },
  ]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleLevelClick = async () => {
    let levels = await axios.get(`${SERVER_LINK}/level/find`);
    setLevelData(levels.data);
  };
  const handleModuleClick = async () => {
    let modules = await axios.get(`${SERVER_LINK}/module/find`);
    setModuleData(modules.data);
  };

  useEffect(() => {
    if (numberOfOptionSelect > 0) {
      setRequiredOptionField(false);
    } else {
      setRequiredOptionField(true);
    }
  }, [numberOfOptionSelect]);

  const handleSelectedOption = (index, event) => {
    setRequiredOptionField(false);

    if (!event.target.checked) {
      setNumberOfOptionSelect(numberOfOptionSelect - 1);
    }
    setSelectedOptionIndex(index);
    let data = [...inputFields];
    data[index].correct = event.target.checked;
    setInputFields(data);

    inputFields.map((oneObj) => {
      if (oneObj.correct == true)
        setNumberOfOptionSelect(numberOfOptionSelect + 1);
    });
  };

  const handleModuleTypeSelect = (event) => {
    let moduleId = event.target.value;
    setSelectedModuleId(moduleId);
  };

  const handleLevelTypeSelect = (event) => {
    let levelId = event.target.value;
    setSelectedLevelId(levelId);
    // setSelectedLevelId(moduleId);
  };

  const handleOptionTypeSelect = (event) => {
    let optionType = event.target.value;
    setOptionType(optionType);
  };

  const handleTimeLimitSelect = (event) => {
    let timeLimitValue = event.target.value;
    setTimeLimitSelect(timeLimitValue);
  };
  const handleQuestionTypeSelect = (event) => {
    let questionTypeValue = event.target.value;
    setQuestionType(questionTypeValue);
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

  const checkWithDatabase = async (data) => {
    data.question_type = questionType;
    data.question_time = timeLimitSelect;
    data.status = true;
    data.level_id = selectedLevelId;
    data.module_id = selectedModuleId;
    data.option_type = optionType;
    if (optionType != "Multiple") {
      data.options.map((oneOption, i) => {
        if (selectedOptionIndex == i) oneOption.correct = true;
        else oneOption.correct = false;
      });
    } else {
      data.options = inputFields;
      data.options.map((oneOption, i) => {
        if (!oneOption.correct) oneOption.correct = false;
      });
    }

    data = JSON.stringify(data);

    await axios({
      url: `${SERVER_LINK}/questions/create`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    })
      .then((response) => {
        // setModal(!modal);
        // router.replace(router.asPath);

        reset();
      })
      .catch((err) => {
        console.log(err);
      });
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
                  required
                  {...register(`question`)}
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
                        {...register(`options.${index}.option`, {
                          required: true,
                        })}
                        // value={input.option}
                        onChange={(event) => handleFormChange(index, event)}
                        placeholder={`Option ${String.fromCharCode(
                          65 + index
                        )}`}
                      />
                      {/* {errors.options.index && <p>{errors.options.message} thsi </p>} */}
                      <input
                        type={optionType == "Multiple" ? "checkbox" : "radio"}
                        className="mx-5"
                        required={requiredOptionField}
                        // validate = "required"//
                        // validate =  {  selectedOptionIndex  ? "required" : "" }
                        // required = {selectedOptionIndex ?"false":<>required</>}
                        {...register(`options.${index}.correct`)}
                        id={index}
                        name="fav_language"
                        // value = {input.option}
                        onChange={(event) => handleSelectedOption(index, event)}
                      />
                      <button onClick={() => removeFields(index)}>
                        <RiDeleteBinLine />
                      </button>

                      <br />
                      {/* <input name="age" placeholder="Age" /> */}
                    </div>
                  );
                })}
                <button
                  type="button"
                  onClick={addFields}
                  className="text-blue-400"
                >
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
            required
            onChange={(e) => {
              handleQuestionTypeSelect(e);
            }}
            className="bg-gray-50 border  w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" hidden>
              Select
            </option>
            <option value="MCQ">MCQ</option>
            <option value="TRUE/FALSE">TRUE/FALSE</option>
            <option value="ONE-WORD">ONE-WORD</option>
            <option value="DON'T KNOW">Don't Know</option>
          </select>

          <label
            htmlFor="default"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Time Limit
          </label>
          <select
            id="default"
            onChange={handleTimeLimitSelect}
            required
            className="bg-gray-50 border  w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" hidden>
              Select
            </option>
            <option value="10 Seconds">10 Seconds</option>
            <option value="20 Seconds">20 Seconds</option>
            <option value="30 Seconds">30 Seconds</option>
            <option value="40 Seconds">40 Seconds</option>
          </select>
          <label
            htmlFor="default"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Option Type
          </label>
          <select
            id="default"
            onChange={handleOptionTypeSelect}
            required
            className="bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" hidden>
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
            onChange={(e) => {
              handleLevelTypeSelect(e);
            }}
            required
            className="bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" hidden>
              Select
            </option>
            {levelData &&
              levelData.map((response) => (
                <option value={response.id}>{response.level}</option>
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
            onChange={(e) => {
              handleModuleTypeSelect(e);
            }}
            required
            className="bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" hidden>
              Select
            </option>
            {moduleData &&
              moduleData.map((response) => (
                <option value={response.id}>{response.module}</option>
              ))}
          </select>
          <label
            htmlFor="default"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Marks
          </label>
          <input
            type="number"
            min="1"
            {...register(`marks`)}
            required
            placeholder="eg. 1 , 2 etc ..."
            className="bg-gray-50 border w-40 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </form>
    </main>
  );
};

export default addQuestion;
