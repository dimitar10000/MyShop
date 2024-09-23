import { NextResponse,NextFetchEvent,NextRequest } from 'next/server'
import {getSession,getAccessToken,withMiddlewareAuthRequired,AccessTokenError} from '@auth0/nextjs-auth0/edge';


async function createUserCookie() {
    const response = NextResponse.next();

    try {
    response.cookies.set('user', JSON.stringify({
        name: 'unregistered',
        cart: [],
        wishlist: [],
        email: '',
        expiration: new Date(Date.now() + 60 * 60 * 24 * 7)
    }),{maxAge: 60 * 60 * 24 * 7 * 4,
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 24 * 7)});
} catch(e) {
    console.error(e);
    return null;
}
    console.log('created cookie!');

    return response;
}

const auth0MiddleWare = withMiddlewareAuthRequired({
    middleware: async (req) => {
        const res = NextResponse.next();
        const session = await getSession(req,res);

        if(!session) {
            return NextResponse.redirect(new URL('/api/auth/login', req.url));
        }

        try {
            await getAccessToken();
        } catch (e) {
            if (e instanceof AccessTokenError && e.code === "ERR_EXPIRED_ACCESS_TOKEN") {
                return NextResponse.redirect(new URL('/api/auth/login', req.url));
              }
              throw e;
        }

        return res;
    }
});

export async function middleware(request: NextRequest, event: NextFetchEvent) {
    if (request.nextUrl.pathname.startsWith('/profile')) {
        return auth0MiddleWare(request,event);
    }

    if (request.nextUrl.pathname.startsWith('/')) {
        const existingCookies = request.cookies.get('user');

        if (!existingCookies) {
            const response = await createUserCookie();
            return response;
        }

        return NextResponse.next();
    }
}