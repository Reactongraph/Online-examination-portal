import * as React from "react";
import AddQuestion from "../../../components/questions/addQuestion";

import Layout from "../../../components/layout/Layout";


import axios from "axios";
import { SERVER_LINK } from "../../../helpers/config";

// You can't name a function as MODULE...
export default function modules({ question_data }) {

  return (
    <>
      <Layout title="Questions">
        <AddQuestion />
        {/* <Level level_data={module_data} /> */}

        {/* <h1 style={{color: "red"}}>This is questions add   </h1> */}
      </Layout>
    </>
  );
}

// function for ssr data

export async function getServerSideProps(data) {
  // Fetch data from external API
  const res = await axios.get(`${SERVER_LINK}/questions/find`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      authorization: data.req.cookies.jwt,
    },
  });

  const levels = await axios.get(`${SERVER_LINK}/level/find`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: data.req.cookies.jwt,
    },
  });
  const modules = await axios.get(`${SERVER_LINK}/module/find`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: data.req.cookies.jwt,
    },
  });

  let level_data = levels.data;
  let module_data = modules.data;
  // Pass data to the page via props
  return { props: { level_data, module_data } };
}
