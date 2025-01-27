import { cache } from 'react'
import { getCartByUser, getDetailedCartOfCookie } from '@/app/actions/shopping-cart';
import { User } from '@/app/lib/definitions';

export const fetchCartItems = cache(async (user: User | undefined) => {
    let res;

    if (user) {
        res = await getCartByUser(user?.sub);
        if(res) {
            return res.items;
        }
    }
    else {
        res = await getDetailedCartOfCookie();
    }

    return res;
});