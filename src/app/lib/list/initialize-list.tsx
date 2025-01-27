import {getListByUser,getDetailedListOfCookie} from '@/app/actions/wishlist';
import {Nullable,Wishlist} from '@/app/lib/definitions';
import {Dispatch, SetStateAction} from 'react'
import { User } from '@/app/lib/definitions';

type ListSetterType = Dispatch<SetStateAction<Nullable<Wishlist>>>;

export const initializeList = async (user: Nullable<User>, listSetter?: ListSetterType) => {

    let res;

    if(user) {
        res = await getListByUser(user?.sub);
    }
    else {
        res = await getDetailedListOfCookie();  
    }

    if(listSetter) {
        listSetter(res);
    }
}