import React, { useEffect, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useForm } from "react-hook-form";
import { SERVER_LINK } from "../../helpers/config";
import axios from "axios";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import { default as ReactSelect } from "react-select";
import Select from "react-select";
import { components } from "react-select";
// import { Multiselect } from "multiselect-react-dropdown";
import "react-datepicker/dist/react-datepicker.css";

const QuizModal = ({ modal, setModal, editForm, participantId }) => {
  //For Image Preview
  const [selectedImage, setSelectedImage] = useState();
  const router = useRouter();

  // const [email, setEmail] = useState("");/

  // const [mobile, setMobile] = useState("");
  // const [organizationId, setOrganizationId] = useState("");
  const [buttonText, setButtonText] = useState("Add");
  const [name, setName] = useState("");
  const [levelData, setLevelData] = useState("");
  const [moduleData, setModuleData] = useState("");
  const [description, setDescription] = useState("");

  const { register, handleSubmit } = useForm();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndtDate] = useState(null);
  const [selectedBufferDate, setSelectedBufferDate] = useState(null);
  const [moduleArray, setModuleArray] = useState([]);
  const [selectedLevelId, setSelectedLevelId] = useState("");
  const [selectedModules, setSelectedModules] = useState([]);

  useEffect(() => {
    async function fetchApiData() {
      let levels = await axios.get(`${SERVER_LINK}/level/find`);
      let modules = await axios.get(`${SERVER_LINK}/module/find`);

      let moduleArray = modules.data.map((object) => {
        object.value = object.module;
        object.label = object.module;
        // object.isSelected = true;
        return object;
      });
      setModuleData(moduleArray);
      setLevelData(levels.data);
    }

    fetchApiData();
  }, [router.query?.question_id]);
  // for sending the data to the backend

  // console.log(moduleData);
  // console.log("this is modulearra");
  // console.log(moduleData);

  const handleLevelTypeSelect = (event) => {
    let levelId = event.target.value;
    setSelectedLevelId(levelId);
  };

  const handleModuleTypeSelect = (event) => {
    console.log("This is click");
    console.log(event);
    let moduleSelectedArray = [];
    event.map((oneModule) => {
      moduleSelectedArray.push(`${oneModule.id}`);
    });

    setSelectedModules(moduleSelectedArray);

    // console.log(module_id);
  };

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            // value={props.id}
            // onClick={(e) => {
            //   handleModuleTypeSelect(e);
            // }}
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };
  const checkWithDatabase = async (data) => {
    data.status = true;
    data.quiz_name = name;

    // let setDateFormat = `${selectedDate.getDate()}/${
    //   selectedDate.getMonth() + 1
    // }/${selectedDate.getUTCFullYear()}`;
    // let setTimeFormat = `${selectedTime.getHours()}:${selectedTime.getMinutes()}`;
    data.start_date = selectedStartDate;
    data.end_date = selectedEndDate;
    data.buffer_time = selectedBufferDate;
    data.level_id = selectedLevelId;
    data.description = description;
    data.module_id = selectedModules;
    // data.module_id =

    // console.log(data);

    let QuizData = JSON.stringify(data);
    // console.log("This is data ");
    // console.log(data);

    //for new data registration
    await axios({
      url: `${SERVER_LINK}/quiz/create`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: QuizData,
    })
      .then((response) => {
        router.replace(router.asPath);
        setName("");
        // setSelectedDate("");
        // setSelectedTime("");
        // setModuleArray([]);
        // setDescription("");
        // setSelectedLevelId("");
        setModal(!modal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <PureModal
        isOpen={modal}
        width="800px"
        onClose={() => {
          setName("");
          setSelectedBufferDate("");
          setSelectedEndtDate("");
          setSelectedStartDate("")
          setModuleArray([]);
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
                        required="required"
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
                        filterDate={(date) =>
                          date.getDay() !== 6 && date.getDay() !== 0
                        } // weekends cancel
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
                        onChange={(date) => setSelectedEndtDate(date)}
                        placeholderText={"MMMM d, yyyy h:mm aa "}
                        showTimeSelect
                        filterDate={(date) =>
                          date.getDay() !== 6 && date.getDay() !== 0
                        } // weekends cancel
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
                        filterDate={(date) =>
                          date.getDay() !== 6 && date.getDay() !== 0
                        } // weekends cancel
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
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                    onChange={handleModuleTypeSelect}
                    allowSelectAll={true}
                    // value={optionSelected}
                  />
                  {/* <Multiselect
                  //  isMulti={true}/
                    options={['name','checkj','data']}
                    displayValue="key"
                    // showCheckbox={true}
                  /> */}
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
    </>
  );
};

export default QuizModal;
