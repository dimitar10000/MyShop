import { createContext } from 'react';
import {Nullable,ShoppingCart} from '@/app/lib/definitions';
import {Dispatch, SetStateAction} from 'react'

type ContextType = {
    cart: Nullable<ShoppingCart>,
    setCart: Dispatch<SetStateAction<Nullable<ShoppingCart>>>
};

export const CartContext = createContext<ContextType>({cart: null, setCart: () => {}});