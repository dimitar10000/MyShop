'use client'
import {ListContext} from './list-context'
import {useState} from 'react'
import {Nullable,Wishlist} from '@/app/lib/definitions';
import {useContext} from 'react'

export const useList = () => useContext(ListContext);

export default function ListProvider({children} : {children: React.ReactNode} ) {
    const [listItems, setListItems] = useState<Nullable<Wishlist["items"]>>(null);

    return <ListContext.Provider value={{listItems, setListItems}}>
            {children}
        </ListContext.Provider>
}