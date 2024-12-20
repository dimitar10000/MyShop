'use client'
import { useCart } from '@/app/lib/cart/cart-provider';
import { useState } from 'react'
import BreadcrumbTemplate from '@/app/components/breadcrumbs/breadcrumb-template';
import CartStepper from '@/app/components/shopping-cart/cart-stepper';
import ShoppingCartStats from '@/app/components/shopping-cart/shopping-cart-stats';
import DeliveryBox from '@/app/components/delivery-payment/delivery-box';
import PaymentBox from '@/app/components/delivery-payment/payment-box';
import BackButton from '@/app/components/delivery-payment/back-button';
import ContinueButton from '@/app/components/shopping-cart/continue-button';

export default function DeliveryPayment() {
    const { cart } = useCart();
    const insuranceIncluded = sessionStorage.getItem("insuranceIncluded") === "true";
    const [deliveryPrice, setDeliveryPrice] = useState<number>(3.99);
    const [paymentPrice, setPaymentPrice] = useState<number>(0);

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

            <div className='flex flex-row mt-5 mb-5 justify-between'>
                <div>
                    <div className='mb-2'>
                        <DeliveryBox deliveryPriceUpdater={setDeliveryPrice} />
                    </div>
                    <div className='mb-7'>
                        <PaymentBox paymentPriceUpdater={setPaymentPrice} />
                    </div>
                    <BackButton />

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
    )

}