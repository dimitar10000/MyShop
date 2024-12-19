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
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from "next/link";
import { Button } from "@mui/material";
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/../tailwind.config'

export default function ShoppingCart() {
    const { user } = useUser();
    const { cart, setCart } = useCart();
    const [insuranceIncluded, setInsuranceIncluded] = useState<boolean>(true);
    const fullConfig = resolveConfig(tailwindConfig);

    useEffect(() => {
        initializeCart(user, setCart);
    }, [user, setCart]);

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

            <div className='flex flex-row mt-5 justify-between'>
                <div className='flex flex-col gap-y-1'>
                    <ShoppingBox cartItems={cart?.items} insuranceIncluded={insuranceIncluded}
                        insuranceUpdater={setInsuranceIncluded} />
                    <div className='self-end me-10 mb-10'>
                        {cart?.items && cart.items.length > 0 &&
                            <ClearCartButton />
                        }
                    </div>
                </div>

                <div className='flex flex-col mx-auto'>
                    {cart?.items && cart.items.length > 0 &&
                        <>
                            <ShoppingCartStats cartItems={cart?.items} insuranceIncluded={insuranceIncluded} 
                            deliveryPrice={3.99} paymentPrice={0}/>
                            <div className='flex flex-row justify-end mt-4'>
                                <Link href={'/delivery-payment'}>
                                    <Button variant="contained"
                                        size='large'
                                        endIcon={
                                            <ChevronRightIcon />
                                        }
                                        sx={{
                                            backgroundColor: fullConfig.theme.colors.orange[600],
                                            '&:hover': {
                                                backgroundColor: fullConfig.theme.colors.orange[700]
                                            }
                                        }}
                                    >
                                        CONTINUE
                                    </Button>
                                </Link>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}