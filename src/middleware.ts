/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from 'next/server'
import {auth0Client} from '@/app/lib/auth0';

async function createUserCookie() {
    const response = NextResponse.next();

    try {
        response.cookies.set('user', JSON.stringify({
            name: 'unregistered',
            cart: [],
            wishlist: [],
            email: ''
        }), {
            maxAge: 60 * 60 * 24 * 7 * 4,
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 60 * 24 * 7)
        });
    } catch (e) {
        console.error(e);
        return null;
    }
    console.log('created cookie!');

    return response;
}

const profileMiddleWare = async (req: NextRequest) => {
    const res = NextResponse.next();
    const session = await auth0Client.getSession();

    if (!session) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    try {
        await auth0Client.getAccessToken();
    } catch (e: any) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return res;
}

export async function middleware(request: NextRequest) {
    const authResponse = await auth0Client.middleware(request);

    if (request.nextUrl.pathname.startsWith("/auth")) {
        console.log("calling auth0 middleware");
        return authResponse;
    }

    if (request.nextUrl.pathname.startsWith('/profile')) {
        return profileMiddleWare(request);
    }

    if (request.nextUrl.pathname.startsWith('/')) {
        console.log("calling user cookies function");
        const existingCookies = request.cookies.get('user');

        if (!existingCookies) {
            const response = await createUserCookie();
            return response;
        }

        return NextResponse.next();
    }
}