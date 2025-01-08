import {getCartByUser, getDetailedCartOfCookie} from '@/app/actions/shopping-cart';
import {Nullable,ShoppingCart} from '@/app/lib/definitions';
import {Dispatch, SetStateAction} from 'react'
import { User } from '@/app/lib/definitions';

type SetterType = Dispatch<SetStateAction<Nullable<ShoppingCart>>>;

export const initializeCart = async (user: User | undefined, cartItemsSetter: SetterType) => {
    if(user) {
        let res = await getCartByUser(user?.sub!);
        cartItemsSetter(res);
    }
    else {
        let res = await getDetailedCartOfCookie();
        cartItemsSetter(res);
    }
}