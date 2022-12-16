import * as React from 'react'
import AddQuestion from '../../../components/questions/addQuestion'

// import OrganizationTable from './orgTable';
import Question from '../../../components/questions/Question'
import Layout from '../../../components/layout/Layout'
import Level from '../../../components/level/Level'

import axios from 'axios'
import { SERVER_LINK } from '../../../helpers/config'

// You can't name a function as MODULE...
export default function modules({ level_data, module_data }) {
    return (
        <>
            <Layout title="Questions">
                <AddQuestion
                    level_data={level_data}
                    module_data={module_data}
                />
            </Layout>
        </>
    )
}

// function for ssr data

export async function getStaticProps() {
    // Fetch data from external API

    const levels = await axios.get(`${SERVER_LINK}/level/find`)
    const modules = await axios.get(`${SERVER_LINK}/module/find`)

    let level_data = levels.data
    let module_data = modules.data

    // Pass data to the page via props
    return { props: { level_data, module_data } }
}
