import ForgotPassword from '../../components/ForgotPassword'
import Head from 'next/head'

export default function forgotPassword() {
	return (
		<div>
			<Head>
				<title>Forgot Password</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
			</Head>
			<ForgotPassword />
		</div>
	)
}
