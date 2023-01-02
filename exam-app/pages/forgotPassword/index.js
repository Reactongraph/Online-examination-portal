import ForgotPasswordComponent from '../../components/ForgotPassword'
import Head from 'next/head'

export default function ForgotPassword() {
	return (
		<div>
			<Head>
				<title>Forgot Password</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
			</Head>
			<ForgotPasswordComponent />
		</div>
	)
}
