import NextAuth from 'next-auth'
import { Provider } from 'next-auth/providers'

const options = {
	providers: [
		Providers.Github({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		// Providers.Twitter({
		// 	clientId: '',
		// 	clientSecret: '',
		// }),
		// Providers.Email({
		// 	server: {
		// 		host: '',
		// 		port: '',
		// 		auth: {
		// 			user: '',
		// 			pass: '',
		// 		},
		// 	},
		// 	form: '',
		// }),
	],
}

export default (req, res) => NextAuth(req, res, options)
