import { createContext } from 'react';
import {Product,Nullable} from '@/app/lib/definitions';
import {Dispatch, SetStateAction} from 'react'

type ContextType = {
    products: Nullable<Product[]>,
    setProducts: Dispatch<SetStateAction<Nullable<Product[]>>>
};

export const ProductsContext = createContext<ContextType>({products: null, setProducts: () => {}});