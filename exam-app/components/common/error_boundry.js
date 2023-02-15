export default function ErrorFallbackComponent({ error }) {
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
