import {getCartByUser, getDetailedCartOfCookie} from '@/app/actions/shopping-cart';
import {Nullable,ShoppingCart} from '@/app/lib/definitions';
import {Dispatch, SetStateAction} from 'react'
import { UserProfile } from '@auth0/nextjs-auth0/client';

type SetterType = Dispatch<SetStateAction<Nullable<ShoppingCart>>>;

export const initializeCart = async (user: UserProfile | undefined, cartItemsSetter: SetterType) => {
    if(user) {
        let res = await getCartByUser(user?.sub!);
        cartItemsSetter(res);
    }
    else {
        let res = await getDetailedCartOfCookie();
        cartItemsSetter(res);
    }
}