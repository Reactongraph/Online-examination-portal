import * as React from "react";
// import LayoutDashboard from ".././layoutDashboard";
import Organization from "../../../components/organization/Organization";
import Layout from "../../../components/layout/Layout";

import axios from "axios";
import { SERVER_LINK } from "../../../helpers/config";
import { useSelector } from "react-redux";
// import { Cookies } from "cookies";
// import cookie from 'js-coo'
import { getCookie } from 'cookies-next';
import { useRouter } from "next/router";
// import { cookieCutter}
// let login_token;
import Login from '../../../components/login'


export default function organization({ org_data , error_data}) {
  // console.log(login_token);
  const router = useRouter()
  const login_token = useSelector((state) => state.user.token)
  function handleError(){
    console.log('this is hadnlkeerror');
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
  console.log("data");
  console.log(data.query);
  // const router = useRouter();
  // const login_token = useSelector((state) => state.user.token);
  // Fetch data from external API
  // const res = await axios.get(`${SERVER_LINK}/organization/find`);
  // console.log("data",token_data);
    // const data= Cookies.get('jwt')
    // console.log(data);
    // const cookies = new Cookies(req, res)
    // const data1=getCookie('jwt')
    // console.log(cookie);
    // console.log("data",data.req.cookies.jwt);
  // const res = await axios.get(`${SERVER_LINK}/organization/find`);
  const res=await axios
      .get(`${SERVER_LINK}/organization/find`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization":data.req.cookies.jwt
        },
      })
     org_data=res.data
      return { props: { org_data } };
} catch (error) {
  console.log('this is eroerweorjwseoifjsodsfmslkdflskddmfmflk');

  // console.log(error_data);
  let error_data={
    message : "your are not auth"
  }
  return {props : { error_data}}
}


  // Pass data to the page via props
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ store, req }) => {
//     // store.dispatch({type: FETCH_BLOG_LIST});
//     // store.dispatch(END);
//     // await store.sagaTask.toPromise();

//     const blog = store.getState();
//     console.log('this is server side ');
//     console.log(blog);

//     const res = await axios.get(`${SERVER_LINK}/organization/find`);
//     let org_data = res.data;
  
//     // Pass data to the page via props
//     return { props: { org_data } };
//     // const blogs = blog.blogReducer.blog;

//     // return { props: { blogs } };
//   }
// );
