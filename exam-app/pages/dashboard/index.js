import * as React from 'react'
import { useApi } from '../../hooks'
import { useRouter } from 'next/router'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { ToastContainer, toast } from 'react-toastify'

import Dashboard from '../../components/dashboard/Dashboard'
import Layout from '../../components/layout/Layout'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
    injectStyle()
}

export default function dashboard() {
    const { get } = useApi()
    const router = useRouter()

    return (
        <>
            <Layout title="Dashboard ">
                <Dashboard />
            </Layout>
            <ToastContainer />
        </>
    )
}
