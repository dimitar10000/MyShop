import {getListByUser,getDetailedListOfCookie} from '@/app/actions/wishlist';
import {Nullable,Wishlist} from '@/app/lib/definitions';
import {Dispatch, SetStateAction} from 'react'
import { UserProfile } from '@auth0/nextjs-auth0/client';

type ListSetterType = Dispatch<SetStateAction<Nullable<Wishlist>>>;

export const initializeList = async (user: UserProfile | undefined, listSetter?: ListSetterType) => {

    let res;

    if(user) {
        res = await getListByUser(user?.sub!);
    }
    else {
        res = await getDetailedListOfCookie();  
    }

    if(listSetter) {
        listSetter(res);
    }
}