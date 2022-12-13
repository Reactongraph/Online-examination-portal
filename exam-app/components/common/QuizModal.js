import React, { useEffect, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useForm } from "react-hook-form";
import { SERVER_LINK } from "../../helpers/config";
import axios from "axios";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import { default as ReactSelect } from "react-select";
import Select from 'react-select';
import { components } from "react-select";
// import { Multiselect } from "multiselect-react-dropdown";
import "react-datepicker/dist/react-datepicker.css";

const Option = (props) => {
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

const QuizModal = ({ modal, setModal, editForm, participantId }) => {
  //For Image Preview
  const [selectedImage, setSelectedImage] = useState();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [mobile, setMobile] = useState("");
  const [buttonText, setButtonText] = useState("Add");

  const [levelData, setLevelData] = useState("");
  const [moduleData, setModuleData] = useState("");

  const [password, setPassword] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  const { register, handleSubmit } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    async function fetchApiData() {
      let levels = await axios.get(`${SERVER_LINK}/level/find`);
      let modules = await axios.get(`${SERVER_LINK}/module/find`);

      let moduleArray = modules.data.map((object) => {
          object.value = object.module
          object.label = object.module
          return object
      });
      setModuleData(moduleArray);
      setLevelData(levels.data);
    }

    fetchApiData();
  }, [router.query?.question_id]);
  // for sending the data to the backend

  console.log("this is modulearra");
  console.log(moduleData);
  const checkWithDatabase = async (data) => {
    data.name = name;
    data.email = email;
    data.mobile = mobile;
    data.id = organizationId;
    data.password = password;

    let participantData = JSON.stringify(data);

    // for new data registration
    await axios({
      url: `${SERVER_LINK}/participants`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: participantData,
    })
      .then((response) => {
        router.replace(router.asPath);
        setName("");
        setEmail("");
        setMobile("");
        setPassword("");
        setOrganizationId("");
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
          setEmail("");
          setMobile("");
          setPassword("");
          setOrganizationId("");
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
                    Pick A Date
                  </label>

                  <div class="flex items-center justify-center">
                    <div
                      className="datepicker bg-gray-200relative form-floating mb-3 xl:w-96"
                      data-mdb-toggle-button="false"
                    >
                      <DatePicker
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        placeholderText={"mm/dd/yyyy"}
                        filterDate={(date) =>
                          date.getDay() !== 6 && date.getDay() !== 0
                        } // weekends cancel
                        popperClassName="react-datepicker-right"
                        showYearDropdown // year show and scrolldown alos
                        scrollableYearDropdown
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Pick A TIme
                  </label>

                  <div class="flex items-center justify-center">
                    <div
                      className="datepicker bg-gray-200relative form-floating mb-3 xl:w-96"
                      data-mdb-toggle-button="false"
                    >
                      <DatePicker
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        selected={selectedDate}
                        showTimeSelect
                        placeholderText={"10 : 40 PM"}
                        showTimeSelectOnly
                        // popperClassName="react-datepicker-right"
                        timeIntervals={15}
                        timeCaption="Choose "
                        dateFormat="h:mm aa"
                      />
                    </div>
                  </div>
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
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="description"
                    type="text"
                    placeholder="A short description about quiz"
                    required="required"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-gray-600 text-xs italic">
                    Describe in Brief*
                  </p>
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
                    // value={selectedLevelId}
                    // onChange={(e) => {
                    //   handleLevelTypeSelect(e);
                    // }}
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
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                    }}
                    // onChange={this.handleChange}
                    allowSelectAll={true}
                    // value={this.state.optionSelected}
                  />
                  {/* <Multiselect
                  //  isMulti={true}/
                    options={['name','checkj','data']}
                    displayValue="key"
                    // showCheckbox={true}
                  /> */}
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
