'use client'
import {ProductsContext} from './products-context'
import {useState} from 'react'
import {Product,Nullable} from '@/app/lib/definitions';
import {useContext} from 'react'

export const useProducts = () => useContext(ProductsContext);

export default function CartProvider({children} : {children: React.ReactNode} ) {
    const [products, setProducts] = useState<Nullable<Product[]>>(null);

    return <ProductsContext.Provider value={{products, setProducts}}>
            {children}
        </ProductsContext.Provider>
}