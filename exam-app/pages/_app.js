import '../styles/globals.css'
import Layout from '../components/layout'
import { Provider } from 'react-redux'
import store from '../store'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { SessionProvider } from 'next-auth/react'
// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<>
			<SessionProvider session={session}>
				<Provider store={store}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Provider>
			</SessionProvider>
		</>
	)
}

export default MyApp
