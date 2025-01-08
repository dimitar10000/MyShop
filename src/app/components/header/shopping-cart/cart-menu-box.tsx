'use client'
import { ShoppingCartItemType, Nullable, Brand } from '@/app/lib/definitions';
import LoadError from '@/app/components/load-error';
import Image from 'next/image';
import Link from 'next/link';
import styles from './cart.module.css';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {displayCartItemDiscount} from '@/app/lib/util-funcs';
import {useConfirmationDialog} from '@/app/lib/confirmation-dialog';
import {removeFromCart} from '@/app/actions/shopping-cart';
import { useUser } from '@/app/lib/user';
import {useEffect, useState,useCallback} from 'react'
import {useCart} from '@/app/lib/cart/cart-provider';
import {getProductLink, getBrandImageOfProduct, setLocalStorageForProduct} from '@/app/lib/util-funcs';
import { useRouter } from "next/navigation";

export default function CartMenuBox({ cartItem, brands, inWishlist }: { cartItem: Nullable<ShoppingCartItemType>, 
    brands: Brand[] | null, inWishlist: boolean
}) {
    const { user } = useUser();
    const {confirmationDialog, openFunction,setConfirmFunction} = useConfirmationDialog('Are you sure you want to remove the product from the cart?', '',
        { confirm: 'Yes', cancel: 'No' });
    const router = useRouter();
    const {setCart} = useCart();
    const [brandImg, setBrandImg] = useState("");
    const link = getProductLink(cartItem);
    
    const handleRemoveItem = useCallback(async () => {
        const newCart = await removeFromCart(user?.sub!,cartItem!,cartItem!.quantity);
        setCart(newCart);
    },[user,cartItem,setCart]);
    
    useEffect(() => {
        setConfirmFunction(() => async () => {await handleRemoveItem()});
    },[setConfirmFunction,handleRemoveItem]);

    useEffect(() => {
        const img = getBrandImageOfProduct(cartItem, brands);
        setBrandImg(img);
    }, [cartItem,brands]);

    return (cartItem
        ? <div className={styles.wrapper}>

            <Link href={link}
                style={{ height: '70', width: '70', position: 'relative' }}
                onClick={(e) => {
                    e.preventDefault();
                    setLocalStorageForProduct(cartItem,brandImg,inWishlist);
                    router.push(link);
                }}>
                <Image src={cartItem.image.source}
                    alt={cartItem.image.description}
                    fill
                />
            </Link>

            <div style={{ gridColumnStart: 2, gridRowStart: 1, display: 'grid'}}>
                    <div className='cursor-text'> {cartItem.name} </div>
                    <div className='cursor-text'> x{cartItem.quantity} </div>
            </div>

            <div style={{
                gridColumnStart: 1, gridRowStart: 2,
                justifySelf: 'center',
                cursor: 'pointer'
            }}>
                <ClearRoundedIcon fontSize='medium'
                onClick={openFunction}/>
                {confirmationDialog}
            </div>

            <div style={{
                gridColumnStart: 2, gridRowStart: 2,
                justifySelf: 'end', marginRight: 10
            }}>
                <div className='cursor-text flex flex-row'>
                    <div> {(cartItem.price * cartItem.quantity).toFixed(2)} $ </div>
                    <div> {displayCartItemDiscount(cartItem)} </div> 
                </div>
            </div>
        </div>
        : <LoadError resource='cart item' />
    )
}