'use client'
import Box from '@mui/system/Box';
import Image from 'next/image';
import Link from 'next/link';
import WishlistButton from '@/app/components/products/wishlist-button';
import CartButton from '@/app/components/products/cart-button';
import DiscountDisplay from '@/app/components/products/discount-display';
import { useState,useEffect } from 'react';
import {getBrandImageOfProduct,setLocalStorageForProduct} from '@/app/lib/util-funcs';
import { Brand,Product } from '@/app/lib/definitions';
import { useRouter } from "next/navigation";
import { useSnackbar } from '@/app/lib/snackbar';

export default function ProductWrapper({ link, product, inWishlist, brands }: {
    link: string, product: Product, inWishlist: boolean, brands: Brand[] | null
}) {
    const [showCart, setShowCart] = useState(false);
    const [brandImg, setBrandImg] = useState("");
    const router = useRouter();
    const [addedToList, setAddedToList] = useState<boolean | null>(null);
    const [removedFromList, setRemovedFromList] = useState<boolean | null>(null);
    const discount = product.discountedPercent;
    const {snackbar: snackbarGreen,clickHandler: clickHandlerGreen} = useSnackbar("Your product was added to the wishlist!",undefined,1);
    const {snackbar: snackbarRed,clickHandler: clickHandlerRed} = useSnackbar("The product couldn't be added to the list...", 'red',2);
    const {snackbar: snackbarGreen2,clickHandler: clickHandlerGreen2} = useSnackbar("The product was removed from the wishlist!", 'grey',3);
    const {snackbar: snackbarRed2,clickHandler: clickHandlerRed2} = useSnackbar("The product couldn't be removed from the list...", 'red',4);

    useEffect(() => {
        const img = getBrandImageOfProduct(product,brands);
        setBrandImg(img);
    },[product,brands]);

    useEffect(() => {
        if(addedToList) {
            (clickHandlerGreen({vertical: 'bottom', horizontal: 'left'}))();   
        }
        else if(addedToList === false) {
            (clickHandlerRed({vertical: 'bottom', horizontal: 'left'}))();   

        }
    },[addedToList])

    useEffect(() => {
        if(removedFromList) {
            (clickHandlerGreen2({vertical: 'bottom', horizontal: 'left'}))();   
        }
        else if(removedFromList === false) {
            (clickHandlerRed2({vertical: 'bottom', horizontal: 'left'}))();   
        }
    },[removedFromList])

    return (
        <Box
            height={300}
            width={260}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: "white" }}
            onMouseEnter={() => { setShowCart(true) }}
            onMouseLeave={() => { setShowCart(false) }}
            onClick={(e) => {
                e.preventDefault();
                setLocalStorageForProduct(product,brandImg,inWishlist);
                router.push(link);
            }}
        >
            <Link href={link} style={{ height: '100%', width: '100%', position: 'relative' }}>
                <Image src={product.image.source}
                    alt={product.image.description}
                    fill
                    sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <WishlistButton product={product} initialSelected={inWishlist} setAddedToList={setAddedToList}
                setRemovedFromList={setRemovedFromList}/>
                <CartButton show={showCart} product={product} />
                {discount
                    ? <DiscountDisplay percent={discount} />
                    : null}
            </Link>
            {snackbarGreen}
            {snackbarGreen2}
            {snackbarRed}
            {snackbarRed2}
        </Box>
    )
}