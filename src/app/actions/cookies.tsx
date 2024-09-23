'use server'
import { UserCookie } from '@/app/lib/definitions';
import { cookies } from 'next/headers';

async function getUserCookieString() {
    let cookie;

    cookie = cookies().get('user')!.value;
    return cookie;
}

export async function getUserCookie() {
    let cookieStr;

    try {
        cookieStr = await getUserCookieString();
    } catch (e) {
        console.error(e);
        return null;
    }

    const cookie: UserCookie = JSON.parse(cookieStr);
    return cookie;
}

async function deleteUserCookie() {
    cookies().delete('user');
}

async function updateUserCookie(oldCookie: UserCookie | null) {
    if (!oldCookie) {
        return null;
    }

    try {
        // get the old expiration date and keep it
        const expirationDate = oldCookie.expiration;

        cookies().set('user',
            JSON.stringify(oldCookie), {
            maxAge: 60 * 60 * 24 * 7 * 4,
            httpOnly: true,
            expires: expirationDate
        });
    } catch (e) {
        console.error(e);
        return null;
    }
    console.log('updated cookie!');
    const res = await getUserCookie();
    return res;
}

export async function deleteCartCookie() {
    let cookieValues;

    try {
        cookieValues = await getUserCookie();
        if (cookieValues) {
            cookieValues.cart = [];
        }
        await updateUserCookie(cookieValues);
    } catch (e) {
        console.error(e);
        return null;
    }

    const res = await getUserCookie();
    return res;
}

export async function deleteWishlistCookie() {
    let cookieValues;

    try {
        cookieValues = await getUserCookie();
        if (cookieValues) {
            cookieValues.wishlist = [];
        }
        await updateUserCookie(cookieValues);
    } catch (e) {
        console.error(e);
        return null;
    }

    const res = await getUserCookie();
    return res;
}

export async function addToCartCookie(productID: number, quantity: number) {
    let cookieValues;

    try {
        cookieValues = await getUserCookie();
    } catch (e) {
        console.error(e);
        return null;
    }

    if (!cookieValues) {
        return null;
    }

    const productIndex = cookieValues['cart'].findIndex((item) => item.id === productID);

    if (productIndex === -1) {
        cookieValues['cart'].push({ id: productID, quantity: quantity });
    }
    else {
        cookieValues['cart'][productIndex].quantity += quantity;

        console.log('updated product ', productID, ' with quantity ', quantity);
    }

    console.log("added to cookie's cart!");
    await updateUserCookie(cookieValues);
    const res = await getUserCookie();
    return res;
}

export async function removeFromCartCookie(productID: number, quantity?: number) {
    if (!quantity) {
        quantity = 1;
    }

    let cookieValues;

    try {
        cookieValues = await getUserCookie();
    } catch (e) {
        console.error(e);
        return null;
    }

    if (!cookieValues) {
        return null;
    }

    const productIndex = cookieValues['cart'].findIndex((item) => item.id === productID);

    if (productIndex === -1) {
        console.error(`The product with id ${productID} is not in the cart`);
        return;

    } else {
        cookieValues['cart'][productIndex].quantity -= quantity;

        if (cookieValues['cart'][productIndex].quantity <= 0) {
            cookieValues['cart'] = cookieValues['cart'].filter((item) => item.id !== productID);
        }
    }

    console.log("removed from cookie's cart!");
    await updateUserCookie(cookieValues);
    const res = await getUserCookie();
    return res;
}

export async function addToListCookie(productID: number) {

    let cookieValues;

    try {
        cookieValues = await getUserCookie();

    } catch (e) {
        console.error(e);
        return null;
    }

    if (!cookieValues) {
        return null;
    }

    const productIndex = cookieValues['wishlist'].findIndex((item) => item.id === productID);

    if (productIndex === -1) {
        cookieValues['wishlist'].push({ id: productID });
    }
    else {
        console.error(`The product with id ${productID} is already in the list`);
        return;
    }

    console.log("added to cookie's list!");
    await updateUserCookie(cookieValues);
    const res = await getUserCookie();
    return res;
}

export async function removeFromListCookie(productID: number) {
    let cookieValues;

    try {
        cookieValues = await getUserCookie();
    } catch (e) {
        console.error(e);
        return null;
    }

    if (!cookieValues) {
        return null;
    }

    const productIndex = cookieValues['wishlist'].findIndex((item) => item.id === productID);

    if (productIndex === -1) {
        console.error(`The product with id ${productID} is not in the list`);
        return;

    } else {
        cookieValues['wishlist'] = cookieValues['wishlist'].filter((item) => item.id !== productID);
    }

    console.log("removed from cookie's list!");
    await updateUserCookie(cookieValues);
    const res = await getUserCookie();
    return res;
}