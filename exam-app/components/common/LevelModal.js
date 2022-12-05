/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { useForm } from "react-hook-form";
import { SERVER_LINK } from "../../helpers/config";
import axios from "axios";
import { useRouter } from "next/router";

const LevelModal = ({ modal, setModal,editForm , organizationId , orgData }) => {
  //For Image Preview
  const [selectedImage, setSelectedImage] = useState();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [mobile, setMobile] = useState("");
  const [quota, setQuota] = useState("");
  const [buttonText, setButtonText] = useState("Add");
  
  const [password, setPassword] = useState("");

  const { register, handleSubmit } = useForm();

  useEffect(()=>{

    if(orgData){

      userData();
    }
  },[editForm])


 function userData(){

    // setButtonText("Update");/
    // setEditForm(true);
    // setOrganizationId(org_id);

    // first find the user with the id
   
    console.log("this is the orgdata "+orgData);
    console.log(orgData);

        setName(orgData.name);
        setEmail(orgData.email);
        setMobile(orgData.mobile);
        setState(orgData.state);
        setAddress(orgData.address);
        setCity(orgData.city);
        setPincode(orgData.pincode);
        setQuota(orgData.quota);
        setPassword(orgData.password)
        setButtonText("Update");

     

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

  useEffect(() => {
    if (!modal) {
      setSelectedImage();
    }
  }, [modal]);

  // for sending the data to the backend
  const checkWithDatabase = async (data) => {
    console.log("This is thge data ");
    console.log(data);
    data.status = true;
    data = JSON.stringify(data);

    // for taking the patch api data
    if (editForm) {
      await axios
        .patch(`${SERVER_LINK}/rest-api/${organizationId}`, data, {
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
        url: `${SERVER_LINK}/rest-api`,
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
        //header={<div className="bg-blue-600 p-2 font-bold text-lg text-center text-white">Category</div>}
        isOpen={modal}
        width="800px"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <div className="flex-row space-y-3 relative">
          <div className="bg-blue-600 p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
            <p>{buttonText} LEVEL</p>
          </div>

          <div class="py-6 px-6 lg:px-8">
            <form
              class="w-full max-w-lg"
              onSubmit={handleSubmit((data) => checkWithDatabase(data))}
            >
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                     Enter Level 
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    value={name}
                    {...register("name", {
                      onChange: (e) => setName(e.target.value)
                    })}
                    placeholder="eg. Easy , Har"
                  />
                  {/* <p class="text-red-500 text-xs italic">
                    Please fill out this field.   property - > border-red-500
                  </p> */}
                </div>
              
              </div>

           
             
             
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {buttonText}
              </button>
            </form>
          </div>

          {/* */}
        </div>
      </PureModal>
      ;
    </>
  );
};

export default LevelModal;
