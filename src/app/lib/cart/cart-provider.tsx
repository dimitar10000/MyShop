'use client'
import {CartContext} from './cart-context'
import {useState} from 'react'
import {Nullable,ShoppingCart} from '@/app/lib/definitions';
import {useContext} from 'react'

export const useCart = () => useContext(CartContext);

export default function CartProvider({children} : {children: React.ReactNode} ) {
    const [cart, setCart] = useState<Nullable<ShoppingCart>>(null);

    return <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
}