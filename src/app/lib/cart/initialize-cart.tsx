import {getCartByUser, getDetailedCartOfCookie} from '@/app/actions/shopping-cart';
import {Nullable,ShoppingCart} from '@/app/lib/definitions';
import {Dispatch, SetStateAction} from 'react'
import { User } from '@/app/lib/definitions';

type SetterType = Dispatch<SetStateAction<Nullable<ShoppingCart>>>;

export const initializeCart = async (user: Nullable<User>, cartItemsSetter: SetterType) => {
    if(user) {
        const res = await getCartByUser(user?.sub);
        cartItemsSetter(res);
    }
    else {
        const res = await getDetailedCartOfCookie();
        cartItemsSetter(res);
    }
}