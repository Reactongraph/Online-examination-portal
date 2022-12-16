import * as React from "react";

// import OrganizationTable from './orgTable';
import Question from "../../../components/questions/Question";
import Layout from "../../../components/layout/Layout";
import Level from "../../../components/level/Level";

import axios from "axios";
import { SERVER_LINK } from "../../../helpers/config";

// You can't name a function as MODULE...
export default function modules({ question_data }) {
  console.log("This is the question_data daa ");
  console.log(question_data);

  return (
    <>
      <Layout title="Questions">
        <Question question_data={question_data} />
        {/* <Level level_data={module_data} /> */}

        {/* <h1 style={{color: "red"}}>This is questions  </h1> */}
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
      Authorization: data.req.cookies.jwt,
    },
  });

  let question_data = res.data;

  // Pass data to the page via props
  return { props: { question_data } };
}
