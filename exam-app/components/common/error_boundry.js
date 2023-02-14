// import React from 'react'

// class ErrorBoundary extends React.Component {
// 	constructor(props) {
// 		super(props)

// 		this.state = { hasError: false }
// 	}

// 	static getDerivedStateFromError() {
// 		// Update state  true so it will show the fallback UI

// 		return { hasError: true }
// 	}

// 	render() {
// 		if (this.state.hasError) {
// 			return (
// 				<main class='h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]'>
// 					<h1 class='text-2xl font-extrabold text-white tracking-widest'>
// 						Something Went Wrong! Please Try Again
// 					</h1>
// 				</main>
// 			)
// 		}

// 		// Return children components if hasError is false

// 		return this.props.children
// 	}
// }

// export default ErrorBoundary
export default function MyErrorFallbackComponent({ error }) {
	return (
		<div>
			<main class='h-screen w-full flex flex-col justify-center items-center bg-[#1A2238] text-white'>
				<h1 class='text-2xl font-extrabold text-white tracking-widest'>
					Something Went Wrong! Please Try Again
				</h1>
				<p>{error.message}</p>
				<button onClick={() => window.location.reload()}>Reload</button>
			</main>
		</div>
	)
}
