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

export default function ProductWrapper({ link, product, inWishlist, brands }: {
    link: string, product: Product, inWishlist: boolean, brands: Brand[] | null
}) {
    const [showCart, setShowCart] = useState(false);
    const [brandImg, setBrandImg] = useState("");
    const router = useRouter();
    const discount = product.discountedPercent;

    useEffect(() => {
        const img = getBrandImageOfProduct(product,brands);
        setBrandImg(img);
    },[product,brands]);

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
                <WishlistButton product={product} initialSelected={inWishlist} />
                <CartButton show={showCart} product={product} />
                {discount
                    ? <DiscountDisplay percent={discount} />
                    : null}
            </Link>
        </Box>
    )
}