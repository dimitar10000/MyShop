import {getListByUser,getDetailedListOfCookie} from '@/app/actions/wishlist';
import {Nullable,Wishlist} from '@/app/lib/definitions';
import {Dispatch, SetStateAction} from 'react'
import { UserProfile } from '@auth0/nextjs-auth0/client';

type ListItemsSetterType = Dispatch<SetStateAction<Nullable<Wishlist['items']>>>;
type ListSetterType = Dispatch<SetStateAction<Wishlist | null>>;

export const initializeList = async (user: UserProfile | undefined, listSetter?: ListSetterType,
    listItemsSetter?: ListItemsSetterType) => {

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
    if(listItemsSetter) {
        listItemsSetter(res?.items);
    }
}