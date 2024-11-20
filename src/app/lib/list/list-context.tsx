import { createContext } from 'react';
import {Nullable,Wishlist} from '@/app/lib/definitions';
import {Dispatch, SetStateAction} from 'react'

type ContextType = {
    list: Nullable<Wishlist>,
    setList: Dispatch<SetStateAction<Nullable<Wishlist>>>
};

export const ListContext = createContext<ContextType>({list: null, setList: () => {}});