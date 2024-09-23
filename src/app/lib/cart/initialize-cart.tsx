import {getCartByUser, getDetailedCartOfCookie} from '@/app/actions/shopping-cart';
import {Nullable,ShoppingCart} from '@/app/lib/definitions';
import {Dispatch, SetStateAction} from 'react'
import { UserProfile } from '@auth0/nextjs-auth0/client';

type SetterType = Dispatch<SetStateAction<Nullable<ShoppingCart['items']>>>;

export const initializeCart = async (cartItemsSetter: SetterType, user: UserProfile | undefined) => {
    if(user) {
        let res = await getCartByUser(user?.sub!);
        cartItemsSetter(res ? res.items : res);
    }
    else {
        let res = await getDetailedCartOfCookie();
        cartItemsSetter(res);
    }
}