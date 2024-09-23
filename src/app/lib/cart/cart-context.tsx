import { createContext } from 'react';
import {Nullable,ShoppingCart} from '@/app/lib/definitions';
import {Dispatch, SetStateAction} from 'react'

type ContextType = {
    cartItems: Nullable<ShoppingCart['items']>,
    setCartItems: Dispatch<SetStateAction<Nullable<ShoppingCart['items']>>>
};

export const CartContext = createContext<ContextType>({cartItems: null, setCartItems: () => {}});