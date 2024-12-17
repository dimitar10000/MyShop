import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import OutlinedInput from '@mui/material/OutlinedInput';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button } from "@mui/material";
import { useState,useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import { ShoppingCart, Nullable } from '@/app/lib/definitions';
import { getCartItemsTotalPrice, getCartItemsTotalDiscount } from '@/app/lib/util-funcs';

export default function ShoppingCartStats({ cartItems, insuranceIncluded, deliveryPrice,
    paymentPrice}: { cartItems: Nullable<ShoppingCart['items']>, insuranceIncluded: boolean,
        deliveryPrice: number, paymentPrice: number}) {
    const [focusedInput, setFocusedInput] = useState<boolean>(false);
    const theme = useTheme();

    const TAX_PERCENT = 10;
    const totalPrice = Number(getCartItemsTotalPrice(cartItems));
    const taxedPrice = totalPrice + TAX_PERCENT / 100.0 * totalPrice;
    const totalDiscount = Number(getCartItemsTotalDiscount(cartItems));
    const amountToPay = (taxedPrice >= 200 ? 0 : deliveryPrice) + paymentPrice + (insuranceIncluded ? 2.99 : 0) + taxedPrice;

    return (
        <div style={{ minWidth: 350, marginBottom: 20 }}>
            <div className='flex flex-row items-center justify-center mx-auto'>
                <LocalShippingOutlinedIcon sx={{ fontSize: 40 }} />
                <div className='text-lg ml-4 font-semibold'> {(200 - taxedPrice).toFixed(2)} $ until free delivery</div>
            </div>

            <div className='flex flex-row items-center justify-center mt-3'>
                <FontAwesomeIcon icon={faRotateLeft} style={{ width: 32, height: 32 }} />
                <span className='text-lg ml-4 font-semibold'> 60 DAYS REFUND PERIOD </span>
            </div>

            <div className='mt-3'>
                <div className='flex flex-row justify-between text-red-700'>
                    <div> Saved: </div>
                    <div> {totalDiscount} $</div>
                </div>

                <div className='flex flex-row justify-between mt-1'>
                    <div> Delivery price: </div>
                    <div> {taxedPrice < 200 ? deliveryPrice + " $" : "FREE"} </div>
                </div>

                <div className='flex flex-row justify-between mt-1'>
                    <div> Payment price: </div>
                    <div> {paymentPrice !== 0 ? paymentPrice + " $" : "FREE"} </div>
                </div>

                {insuranceIncluded
                    ? <div className='flex flex-row justify-between mt-1'>
                        <div> Package insurance: </div>
                        <div> 2.99 $</div>
                    </div>
                    : null
                }

                <div className='flex flex-row justify-between mt-2'>
                    <div className='font-semibold'> You pay (tax included): </div>
                    <div className='text-red-700 text-lg'> {amountToPay.toFixed(2)} $</div>
                </div>

                <div className='flex flex-row items-center justify-between mt-2'>
                    <OutlinedInput
                        sx={{
                            width: focusedInput ? 120 : 180,
                            input: {
                                py: 1,
                                pl: focusedInput ? 1 : 0,
                                textAlign: 'left',
                                border: focusedInput ? 'solid black 1px' : 'solid transparent 1px'
                            },
                            '& fieldset': {
                                border: 'none'
                            },
                            '&:hover fieldset': {
                                border: 'none'
                            },
                        }}
                        onFocus={() => { setFocusedInput(true) }}
                        placeholder={focusedInput ? 'Enter code' : 'Use coupon (optional)'}
                    />

                    {focusedInput
                        ? <Button variant="contained"
                            sx={{
                                textTransform: 'none',
                                backgroundColor: theme.palette.primary.dark,
                                '&:hover': {
                                    filter: 'brightness(90%)'
                                },
                                mr: 10
                            }}>
                            Confirm
                        </Button>
                        : null
                    }
                    {focusedInput
                        ? <div className='flex flex-row'>
                            <div onClick={() => { setFocusedInput(false) }}
                                className='hover:cursor-pointer'>
                                <CancelIcon sx={{ fontSize: 28 }} />
                            </div>
                        </div>
                        : <LocalOfferIcon sx={{ fontSize: 28 }} />
                    }
                </div>

            </div>

        </div>
    )
}