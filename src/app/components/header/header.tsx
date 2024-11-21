'use client'
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./searchbar/searchbar";
import LogIn from './login';
import LoggedIn from './logged-in';
import ShoppingCart from './shopping-cart/shopping-cart';
import WishList from './wishlist';
import { useEffect } from 'react'
import { useCart } from '@/app/lib/cart/cart-provider';
import { useList } from '@/app/lib/list/list-provider';
import { useUser } from '@auth0/nextjs-auth0/client';
import { initializeCart } from '@/app/lib/cart/initialize-cart';
import { initializeList } from '@/app/lib/list/initialize-list';

export default function Header() {
    const { user } = useUser();
    const { cart, setCart } = useCart();
    const { list, setList } = useList();

    console.log('USER ', user);
    //console.log('CART ITEMS ',cartItems);
    //console.log('LIST ITEMS ',listItems);

    console.log('REFRESHING HEADER');

    useEffect(() => {
        initializeCart(user, setCart);
    }, [user, setCart]);

    useEffect(() => {
        initializeList(user, setList);
    }, [user, setList]);

    return (
        <div className="flex flex-row bg-slate-400 border-0 border-b-2 border-slate-700 border-solid h-100">

            <div className="flex flex-row items-center mr-auto ml-10">
                <Link href='/' className='hover:cursor-pointer'
                    style={{ width: 670 * 0.18, height: 474 * 0.18, position: 'relative' }}>
                    <Image src={"/myshop-logo.png"}
                        alt={"MyShop logo"}
                        priority
                        fill
                    />
                </Link>

                <div className="ml-7">
                    <SearchBar />
                </div>
            </div>

            {user
                ? <div className="flex flex-row items-center ml-10 mr-20">
                    <LoggedIn user={user} />
                </div>
                : <div className="flex flex-row items-center mr-20">
                    <LogIn />
                </div>}

            <div className="flex flex-row mr-5 gap-x-5">
                <WishList listItems={list?.items} />
                <ShoppingCart cartItems={cart?.items} />
            </div>

        </div>
    )
}