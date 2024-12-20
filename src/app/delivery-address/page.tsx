'use client'
import BreadcrumbTemplate from '@/app/components/breadcrumbs/breadcrumb-template';
import { useUser } from '@auth0/nextjs-auth0/client';
import CartStepper from '@/app/components/shopping-cart/cart-stepper';
import ShoppingBox from '@/app/components/shopping-cart/shopping-box';
import { useEffect, useState } from 'react'
import { useCart } from '@/app/lib/cart/cart-provider';
import ClearCartButton from '@/app/components/shopping-cart/clear-cart-button';
import ShoppingCartStats from '@/app/components/shopping-cart/shopping-cart-stats';
import { initializeCart } from '@/app/lib/cart/initialize-cart';
import ContinueButton from '@/app/components/shopping-cart/continue-button';


export default function DeliveryAddress() {
    const { user } = useUser();
    const { cart } = useCart();
    const insuranceIncluded = sessionStorage.getItem("insuranceIncluded") === "true";
    const deliveryPrice = Number(sessionStorage.getItem("deliveryPrice"));
    const paymentPrice = Number(sessionStorage.getItem("paymentPrice"));

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

            <div className='flex flex-row mt-5 mb-5 justify-between'>
                <div>
                    

                </div>

                <div className='flex flex-col mx-auto'>
                    {cart?.items && cart.items.length > 0 &&
                        <>
                            <ShoppingCartStats cartItems={cart?.items} insuranceIncluded={insuranceIncluded}
                                deliveryPrice={deliveryPrice} paymentPrice={paymentPrice} />
                            <div className='flex flex-row justify-end mt-4'>
                                <ContinueButton sign={'ADDRESS'} link={'/delivery-address'}/>
                            </div>
                        </>
                    }
                </div>
            </div>
    </div>

}