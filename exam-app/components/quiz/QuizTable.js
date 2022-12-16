import Table from "./Table";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_LINK } from "../../helpers/config";
import { useRouter } from "next/router";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useForm } from "react-hook-form";
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import moment from "moment";

// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
  injectStyle();
}

const QuizTable = ({ quiz_data , module_data,level_data}) => {
  const router = useRouter();
  const [editForm, setEditForm] = useState(false);
  const [modal, setModal] = useState(false);
  const [quizId, setQuizId] = useState("");
  // const [orgData, setOrgData] = useState();
  const [buttonText, setButtonText] = useState("Add");
  const [name, setName] = useState("");
  const [levelData, setLevelData] = useState(level_data);
  const [moduleData, setModuleData] = useState(module_data);
  const [selectedLevelId, setSelectedLevelId] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBufferDate, setSelectedBufferDate] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [optionModuleSelected, setOptionModuleSelected] = useState();
  const [selectedModules, setSelectedModules] = useState();

  const { register, handleSubmit } = useForm();

  const handleRemoveClick = (quiz_id) => {
    axios
      .delete(`${SERVER_LINK}/quiz/${quiz_id}`)
      .then((result) => {
        router.replace(router.asPath);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLevelTypeSelect = (event) => {
    let levelId = event.target.value;
    setSelectedLevelId(levelId);
  };

  const handleModuleTypeSelect = (event) => {
    let moduleSelectedArray = [];
    setOptionModuleSelected(event)
    event.map((oneModule) => {
      moduleSelectedArray.push(`${oneModule.id}`);
    });
    setSelectedModules(moduleSelectedArray);
  };

  const handleBoxClick = async (quiz_id, quiz_status) => {
    let new_status = {
      status: !quiz_status,
    };
    new_status = JSON.stringify(new_status);

    await axios
      .patch(`${SERVER_LINK}/quiz/${quiz_id}`, new_status, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        // setModal(!modal);
        router.replace(router.asPath);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditClick = async (quiz_id) => {
    // setOpen(true);
    setButtonText("Update");
    setEditForm(true);
    setQuizId(quiz_id);
    setModal(true);
    let seletedModuleDataArray = [];

    // first find the user with the id
    await axios
      .get(`${SERVER_LINK}/quiz/find/${quiz_id}`)
      .then((response) => {
        let singleQuizData = response.data[0];
        setName(singleQuizData.quiz_name);
        setSelectedLevelId(singleQuizData.level_id);
        setDescription(singleQuizData.description);
        let bufferDate = moment(singleQuizData.buffer_time).toDate();
        let startDate = moment(singleQuizData.start_date).toDate();
        let endDate = moment(singleQuizData.end_date).toDate();

        moduleData.map((oneModule, index) => {
          singleQuizData.module_id.map((oneID) => {
            if (oneID == oneModule.id) {
              seletedModuleDataArray.push(oneModule);
            }
          });
        });
        setOptionModuleSelected(seletedModuleDataArray);
        setSelectedBufferDate(bufferDate);
        setSelectedEndDate(endDate);
        setSelectedStartDate(startDate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Option = (props) => {
    // props.isSelected = true
    let setChecked = props;
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };
  const checkWithDatabase = async (data) => {
    data.quiz_name = name;
    data.start_date = selectedStartDate;
    data.end_date = selectedEndDate;
    data.buffer_time = selectedBufferDate;
    data.level_id = selectedLevelId;
    data.description = description;
    data.module_id = selectedModules;

    let QuizData = JSON.stringify(data);
    await axios
      .patch(`${SERVER_LINK}/quiz/${quizId}`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
      .then((response) => {
        setModal(!modal);
        router.replace(router.asPath);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function createData(
    quiz,
    quiz_id,
    quiz_status,
    modules,
    level,
    end_date,
    start_date
  ) {
    const action = (
      <>
        <button
          onClick={() => handleEditClick(quiz_id)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded-full"
        >
          Edit
        </button>
        &nbsp;
        <button
          onClick={() => handleRemoveClick(quiz_id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Delete
        </button>
      </>
    );
    const status = (
      <>
        <div className="flex">
          <input
            onClick={() => handleBoxClick(quiz_id, quiz_status)}
            className="form-check-input appearance-none w-9  rounded-full float-left h-5 align-top bg-gray-300 bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            defaultChecked={quiz_status}
          />
        </div>
      </>
    );
    return { quiz, status, action, modules, level, end_date, start_date };
  }

  const rowsDataArray = quiz_data.map((element) => {
    let quiz = element.quiz_name;
    let quiz_id = element._id.$oid;
    let quiz_status = element.status;
    let moduleNameArray = [];
    let moduleArray = element.module;
    moduleArray.map((oneModule) => {
      moduleNameArray.push(oneModule.module);
    });

    let modules = moduleNameArray.join();
    let { level } = element.level;
    let start_date = element.start_date.$date;
    start_date = moment(start_date).format("llll");

    let end_date = element.end_date.$date;
    end_date = moment(end_date).format("llll");

    return createData(
      quiz,
      quiz_id,
      quiz_status,
      modules,
      level,
      end_date,
      start_date
    );
  });

  const columns = [
    {
      Header: "Quiz",
      accessor: "quiz",
      title: "quiz",
      dataIndex: "quiz",
      key: "quiz",
      width: 400,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      Header: "Level",
      accessor: "level",
      title: "level",
      dataIndex: "level",
      key: "level",
      width: 400,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      //   rowClassName: "bg-black-ripon",
    },
    {
      Header: "Modules",
      accessor: "modules",
      title: "modules",
      dataIndex: "modules",
      key: "modules",
      width: 400,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      //   rowClassName: "bg-black-ripon",
    },

    {
      Header: "Start Date ",
      accessor: "start_date",
      title: "start_date",
      dataIndex: "start_date",
      key: "start_date",
      width: 400,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      //   rowClassName: "bg-black-ripon",
    },
    {
      Header: "End Date",
      accessor: "end_date",
      title: "end_date",
      dataIndex: "end_date",
      key: "end_date",
      width: 400,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      //   rowClassName: "bg-black-ripon",
    },

    {
      Header: "Status",
      accessor: "status",
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 400,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
    },
    {
      Header: "Action",
      accessor: "action",
      title: "Action",
      dataIndex: "action",
      key: "operations",
      width: 250,
      className: "text-white bg-gray-600 p-2 border-b-2",
    },
  ];

  // data by using which table data is creating using api call
  const data = rowsDataArray;

  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <Table
        columns={columns}
        data={data}
        rowKey="id"
        className="bg-white table-auto p-1 w-full text-center rc-table-custom font-semibold hover:table-fixed"
      />

      <PureModal
        isOpen={modal}
        width="800px"
        onClose={() => {
          setName("");
          setSelectedBufferDate("");
          setSelectedEndDate("");
          setSelectedStartDate("");
          // setModuleArray([]);
          setDescription("");
          setSelectedLevelId("");
          setModal(false);
          return true;
        }}
      >
        <div classNameName="flex-row space-y-3 relative">
          <div className="bg-blue-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
            <p>{buttonText} Quiz</p>
          </div>

          <div className="py-6 px-6 lg:px-8">
            <form
              className="w-full max-w-lg"
              onSubmit={handleSubmit((data) => checkWithDatabase(data))}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Quiz Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required="required"
                    placeholder="Jane"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Choose Quiz image
                  </label>

                  <div class="flex items-center justify-center">
                    <div
                      className="datepicker bg-gray-200relative form-floating mb-3 xl:w-96"
                      data-mdb-toggle-button="false"
                    >
                      <input
                        className="block w-full text-sm appearance-none  bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        aria-describedby="file_input_help"
                        // required="required"
                        accept="image/*"
                        id="file_input"
                        type="file"
                      />
                      <p
                        class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                      >
                        SVG, PNG, JPG *.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Start Time
                  </label>

                  <div class="flex items-center justify-center">
                    <div
                      className="datepicker bg-gray-200relative form-floating mb-3 xl:w-96"
                      data-mdb-toggle-button="false"
                    >
                      <DatePicker
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        selected={selectedStartDate}
                        onChange={(date) => setSelectedStartDate(date)}
                        placeholderText={"MMMM d, yyyy h:mm aa "}
                        showTimeSelect
                        popperClassName="react-datepicker-right"
                        showYearDropdown // year show and scrolldown alos
                        scrollableYearDropdown
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    End Time
                  </label>

                  <div class="flex items-center justify-center">
                    <div
                      className="datepicker bg-gray-200relative form-floating mb-3 xl:w-96"
                      data-mdb-toggle-button="false"
                    >
                      <DatePicker
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        selected={selectedEndDate}
                        onChange={(date) => setSelectedEndDate(date)}
                        placeholderText={"MMMM d, yyyy h:mm aa "}
                        showTimeSelect
                         popperClassName="react-datepicker-right"
                        showYearDropdown // year show and scrolldown alos
                        scrollableYearDropdown
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-96 my-3 md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Buffer Time (Access Time for Quiz)
                  </label>

                  <div class="items-center  justify-center">
                    <div
                      className="datepicker bg-gray-200relative form-floating mb-3 xl:w-96"
                      data-mdb-toggle-button="false"
                    >
                      <DatePicker
                        className="appearance-none  block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        selected={selectedBufferDate}
                        onChange={(date) => setSelectedBufferDate(date)}
                        placeholderText={"MMMM d, yyyy h:mm aa "}
                        showTimeSelect
                        popperClassName="react-datepicker-right"
                        showYearDropdown // year show and scrolldown alos
                        scrollableYearDropdown
                        dateFormat="MMMM d, yyyy h:mm aa"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Question Level
                  </label>
                  <select
                    id="default"
                    value={selectedLevelId}
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
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Choose Modules for Quiz
                  </label>
                  <ReactSelect
                    options={moduleData}
                    className="bg-gray-50 w-50 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    isMulti
                    closeMenuOnSelect={false}
                    // hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                    onChange={handleModuleTypeSelect}
                    allowSelectAll={true}
                    value={optionModuleSelected}
                  />
                 </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Description
                  </label>
                  <textarea
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="description"
                    type="text"
                    placeholder="A short description about quiz"
                    required="required"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <p className="text-gray-600 text-xs italic">
                    Describe in Brief*
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </PureModal>
      <ToastContainer />
    </>
  );
};

export default QuizTable;
