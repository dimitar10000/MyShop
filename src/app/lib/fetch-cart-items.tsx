import { cache } from 'react'
import { getCartByUser, getDetailedCartOfCookie } from '@/app/actions/shopping-cart';
import { UserProfile } from '@auth0/nextjs-auth0/client';

export const fetchCartItems = cache(async (user: UserProfile | undefined) => {
    let res;

    if (user) {
        res = await getCartByUser(user?.sub!);
        if(res) {
            return res.items;
        }
    }
    else {
        res = await getDetailedCartOfCookie();
    }

    return res;
});