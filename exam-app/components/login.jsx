import {
    Grid,
    Paper,
    Avatar,
    TextField,
    Button,
    Typography,
    ImageListTileBar,
    IconButton,
    Box,
} from '@mui/material'
import { MdLockOutline } from 'react-icons/md'

import Link from 'next/link'
import {
    FaFacebookF,
    FaLinkedinIn,
    FaGoogle,
    FaRegEnvelope,
} from 'react-icons/fa'

import Image from 'next/image'
// import { blue, blue, pink, yellow } from "@mui/material/colors";
import { object, string, array, number } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SERVER_LINK } from '../helpers/config'

import jwt from 'jsonwebtoken'

import { useApi } from '../hooks'
import TokenService from '../services/token'
import { injectStyle } from 'react-toastify/dist/inject-style'

import { ToastContainer, toast } from 'react-toastify'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
    injectStyle()
}

// validation schema
const schema = object({
    email: string('Email should be a string')
        .required('Email address is required')
        .email('Please provide a valid email'),
    password: string('Password is required')
        .required('Password is required')
        .min(6, 'Password must be atleast 6 characters long ! '),
})
const Login = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const login_token = useSelector((state) => state.user.token)

    const [invalid, setInvalid] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { get, post } = useApi()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const checkWithDatabase = async (data) => {
        console.log('hi')
        data = JSON.stringify(data)
        console.log(data)
        await axios
            .request({
                method: 'post',
                url: `${SERVER_LINK}/auth/login`,
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
                data,
            })

            .then((response) => {
                if (response.status === 201) {
                    const login_token = response.data.token
                    toast.success('Login Successfully !')
                    dispatch({ type: 'SET_LOGIN', token: login_token })
                    router.push('/dashboard')
                } else {
                    setInvalid(true)
                    setErrorMessage('Invalid Credentials !')
                    setTimeout(() => {
                        setErrorMessage('')
                    }, 2000)
                }
            })
            .catch((err) => {
                setInvalid(true)
                setErrorMessage('Invalid Credentials !')
                setTimeout(() => {
                    setErrorMessage('')
                }, 2000)

                return console.log(err)
            })
    }

    const paperStyle = {
        padding: 20,
        height: '70vh',
        width: 280,
        margin: '20px auto',
    }
    const btnStyle = { margin: '15px 0' }

    return (
        <>
            <main className="flex flex-col items-center justif-center w-full flex-1 px-20 text-center mt-20">
                <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
                    <div className="w-3/5 p-5">
                        <div className="text-left font-bold ">
                            {' '}
                            <span className="text-blue-500"> Company</span>Name
                        </div>
                        <div className="py-10">
                            <h2 className="text-3xl font-bold text-blue-500 mb-2">
                                Sign in to Account
                            </h2>
                        </div>
                        <p className="text-gray-1000 mr-20">
                            use your login details
                        </p>
                        <div className="flex flex-col items-center"></div>
                        <form
                            class="w-full max-w-lg"
                            onSubmit={handleSubmit((data) =>
                                checkWithDatabase(data)
                            )}
                        >
                            <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 ml-20 mt-10">
                                {' '}
                                <FaRegEnvelope className="text-gray-400 m-2" />
                                <input
                                    type="email"
                                    {...register('email')}
                                    name="email"
                                    placeholder="Email"
                                    className="bg-gray-100 outline-none text-sm"
                                />{' '}
                            </div>
                            <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 ml-20">
                                {' '}
                                <MdLockOutline className="text-gray-400 m-2" />
                                <input
                                    type="password"
                                    {...register('password')}
                                    name="password"
                                    placeholder="Password"
                                    className="bg-gray-100 outline-none text-sm"
                                />{' '}
                            </div>
                            <div className="flex  justify-between w-64 mb-5">
                                <a
                                    href="#"
                                    className="text-xs mr-1 ml-20  md-20 text-gray-1000"
                                >
                                    Forget Password?
                                </a>
                                <button
                                    type="submit"
                                    className="border-2 border-blue rounded-full px-12 py-2 inline-block font-semibold bg-blue-500 hover:bg-blue-700  ml-20 md-15 mr-25 "
                                >
                                    SignIn
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="w-2/5 bg-blue-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
                        <h2 className="text-3xl font-bold mb">Hello!</h2>
                        <p className="mb-2">
                            Fill up personal information and start journey with
                            us.
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login
