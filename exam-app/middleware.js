import { NextResponse } from 'next/dist/server/web/spec-extension/response'

export default function middleware(req) {
	let verify = req.cookies.get('refresh_token')
	let url = req.url

	if (!verify && !url.includes('/login')) {
		return NextResponse.redirect(
			`${process.env.NEXT_PUBLIC_FRONTEND_LOCAL_URL}/login`
		)
	}

	if (verify && url == `${process.env.NEXT_PUBLIC_FRONTEND_LOCAL_URL}`) {
		return NextResponse.redirect(`${url}`)
	}
}
export const config = {
	matcher: ['/((?!login|_next/static|_next/image|favicon.ico).*)'],
}
