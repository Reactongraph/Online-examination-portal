import * as React from "react";
import Typography from "@mui/material/Typography";
import LayoutDashboard from ".././layoutDashboard";
import ParticipantTable from "./participantTable";

import axios from "axios";
import { SERVER_LINK } from "../../../helpers/config";

import Layout from '../../../components/layout/Layout';
import Participant from '../../../components/participant/Participant';


export default function participant({ participant_data }) {
  return (
    <>
      {/* <LayoutDashboard>         
           <ParticipantTable participants = {participant_data} />
          </LayoutDashboard> */}
      <Layout title="Participant">
        <Participant participant_data ={participant_data }  />
      </Layout>
    </>
  );
}

// function for ssr data
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get(`${SERVER_LINK}/participants/find`);

  let participant_data = res.data;

  // Pass data to the page via props
  return { props: { participant_data } };
}
