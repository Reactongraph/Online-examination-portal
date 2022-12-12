import * as React from "react";
// import LayoutDashboard from ".././layoutDashboard";
import Organization from "../../../components/organization/Organization";
import Layout from "../../../components/layout/Layout";

import axios from "axios";
import { SERVER_LINK } from "../../../helpers/config";

export default function organization({ org_data }) {
  return (
    <>
      <Layout title="Organization">
        <Organization org_data={org_data} />
      </Layout>
    </>
  );
}

// function for ssr data

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get(`${SERVER_LINK}/organization/find`);

  let org_data = res.data;

  // Pass data to the page via props
  return { props: { org_data } };
}
