import * as React from "react";
// import LayoutDashboard from ".././layoutDashboard";
import Organization from "../../../components/organization/Organization";
import Layout from "../../../components/layout/Layout";

import axios from "axios";
import { SERVER_LINK } from "../../../helpers/config";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";



export default function organization({ org_data , error_data}) {
  const router = useRouter()
  const login_token = useSelector((state) => state.user.token)
  function handleError(){
    return router.push('/')
  }
  // login_token = useSelector((state) => state.user.token);
  return (
    <>
     {org_data&&
      <Layout title="Organization">
        <Organization org_data={org_data} />      
      </Layout>}
      {error_data && <> {typeof window !== 'undefined' && router.push('/login')} </>}
    </>
  );
}

// function for ssr data

export async function getServerSideProps(data) {
try {
  let org_data ;
  const res=await axios
      .get(`${SERVER_LINK}/organization/find`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization":data.req.cookies.access_token
        },
      })
     org_data=res.data
      return { props: { org_data } };
} catch (error) {
  let error_data={
    message : "your are not auth"
  }
  return {props : { error_data}}
}


  // Pass data to the page via props
}

