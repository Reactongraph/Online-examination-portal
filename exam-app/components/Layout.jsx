import { useEffect } from 'react'
import { useApi } from '../hooks'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
// import { useCookies } from 'react-cookie';
import { SERVER_LINK } from '../helpers/config'
import axios from 'axios'
import { useCookie } from 'next-cookie'
import { useState } from 'react'

// import Footer from './Footer';

// To check for the refresh token on every page
export default function Layout({ children }) {
    // const [cookies, setCookie] = useCookies();
    // console.log("cookie",cookies);
    const data = useCookie(children.cookie)
    let [cookie, setName] = useState(data.get('refresh_token') || '')
    console.log('next cookie', cookie)
    const router = useRouter()
    const dispatch = useDispatch()

    const { token } = router.query

    const { get } = useApi()
    const refreshToken = async () => {
        console.log('name in refresh fun', cookie)
        await axios
            .get(`${SERVER_LINK}/auth/refresh_token`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    xaccesstoken: cookie,
                },
            })
            .then((response) => {
                console.log('response')
                console.log(response)
                const newToken = response.data.access_token
                console.log('new token')
                console.log(newToken)
                const payload = response.data.payload
                console.log("payload",payload);
                if (newToken) {
                    if (
                        router.asPath == '/login' ||
                        router.asPath == '/' ||
                        router.asPath == '/passwordReset' ||
                        router.asPath == 'forgotPassword'
                    ) {
                        console.log('tgis oihsofihsdoiofhsdkdfkn')
                        dispatch({
                            type: 'UPDATE_ACCESS_TOKEN',
                            token: newToken,
                            payload: payload,
                        })

                        router.push(`/dashboard`)
                    } else {
                        console.log('this is else ')

                        dispatch({
                            type: 'UPDATE_ACCESS_TOKEN',
                            token: newToken,
                            payload: payload,
                        })
                        console.log('new token in else', newToken)
                        router.push(`${router.asPath}`)
                    }
                }
            })
            .catch((err) => {
                // for allowing user to access some pages without token
                if (
                    router.pathname == `/passwordReset` ||
                    router.asPath == '/forgotPassword'
                ) {
                    router.push(`${router.asPath}`)
                } else {
                    router.push('/login')
                    // router.push(`${router.asPath}`)
                }
            })
    }

    useEffect(() => {
        refreshToken()
    }, [])

    return <>{children}</>
}
