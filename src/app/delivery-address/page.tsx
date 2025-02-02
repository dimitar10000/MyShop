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
import { User, Nullable } from '@/app/lib/definitions';
import { useEffect, useState } from "react";
import { getUser } from '@/app/actions/user';

export default function DeliveryAddress() {
    const { user } = useUser();
    const [myUser, setMyUser] = useState<Nullable<User>>(undefined);
    const [insuranceIncluded, setInsuranceIncluded] = useState<boolean>(false);
    const [deliveryPrice, setDeliveryPrice] = useState<number>(3.99);
    const [paymentPrice, setPaymentPrice] = useState<number>(0);
    const { cart } = useCart();
    const theme = useTheme();
    const themeBorderColor = theme.palette.primary.light;

    useEffect(() => {
        const getFunc = async () => {
            const fetchedUser = await getUser(user);

            if (fetchedUser) {
                setMyUser(fetchedUser);
            }
        }

        getFunc();

    }, [user])

    useEffect(() => {
        if (sessionStorage.getItem("deliveryPrice")) {
            setDeliveryPrice(Number(sessionStorage.getItem("deliveryPrice")));
        }

        if (sessionStorage.getItem("paymentPrice")) {
            setPaymentPrice(Number(sessionStorage.getItem("paymentPrice")));
        }

        if (sessionStorage.getItem("insuranceIncluded") === "true") {
            setInsuranceIncluded(true);
        }
        else {
            setInsuranceIncluded(false);
        }
    }, [])

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
                                <UserDetails user={myUser} />
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