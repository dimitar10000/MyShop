import { createContext } from 'react';
import {Nullable,Wishlist} from '@/app/lib/definitions';
import {Dispatch, SetStateAction} from 'react'

type ContextType = {
    listItems: Nullable<Wishlist["items"]>,
    setListItems: Dispatch<SetStateAction<Nullable<Wishlist["items"]>>>
};

export const ListContext = createContext<ContextType>({listItems: null, setListItems: () => {}});