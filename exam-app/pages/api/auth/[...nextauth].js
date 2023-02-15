import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { UserLogin } from '../../../apis/auth'

const AuthOptions = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			id: 'examLogin',
			name: 'Examingation Portal',
			type: 'credentials',
			credentials: {
				email: {
					label: 'email',
					type: 'email',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
				role: {
					label: 'role',
					type: 'text',
				},
			},
			async authorize(credentials, req) {
				const payload = {
					email: credentials.email,
					password: credentials.password,
					role: credentials.role,
				}

				// api call to send to  data to backend

				const res = await UserLogin(JSON.stringify(payload))

				const user = await res

				if (user) {
					return user?.data
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null
				}
			},
		}),
	],
	secret: 'secretrefreshkey',
	callbacks: {
		async jwt({ token, user, account }) {
			if (user) {
				const { accessToken, ...rest } = user
				token.accessToken = accessToken
				token.user = rest
			}
			return token
		},
		async session({ session, token }) {
			session.user = {
				...session.user,
				...token.user,
			}
			session.accessToken = token.accessToken

			return session
		},
	},
}

export default NextAuth(AuthOptions)
