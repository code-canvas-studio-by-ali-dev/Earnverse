import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const verifyRoute = '/auth/verify-human'
const notFoundRoute = '/not-found'
const homeRoute = '/'

export default async function checkVerifyCookie(request: NextRequest) {
    const cookieStore = await cookies()
    const verifyCookie = cookieStore.get('verify')?.value
    const pathname = request.nextUrl.pathname

    if (pathname === verifyRoute) {
        if (verifyCookie === '_human') {
            return NextResponse.redirect(new URL(homeRoute, request.url))
        }
        return NextResponse.next()
    }

    if (verifyCookie === '_bot') {
        return NextResponse.redirect(new URL(notFoundRoute, request.url))
    }

    if (!verifyCookie || verifyCookie !== '_human') {
        return NextResponse.redirect(new URL(verifyRoute, request.url))
    }

    return NextResponse.next()
}