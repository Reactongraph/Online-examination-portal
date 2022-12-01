// import Table from 'rc-table';
import Table from "./Table";
import React, { useState } from "react";
import Pagination from "react-js-pagination";
import axios from "axios";
import { SERVER_LINK } from "../../helpers/config";
import { useRouter } from "next/router";
import Modal from "../common/Modal";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useForm } from "react-hook-form";

const LevelTable = ({ level_data }) => {
  // console.log('this is the talbe ');

  const router = useRouter();
  const [editForm, setEditForm] = useState(false);
  const [modal, setModal] = useState(false);
  const [levelId, setLevelId] = useState("");
  const [orgData, setOrgData] = useState();
  const [buttonText, setButtonText] = useState("Add");
  const [level, setLevel] = useState("");

  const { register, handleSubmit } = useForm();

  const handleRemoveClick = (level_id) => {
    axios
      .delete(`${SERVER_LINK}/level/${level_id}`)
      .then((result) => {
        router.replace(router.asPath);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditClick = (level_id) => {
    // setOpen(true);
    setButtonText("Update");
    setEditForm(true);
    setLevelId(level_id);
    setModal(true);

    // first find the user with the id
    axios
      .get(`${SERVER_LINK}/level/${level_id}`)
      .then((response) => {
        let singleLevelData = response.data;

        setLevel(singleLevelData.level);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkWithDatabase = async (data) => {
    data.status = true;
    data = JSON.stringify(data);

    // for taking the patch api data
    if (editForm) {
      await axios
        .patch(`${SERVER_LINK}/level/${levelId}`, data, {
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
    }

    // for new data registration
    else {
      await axios({
        url: `${SERVER_LINK}/level`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data,
      })
        .then((response) => {
          setModal(!modal);
          router.replace(router.asPath);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function createData(level, level_id) {
    const action = (
      <>
        <button
          onClick={() => handleEditClick(level_id)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded-full"
        >
          Edit
        </button>
        &nbsp;
        <button
          onClick={() => handleRemoveClick(level_id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Delete
        </button>
      </>
    );
    const status = (
      <>
        <div className="flex">
          {/* <div className="form-check form-switch"> */}
          <input
            className="form-check-input appearance-none w-9  rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      </>
    );
    return { level, status, action };
  }

  const rowsDataArray = level_data.map((element) => {
    let level = element.level;
    // let email = element.email;
    let level_id = element.id;
    return createData(level, level_id);
  });

  const columns = [
    {
      Header: "Level",
      accessor: "level",
      title: "Level",
      dataIndex: "level",
      key: "level",
      width: 400,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
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
      //
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
          setModal(false);
          return true;
        }}
      >
        <div className="flex-row space-y-3 relative">
          <div className="bg-blue-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
            <p>{buttonText} Level</p>
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
                    Enter Level for Module
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-level"
                    type="text"
                    value={level}
                    {...register("level", {
                      onChange: (e) => setLevel(e.target.value),
                    })}
                    placeholder="e.g. Easy , Hard ..."
                  />
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

          {/* */}
        </div>
      </PureModal>
    </>
  );
};

export default LevelTable;
