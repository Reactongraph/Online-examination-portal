import * as React from "react";

import Quizs from "../../../components/quiz/Quiz";
import Layout from "../../../components/layout/Layout";
import Level from "../../../components/level/Level";

import axios from "axios";
import { SERVER_LINK } from "../../../helpers/config";

// You can't name a function as MODULE...
export default function Quiz({ quiz_data }) {
  return (
    <>
      <Layout title="Quiz">
        {/* <Quizs quiz_data={quiz_data} />/ */}
      </Layout>
    </>
  );
}

// function for ssr data

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get(`${SERVER_LINK}/quiz/find`);

  let quiz_data = res.data;

  // Pass data to the page via props
  return { props: { quiz_data } };
}
