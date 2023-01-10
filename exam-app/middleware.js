import { NextResponse } from 'next/server'

export async function middleware(req) {
	// const { cookies } = req
	const url = req.url

	const publicRoutes = ['/login', '/forgotPassword', '/passwordReset']

	// const { value } = cookies?.getWithOptions('access_token')
	const cookie = req.cookies.get('access_token')?.value

	let isAuthenticated = cookie === undefined ? false : true

	if (publicRoutes.some((v) => url.includes(v))) {
		if (
			isAuthenticated &&
			(url.includes('/login') || url.includes('/signup'))
		) {
			return NextResponse.redirect(
				`${process.env.NEXT_PUBLIC_FRONTEND_LOCAL_URL}/dashboard`
			)
		}
		return NextResponse.next()
	}

	if (isAuthenticated === false) {
		return NextResponse.redirect(
			`${process.env.NEXT_PUBLIC_FRONTEND_LOCAL_URL}/login`
		)
	} else {
		return NextResponse.next()
	}
}

export const config = {
	matcher: ['/dashboard/:path*'],
}
