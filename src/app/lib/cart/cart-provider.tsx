'use client'
import {CartContext} from './cart-context'
import {useState} from 'react'
import {Nullable,ShoppingCart} from '@/app/lib/definitions';
import {useContext} from 'react'

export const useCart = () => useContext(CartContext);

export default function CartProvider({children} : {children: React.ReactNode} ) {
    const [cartItems, setCartItems] = useState<Nullable<ShoppingCart['items']>>(null);

    return <CartContext.Provider value={{cartItems, setCartItems}}>
            {children}
        </CartContext.Provider>
}