'use client'
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import {ShoppingCartItemType,Nullable} from '@/app/lib/definitions';
import CartMenu from '@/app/components/menus/cart-menu';
import Badge from '@mui/material/Badge';
import { useEffect, useState } from 'react'

export default function ShoppingCart({cartItems} : {cartItems: Nullable<ShoppingCartItemType[]>}) {
    const [numCartItems, setNumCartItems] = useState(0); 

    useEffect(() => {
        if(cartItems) {
            setNumCartItems(cartItems.length);
        }
    },[cartItems]);

    return (
        numCartItems === 0
        ? <div className="flex flex-row items-center hover:brightness-90">
            <Link href={'/shopping-cart'}>
                <div className='flex flex-row items-center'>
                    <Badge badgeContent={"0"} color="success">
                        <ShoppingCartOutlined fontSize="large" />
                    </Badge>
                    <span className='text-center'> Shopping Cart </span>
                </div>
            </Link>
        </div>
        : <CartMenu numItems={numCartItems} cartItems={cartItems}/>
    )
}