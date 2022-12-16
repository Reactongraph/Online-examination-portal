import { MdLockOutline } from 'react-icons/md'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'

import { useRouter } from 'next/router'
import { SERVER_LINK } from '../../helpers/config'
import jwt_decode from 'jwt-decode'

import { injectStyle } from 'react-toastify/dist/inject-style'
import { ToastContainer, toast } from 'react-toastify'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
    injectStyle()
}

const schema = yup.object({
    password: yup
        .string()
        .required('Please enter your password.')
        .min(8, 'Your password is too short.'),
    confirmPassword: yup
        .string()
        .required('Please retype your password.')
        .oneOf([yup.ref('password')], 'Your passwords do not match.'),
})

export default function PasswordReset() {
    const router = useRouter()
    const { token } = router.query

    const { register, handleSubmit } = useForm()
    const changePassword = async (data) => {
        const decodeToken = jwt_decode(token)
        const decodeid = decodeToken.id
        const newPassword = data.password

        let apiData = {
            password: newPassword,
            decodeid: decodeid,
        }

        apiData = JSON.stringify(apiData)

        await axios
            .request({
                method: 'post',
                url: `${SERVER_LINK}/auth/change-password`,
                headers: {
                    'Content-Type': 'application/json',
                    xaccesstoken: token,
                },
                withCredentials: true,
                data: apiData,
            })
            .then((response) => {
                toast.success('Password Changed successfully 🤩')
                setTimeout(() => {
                    toast.info('Try Login with new Credential 🙂')
                }, 1000)
                router.push('/login')
            })
            .catch((err) => {
                toast.error(err.response.data)
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
        <main className="flex flex-col items-center justif-center w-full flex-1 px-20 text-center mt-20">
            <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
                <div className="w-3/5 p-5">
                    <div className="text-left font-bold ">
                        {' '}
                        <span className="text-blue-500"> Company</span>Name
                    </div>
                    <div className="py-10">
                        <h2 className="text-3xl font-bold text-blue-500 mb-2">
                            Reset Password
                        </h2>
                    </div>
                    <div className="flex flex-col items-center"></div>
                    <form
                        class="w-full max-w-lg"
                        onSubmit={handleSubmit((data) => changePassword(data))}
                    >
                        <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 ml-20 mt-10">
                            {' '}
                            <MdLockOutline className="text-gray-400 m-2" />
                            <input
                                type="password"
                                {...register('password')}
                                name="password"
                                placeholder="Password"
                                className="bg-gray-100 outline-none text-sm"
                            />
                        </div>
                        <div className="bg-gray-100 w-64 p-2 flex items-center mb-3 ml-20 mt-10">
                            <MdLockOutline className="text-gray-400 m-2" />
                            <input
                                type="password"
                                {...register('cpassword')}
                                name="cpassword"
                                placeholder="CPassword"
                                className="bg-gray-100 outline-none text-sm"
                            />
                        </div>
                        <div className="flex  justify-between w-64 mb-5">
                            <button
                                type="submit"
                                className="border-2 border-blue rounded-full px-12 py-2 inline-block font-semibold bg-blue-500  hover:text-white ml-20 md-15 mr-30 mt-10   "
                            >
                                ChangePassword
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-2/5 bg-blue-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
                    <p className="mb-2">
                        Fill up details To change your password.
                    </p>
                </div>
            </div>
        </main>
    )
}
