/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useForm } from "react-hook-form";
import { SERVER_LINK } from "../../helpers/config";
import axios from "axios";
import { useRouter } from "next/router";

const ParticipantModal = ({ modal, setModal, editForm, participantId }) => {
  //For Image Preview
  const [selectedImage, setSelectedImage] = useState();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [mobile, setMobile] = useState("");
  const [buttonText, setButtonText] = useState("Add");

  const [password, setPassword] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  const { register, handleSubmit } = useForm();

  //   console.log('this is the modeal calle');

  if (editForm) {
    axios
      .get(`${SERVER_LINK}/participants/${participantId}`)
      .then((response) => {
        let singleParticipantData = response.data;

        setName(singleParticipantData.name);
        setEmail(singleParticipantData.email);
        setMobile(singleParticipantData.mobile);
        setOrganizationId(singleParticipantData.Organization_id);
        setPassword(singleParticipantData.password);
        setButtonText("Update");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const handleEditClick = (participantId) => {
    // setOpen(true);
    setButtonText("Update");
    // setEditForm(true);
    setParticipantId(participantId);
    console.log("participant id " + participantId);

    // first find the user with the id
    axios
      .get(`${SERVER_LINK}/participants/${participantId}`)
      .then((response) => {
        let singleParticipantData = response.data;

        setName(singleParticipantData.name);
        setEmail(singleParticipantData.email);
        setMobile(singleParticipantData.mobile);
        setOrganizationId(singleParticipantData.Organization_id);
        setPassword(singleParticipantData.password);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!modal) {
      setSelectedImage();
    }
  }, [modal]);

  // for sending the data to the backend
  const checkWithDatabase = async (data) => {
    console.log("This is thge data ");
    console.log(data);
    // data.status = true;
    data = JSON.stringify(data);
    console.log(data);

    // for taking the patch api data
    if (editForm) {
      await axios
        .patch(`${SERVER_LINK}/participants/${participantId}`, data, {
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
        url: `${SERVER_LINK}/participants`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data,
      })
        .then((response) => {
          router.replace(router.asPath);
          setModal(!modal);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  //console.log('modal modal', modal)
  return (
    <>
      <PureModal
        //header={<div classNameName="bg-blue-600 p-2 font-bold text-lg text-center text-white">Category</div>}
        isOpen={modal}
        width="800px"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <div classNameName="flex-row space-y-3 relative">
          <div classNameName="bg-blue-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
            <p>{buttonText} Participant</p>
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
                    id="name"
                    type="text"
                    value={name}
                    {...register("name", {
                      onChange: (e) => setName(e.target.value),
                    })}
                    placeholder="Jane"
                  />
                  {/* <p className="text-red-500 text-xs italic">
                    Please fill out this field.   property - > border-red-500
                  </p> */}
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
                    id="email"
                    type="email"
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
                    id="password"
                    type="password"
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
                    id="mobile"
                    type="text"
                    placeholder="+91 "
                    value={mobile}
                    {...register("mobile", {
                      onChange: (e) => setMobile(e.target.value),
                    })}
                  />
                  {/* <p className="text-red-500 text-xs italic">
                    Please fill out this field.   property - > border-red-500
                  </p> */}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Organization Id
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="org_id"
                    type="text"
                    placeholder="e.g. 1000"
                    value={organizationId}
                    {...register("Organization_id", {
                      onChange: (e) => setOrganizationId(e.target.value),
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

          {/* */}
        </div>
      </PureModal>
      
    </>
  );
};

export default ParticipantModal;
