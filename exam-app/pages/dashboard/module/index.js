import  * as React from 'react';

// import OrganizationTable from './orgTable';
import Module from '../../../components/module/Module';
import Layout from '../../../components/layout/Layout';
import Level from '../../../components/level/Level';

import axios from 'axios';
import { SERVER_LINK } from "../../../helpers/config";



// You can't name a function as MODULE...
export default function modules({module_data}){
    console.log('This is the module daa ');
    console.log(module_data);
  
    return (
        <>
            <Layout title='Module'>
                <Module module_data={module_data} />
                {/* <Level level_data={module_data} /> */}

                {/* <h1 style={{color: "red"}}>This is he level </h1> */}
            </Layout>
        </>
    )
}

// function for ssr data 

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get(`${SERVER_LINK}/module/find`);

  let module_data = res.data;

  // Pass data to the page via props
  return { props: { module_data } };
}