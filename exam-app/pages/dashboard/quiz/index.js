import * as React from "react";

import Module from "../../../components/module/Module";
import Layout from "../../../components/layout/Layout";
import Level from "../../../components/level/Level";

import axios from "axios";
import { SERVER_LINK } from "../../../helpers/config";

// You can't name a function as MODULE...
export default function modules({ module_data }) {
  return (
    <>
      <Layout title="Module">
        <Module module_data={module_data} />
      </Layout>
    </>
  );
}

// function for ssr data

export async function getServerSideProps(data) {
  // Fetch data from external API
  const res = await axios.get(`${SERVER_LINK}/module/find`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization":data.req.cookies.jwt
    },
  });

  let module_data = res.data;

  // Pass data to the page via props
  return { props: { module_data } };
}
