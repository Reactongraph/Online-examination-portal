import { NextResponse } from 'next/dist/server/web/spec-extension/response'
import jwtDecode from 'jwt-decode'

const notallowedRoles = {
	'/organization': ['OrganizationUser'],
	'/level': ['OrganizationUser'],
	'/module': ['OrganizationUser'],
	'/questions': ['OrganizationUser'],
}

export default function middleware(req) {
	const verify = req.cookies.get('refresh_token')
	const url = req.url
	const decode = jwtDecode(verify?.value)
	const role = decode?.role

	if (!verify && !url.includes('/login')) {
		return NextResponse.redirect(
			`${process.env.NEXT_PUBLIC_FRONTEND_LOCAL_URL}/login`
		)
	}

	if (verify && url === `${process.env.NEXT_PUBLIC_FRONTEND_LOCAL_URL}`) {
		return NextResponse.redirect(`${url}`)
	}

	// Check if the user has the correct role for the page they're accessing
	for (const [page, notallowedRole] of Object.entries(notallowedRoles)) {
		if (url.includes(page) && notallowedRole.includes(role)) {
			return NextResponse.redirect(
				`${process.env.NEXT_PUBLIC_FRONTEND_LOCAL_URL}/dashboard`
			)
		}
	}
}

export const config = {
	matcher: ['/((?!login|_next/static|_next/image|favicon.ico).*)'],
}
