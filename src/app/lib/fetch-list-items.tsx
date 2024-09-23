import { cache } from 'react'
import { getListByUser, getDetailedListOfCookie } from '@/app/actions/wishlist';
import { UserProfile } from '@auth0/nextjs-auth0/client';

export const fetchListItems = cache(async (user: UserProfile | undefined) => {
    let res;

    if (user) {
        res = await getListByUser(user?.sub!);
    }
    else {
        res = await getDetailedListOfCookie();
    }

    if(res) {
        return res.items;
    }
    return null;
});