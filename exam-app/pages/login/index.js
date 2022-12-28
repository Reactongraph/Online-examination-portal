import Head from 'next/head'
import LoginComponent from '../../components/login'

export default function Login() {
	return (
		<div>
			<Head>
				<title>Login</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
			</Head>

			<LoginComponent />
		</div>
	)
}
