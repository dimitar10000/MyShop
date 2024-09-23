import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server'

async function createUserCookie() {
    try {
    cookies().set('user', JSON.stringify({
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
}

export async function GET(request: NextRequest) {
    const existingCookies = cookies();

    if (!existingCookies.get('user')) {
        await createUserCookie();
    }

    return NextResponse.redirect(new URL('/',request.url));
}