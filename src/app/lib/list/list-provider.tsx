'use client'
import {ListContext} from './list-context'
import {useState} from 'react'
import {Nullable,Wishlist} from '@/app/lib/definitions';
import {useContext} from 'react'

export const useList = () => useContext(ListContext);

export default function ListProvider({children} : {children: React.ReactNode} ) {
    const [list, setList] = useState<Nullable<Wishlist>>(null);

    return <ListContext.Provider value={{list, setList}}>
            {children}
        </ListContext.Provider>
}