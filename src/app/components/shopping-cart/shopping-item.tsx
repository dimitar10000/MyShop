import Image from 'next/image';
import Link from 'next/link';
import styles from './cart.module.css';
import { getDiscountedPrice } from '@/app/lib/util-funcs';
import CartTextfield from './cart-textfield';
import CartWishlistButton from './cart-wishlist-button';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useTheme } from '@mui/material/styles';
import { useUser, UserProfile } from '@auth0/nextjs-auth0/client';
import { ShoppingCartItemType, Nullable, ShoppingCart,Brand } from '@/app/lib/definitions';
import { useState, useEffect } from 'react';
import { useConfirmationDialog } from '@/app/lib/confirmation-dialog';
import { removeFromCart } from '@/app/actions/shopping-cart';
import { useCart } from '@/app/lib/cart/cart-provider';
import {getProductLink} from '@/app/lib/util-funcs';
import {getBrandImageOfProduct,setLocalStorageForProduct} from '@/app/lib/util-funcs';
import { useRouter } from "next/navigation";

const handleRemoveItem = async (user: UserProfile | undefined, cartItem: ShoppingCartItemType,
    updater: (newCart: Nullable<ShoppingCart>) => void) => {

    const newCart = await removeFromCart(user?.sub!, cartItem!, cartItem!.quantity);
    updater(newCart);
}

interface ItemType {
    item: ShoppingCartItemType,
    index: number,
    inWishlist: boolean,
    brands: Brand[] | null
} 

export default function ShoppingItem({ item, index, inWishlist, brands }: ItemType) {
    const { user } = useUser();
    const theme = useTheme(); 
    const {setCart} = useCart();
    const [brandImg, setBrandImg] = useState("");
    const router = useRouter();
    const themeBorderColor = theme.palette.primary.light;
    const [textBoxValue, setTextBoxValue] = useState<string>(item.quantity.toString());
    const { confirmationDialog, openFunction: openDialog, setConfirmFunction: setOnConfirm } = useConfirmationDialog('Are you sure you want to remove the product from the cart?', '',
        { confirm: 'Yes', cancel: 'No' });
    
    useEffect(() => {
        const img = getBrandImageOfProduct(item, brands);
        setBrandImg(img);
    }, [item, brands]);

    useEffect(() => {
        setOnConfirm(() => async () => { await handleRemoveItem(user, item, setCart) });
    }, [user, item, setCart,setOnConfirm]);

    const link = getProductLink(item);

    return (
        <div key={'cart-item' + index} className={`${styles.wrapper} py-3 ps-5`}
            style={{ borderColor: themeBorderColor, borderBottomWidth: "2px", borderStyle: 'solid' }}>

            <Link href={link}
                style={{ height: 100, width: 100, position: 'relative' }}
                onClick={(e) => {
                    e.preventDefault();
                    setLocalStorageForProduct(item,brandImg,inWishlist);
                    router.push(link);
                }}>
                <Image
                    src={item.image.source}
                    alt={item.image.description}
                    fill
                />
            </Link>

            <div style={{ gridColumnStart: 2 }}
                className='flex flex-col gap-y-2'>
                <div>
                    {item.name}
                </div>

                <div>
                    Product id: {item.productID}
                </div>
            </div>

            <div style={{ gridColumnStart: 3 }}
                className='flex flex-row justify-end items-center'>
                <CartTextfield user={user} item={item} textBoxValue={textBoxValue}
                    setTextBoxValue={setTextBoxValue} />
            </div>

            <div style={{ gridColumnStart: 4 }}
                className='flex flex-row justify-end items-center gap-x-1'>
                {item.discountedPercent
                    ?
                    <>
                        <div className='line-through decoration-1 decoration-gray-100'>
                            <div className='text-gray-300'> {(item.price * item.quantity).toFixed(2)} $</div>
                        </div>
                        <div> {getDiscountedPrice(item.price,item.discountedPercent,item.quantity)} $</div>
                    </>
                    : <div> {(item.price * item.quantity).toFixed(2)} $</div>
                }
            </div>

            <div style={{ gridColumnStart: 5 }}
                className='flex flex-row justify-center items-center gap-x-1'>
                <CartWishlistButton item={item} initialSelected={inWishlist} />
                <ClearRoundedIcon onClick={openDialog}
                    sx={{
                        '&:hover': {
                            cursor: 'pointer'
                        }
                    }} />
                {confirmationDialog}
            </div>
        </div>
    )
}