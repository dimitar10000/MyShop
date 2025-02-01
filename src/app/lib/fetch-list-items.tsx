import { cache } from 'react'
import { getListByUser, getDetailedListOfCookie } from '@/app/actions/wishlist';
import { User } from '@/app/lib/definitions';

export const fetchListItems = cache(async (user: User | undefined) => {
    let res;

    if (user) {
        res = await getListByUser(user?.sub);
    }
    else {
        res = await getDetailedListOfCookie();
    }

    if(res) {
        return res.items;
    }
    return res;
});