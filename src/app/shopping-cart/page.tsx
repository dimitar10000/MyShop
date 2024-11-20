'use client'
import BreadcrumbTemplate from '@/app/components/breadcrumbs/breadcrumb-template';
import { useUser } from '@auth0/nextjs-auth0/client';
import CartStepper from '@/app/components/shopping-cart/cart-stepper';
import ShoppingBox from '@/app/components/shopping-cart/shopping-box';
import { useEffect } from 'react'
import { useCart } from '@/app/lib/cart/cart-provider';
import ClearCartButton from '@/app/components/shopping-cart/clear-cart-button';
import {initializeCart} from '@/app/lib/cart/initialize-cart';

export default function ShoppingCart() {
    const { user } = useUser();
    const {cart,setCart} = useCart();

    useEffect(() => {
        initializeCart(user,setCart);
    }, [user,setCart]);

    return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }} className='mt-1'>
            <BreadcrumbTemplate labels={["Home", "Shopping Cart"]} links={['/']} />

            <div className='mt-5'>
                <div className='flex flex-row justify-around ms-5'>
                    <div className="text-2xl font-semibold"> Shopping Cart </div>
                    <div className='w-3/5'>
                        <CartStepper />
                    </div>
                </div>
            </div>

            <div className='flex flex-row'>
                <div className='flex flex-col'>

                </div>

                <div className='mt-5 flex flex-col gap-y-1'>
                    <ShoppingBox cartItems={cart?.items} />
                    <div className='self-end me-10 mb-10'>
                        {cart?.items && cart?.items.length > 0 &&
                            <ClearCartButton />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}