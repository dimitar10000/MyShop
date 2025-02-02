'use client'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Link from "next/link";
import Badge from '@mui/material/Badge';
import {WishlistItemType,Nullable} from '@/app/lib/definitions';
import { useEffect, useState } from 'react'

export default function WishList({listItems} : {listItems: Nullable<WishlistItemType[]>}) {
    const [numListItems, setNumListItems] = useState(0);

    useEffect(() => {
        if(listItems) {
            setNumListItems(listItems.length);
        }
    },[listItems]);

    return (
        <div className="flex items-center hover:brightness-90">
            <Link href={'/wishlist'}>
                <div className='flex flex-row items-center'>
                    <Badge badgeContent={numListItems} color="success">
                        <FavoriteBorderOutlinedIcon fontSize="large" />
                    </Badge>
                    <span className='text-center'> My Wishlist </span> 
                </div>
            </Link>
        </div>
    )
}