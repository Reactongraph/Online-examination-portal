import '../styles/globals.css'
import Layout from '../components/layout'
import { Provider } from 'react-redux'
import store from '../store'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallbackComponent from '../components/common/error_boundry'

// CALL IT ONCE IN YOUR APP
if (typeof window !== 'undefined') {
	injectStyle()
}

function MyApp({ Component, pageProps }) {
	return (
		<>
			<ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
				<Provider store={store}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</Provider>
			</ErrorBoundary>
		</>
	)
}

export default MyApp
