import  * as React from 'react';
import AddQuestion from '../../../components/questions/addQuestion'

// import OrganizationTable from './orgTable';
import Question from '../../../components/questions/Question';
import Layout from '../../../components/layout/Layout';
import Level from '../../../components/level/Level';

import axios from 'axios';
import { SERVER_LINK } from "../../../helpers/config";



// You can't name a function as MODULE...
export default function modules({question_data}){
    console.log('This is the question_data daa ');
    console.log(question_data);
  
    return (
        <>
            <Layout title='Questions'>
                <AddQuestion  />
                {/* <Level level_data={module_data} /> */}

                {/* <h1 style={{color: "red"}}>This is questions add   </h1> */}
            </Layout>
        </>
    )
}

// function for ssr data 

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get(`${SERVER_LINK}/questions/find`);

  let question_data = res.data;

  // Pass data to the page via props
  return { props: { question_data } };
}