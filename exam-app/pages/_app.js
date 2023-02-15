import '../styles/globals.css'
import Layout from '../components/layout'
import { Provider } from 'react-redux'
import store from '../store'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallbackComponent from '../components/common/error_boundry'
import { SessionProvider } from 'next-auth/react'
// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<>
			<SessionProvider session={session}>
				<ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
					<Provider store={store}>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</Provider>
				</ErrorBoundary>
			</SessionProvider>
		</>
	)
}

export default MyApp
