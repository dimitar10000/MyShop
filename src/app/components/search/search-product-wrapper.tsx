import { Product, Brand } from '@/app/lib/definitions';
import { useState, useEffect } from 'react';
import Box from '@mui/system/Box';
import Image from 'next/image';
import Link from 'next/link';
import DiscountDisplay from '@/app/components/products/discount-display';
import { getBrandImageOfProduct, setLocalStorageForProduct } from '@/app/lib/util-funcs';
import { useRouter } from "next/navigation";

export default function SearchProductWrapper({ link, product, brands, inWishlist }: {
    link: string, product: Product, brands: Brand[] | null, inWishlist: boolean}) {

    const [brandImg, setBrandImg] = useState("");
    const router = useRouter();

    useEffect(() => {
        const img = getBrandImageOfProduct(product, brands);
        setBrandImg(img);
    }, [product, brands])

    const discount = product.discountedPercent;

    return (
        <Box
            height={300 * 0.7}
            width={260 * 0.7}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: "white" }}
        >
            <Link href={link} style={{ height: '100%', width: '100%', position: 'relative' }}
                onClick={(e) => {
                    e.preventDefault();
                    setLocalStorageForProduct(product, brandImg, inWishlist);
                    router.push(link);
                }}>
                <Image src={product.image.source}
                    alt={product.image.description}
                    fill
                    sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {discount
                    ? <DiscountDisplay percent={discount} />
                    : null
                }
            </Link>
        </Box>
    )
}