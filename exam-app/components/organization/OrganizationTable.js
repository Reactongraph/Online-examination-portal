import Table from "./Table";
import React, { useState } from "react";
import axios from "axios";
import { SERVER_LINK } from "../../helpers/config";
import { useRouter } from "next/router";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

const OrganizationTable = ({ org_data }) => {
  const router = useRouter();
  const [editForm, setEditForm] = useState(false);
  const [modal, setModal] = useState(false);
  const [organizationId, setOrganizationId] = useState("");
  const [orgData, setOrgData] = useState();
  const [buttonText, setButtonText] = useState("Add");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [mobile, setMobile] = useState("");
  const [quota, setQuota] = useState("");

  const [password, setPassword] = useState("");

  const { register, handleSubmit } = useForm();
  const login_token = useSelector((state) => state.user.token);
  const handleRemoveClick = (org_id) => {
    axios
      .delete(`${SERVER_LINK}/organization/${org_id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: login_token,
        },
      })
      .then((result) => {
        router.replace(router.asPath);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBoxClick = async (org_id, org_status) => {
    let new_status = {
      status: !org_status,
    };
    new_status = JSON.stringify(new_status);
    await axios
      .patch(`${SERVER_LINK}/organization/${org_id}`, new_status, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: login_token,
        },
      })
      .then((response) => {
        router.replace(router.asPath);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditClick = async (org_id) => {
    setButtonText("Update");
    setEditForm(true);
    setOrganizationId(org_id);
    setModal(true);
    // first find the user with the id
    await axios
      .get(`${SERVER_LINK}/organization/${org_id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: login_token,
        },
      })
      .then((response) => {
        let singleOrgData = response.data;
        setName(singleOrgData.name);
        setEmail(singleOrgData.email);
        setMobile(singleOrgData.mobile);
        setState(singleOrgData.state);
        setPassword(singleOrgData.password);
        setAddress(singleOrgData.address);
        setCity(singleOrgData.city);
        setPincode(singleOrgData.pincode);
        setQuota(singleOrgData.quota);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkWithDatabase = async (data) => {
    // data.status = true;
    data.name = name;
    data.email = email;
    data.mobile = mobile;
    data.password = password;
    data.city = city;
    data.state = state;
    data.pincode = pincode;
    data.address = address;
    data.quota = quota;
    let OrganizationData = JSON.stringify(data);

    // for taking the patch api data
    if (editForm) {
      await axios
        .patch(
          `${SERVER_LINK}/organization/${organizationId}`,
          OrganizationData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
              Authorization: login_token,
            },
          }
        )
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
        url: `${SERVER_LINK}/organization`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: login_token,
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

  function createData(name, email, org_id, org_status) {
    const action = (
      <>
        <button
          onClick={() => handleEditClick(org_id)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded-full"
        >
          Edit
        </button>
        &nbsp;
        <button
          onClick={() => handleRemoveClick(org_id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Delete
        </button>
      </>
    );
    const status = (
      <>
        <div className="flex ">
          <input
            onClick={() => handleBoxClick(org_id, org_status)}
            className="form-check-input appearance-none w-9  rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            defaultChecked={org_status}
          />
        </div>
      </>
    );
    return { name, email, status, action };
  }

  const rowsDataArray = org_data.map((element) => {
    let name = element.name;
    let email = element.email;
    let org_id = element.id;
    let org_status = element.status;
    return createData(name, email, org_id, org_status);
  });

  const columns = [
    {
      Header: "Name",
      accessor: "name",
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 400,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      Header: "Email",
      accessor: "email",
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 400,
      className: "text-white bg-gray-600 p-2 border-r-2 border-b-2",
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

  const data = rowsDataArray;

  //Pagination
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
            <p>{buttonText} Organization</p>
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
                    Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    value={name}
                    required
                    {...register("name", {
                      onChange: (e) => setName(e.target.value),
                    })}
                    placeholder="Jane"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-email"
                    type="email"
                    required
                    placeholder="example@gmail.com "
                    value={email}
                    {...register("email", {
                      onChange: (e) => setEmail(e.target.value),
                    })}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Password
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="password"
                    required
                    placeholder="******************"
                    value={password}
                    {...register("password", {
                      onChange: (e) => setPassword(e.target.value),
                    })}
                  />

                  <p className="text-gray-600 text-xs italic">
                    Make it as long and as crazy as you'd like
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-city"
                  >
                    City
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-city"
                    type="text"
                    required
                    placeholder="Albuquerque"
                    value={city}
                    {...register("city", {
                      onChange: (e) => setCity(e.target.value),
                    })}
                  />
                </div>

                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-city"
                  >
                    State
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    type="text"
                    required
                    placeholder="State"
                    value={state}
                    {...register("state", {
                      onChange: (e) => setState(e.target.value),
                    })}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-zip"
                  >
                    Pin Code
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-zip"
                    type="text"
                    required
                    placeholder="90210"
                    value={pincode}
                    {...register("pincode", {
                      onChange: (e) => setPincode(e.target.value),
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Address
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-address"
                    type="text"
                    required
                    placeholder="Your Office number... "
                    value={address}
                    {...register("address", {
                      onChange: (e) => setAddress(e.target.value),
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    Mobile
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-mobile"
                    type="text"
                    placeholder="+91 "
                    required
                    value={mobile}
                    {...register("mobile", {
                      onChange: (e) => setMobile(e.target.value),
                    })}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Quota
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-quota"
                    type="text"
                    placeholder="e.g. 1000"
                    required
                    value={quota}
                    {...register("quota", {
                      onChange: (e) => setQuota(e.target.value),
                    })}
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
        </div>
      </PureModal>
    </>
  );
};

export default OrganizationTable;
