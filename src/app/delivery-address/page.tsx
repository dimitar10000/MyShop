'use client'
import BreadcrumbTemplate from '@/app/components/breadcrumbs/breadcrumb-template';
import { useUser } from '@/app/lib/user';
import CartStepper from '@/app/components/shopping-cart/cart-stepper';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useCart } from '@/app/lib/cart/cart-provider';
import ShoppingCartStats from '@/app/components/shopping-cart/shopping-cart-stats';
import ContinueButton from '@/app/components/shopping-cart/continue-button';
import UserDetails from '@/app/components/delivery-address/user-details';
import AddressSection from '@/app/components/delivery-address/address-section';
import BackButton from '@/app/components/delivery-address/back-button';

export default function DeliveryAddress() {
    const { user } = useUser();
    const { cart } = useCart();
    const theme = useTheme();
    const themeBorderColor = theme.palette.primary.light;
    const insuranceIncluded = sessionStorage.getItem("insuranceIncluded") === "true";
    const deliveryPrice = Number(sessionStorage.getItem("deliveryPrice"));
    const paymentPrice = Number(sessionStorage.getItem("paymentPrice"));

    console.log('deliveryPrice', deliveryPrice);

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
                    <div className='mb-4'>
                        <div className='mb-1 ml-3'> User details </div>
                        <Box sx={{
                            width: "50vw", borderColor: themeBorderColor, borderWidth: "2px", borderStyle: 'solid',
                            paddingTop: 1, paddingBottom: 1, display: 'flex', flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <div className='w-7/12 mb-1'>
                                <UserDetails user={user} />
                            </div>
                        </Box>
                    </div>
                    
                    <div className='mb-7'>
                        <div className='mb-1 ml-3'> Address </div>
                        <Box sx={{
                            width: "50vw", borderColor: themeBorderColor, borderWidth: "2px", borderStyle: 'solid',
                            paddingTop: 2, paddingBottom: 1, display: 'flex', flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <div className='w-7/12 mt-2 mb-4'>
                                <AddressSection />
                            </div>
                        </Box>
                    </div>

                    <BackButton />
                </div>

                <div className='mx-auto'>
                    {cart?.items && cart.items.length > 0 &&
                        <div className='sticky top-10'>
                            <ShoppingCartStats cartItems={cart?.items} insuranceIncluded={insuranceIncluded}
                                deliveryPrice={deliveryPrice} paymentPrice={paymentPrice} />
                            <div className='flex flex-row justify-end mt-4'>
                                <ContinueButton sign={'FINISH ORDER'} link={'/'} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>);

}