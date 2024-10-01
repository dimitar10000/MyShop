'use client'
import Box from '@mui/material/Box';
import { Wishlist, WishlistItemType, Brand, Nullable } from '@/app/lib/definitions';
import styles from './wishlist.module.css';
import LoadError from '../load-error';
import WishlistWrapper from '@/app/components/wishlist/wishlist-wrapper';
import ProductDetails from '@/app/components/products/product-details';
import { useSnackbar } from '@/app/lib/snackbar';
import { useState, useEffect } from 'react';
import { getProductLink } from '@/app/lib/util-funcs';
import { initializeBrandsOnClient } from '@/app/lib/fetch-brands';
import WishlistSkeleton from '@/app/components/loadings/wishlist-skeleton';

export default function WishlistBox({ productsData }: {
    productsData: Nullable<Wishlist['items']>
}) {
    const [addedToCart, setAddedToCart] = useState<boolean | null>(null);
    const [removedFromList,setRemovedFromList] = useState<boolean | null>(null);
    const [brands, setBrands] = useState<Brand[] | null>(null);
    const { snackbar: snackbarRed, clickHandler: clickHandlerRed } = useSnackbar("The product couldn't be added to the cart...", 'red', 1);
    const { snackbar: snackbarGreen, clickHandler: clickHandlerGreen } = useSnackbar("Your product was added to the cart!", 'green', 2);
    const {snackbar: snackbarRed2, clickHandler: clickHandlerRed2} = useSnackbar("The product couldn't be removed from the cart...", 'red', 3);

    useEffect(() => {
        if (addedToCart) {
            clickHandlerGreen({ vertical: 'top', horizontal: 'left' })();
        }
        else if (addedToCart === false) {
            clickHandlerRed({ vertical: 'top', horizontal: 'left' })();
        }
    }, [addedToCart]);

    useEffect(() => {
        if (removedFromList === false) {
            clickHandlerRed2({ vertical: 'top', horizontal: 'left' })();
        }
    },[removedFromList])

    useEffect(() => {
        initializeBrandsOnClient(setBrands);
    }, [setBrands]);

    return (
        <div className='mb-10 mt-1'>
            {!productsData && <WishlistSkeleton />}

            {productsData && productsData.length === 0 &&
                <div className='flex flex-col justify-center items-center gap-y-3'>
                    <div className='text-5xl font-semibold'> :-/ </div>
                    <div>
                        Your wishlist is empty. You can favourite products when browsing to see them here.
                    </div>
                </div>
            }

            <Box sx={{ flexGrow: 1, marginLeft: 10 }}>
                {productsData && productsData.length > 0 &&
                    <div className={styles.wrapper}>

                        {productsData.map((item: WishlistItemType, index: number) => {
                            const link = getProductLink(item);
                            const discount = item.discountedPercent;
                            const price = item.price;
                            const brand = item.brand;

                            return (
                                <div key={'product' + index}>
                                    <div className='flex flex-col gap-y-2'>
                                        <WishlistWrapper link={link} product={item} brands={brands} setAddedToCart={setAddedToCart}
                                        setRemovedFromList={setRemovedFromList}/>
                                        <ProductDetails brand={brand} price={price} discount={discount} />
                                        {snackbarRed}
                                        {snackbarGreen}
                                        {snackbarRed2}
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                }

                {productsData === null && <LoadError resource='wishlist items' />}

            </Box>
        </div>
    );
}