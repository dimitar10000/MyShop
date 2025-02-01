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
import { useConfirmationDialog } from '@/app/lib/confirmation-dialog';

// states for product being added to cart or failed to remove are passed down to remove button
// states for confirming deletion and closing dialog are passed down to remove button again
// confirmation dialog resides here and the function for opening it is passed down
export default function WishlistBox({ productsData }: {
    productsData: Nullable<Wishlist['items']>
}) {
    const [addedToCart, setAddedToCart] = useState<boolean | null>(null);
    const [removedItemFail, setRemovedItemFail] = useState<true | null>(null);
    const [brands, setBrands] = useState<Brand[] | null>(null);
    const { snackbar: snackbarRed, clickHandler: clickHandlerRed } = useSnackbar("The product couldn't be added to the cart...", 'red', 1);
    const { snackbar: snackbarGreen, clickHandler: clickHandlerGreen } = useSnackbar("Your product was added to the cart!", 'green', 2);
    const { snackbar: snackbarRed2, clickHandler: clickHandlerRed2 } = useSnackbar("There was a problem removing the item... Please try again later.", 'red',3);

    const [confirmHappened, setConfirmHappened] = useState<null | boolean>(null);
    const [closeHappened, setCloseHappened] = useState<null | boolean>(null);
    const [productToDelete, setProductToDelete] = useState<WishlistItemType | null>(null);
    const { confirmationDialog, openFunction } = useConfirmationDialog('Are you sure you want to remove the product from the wishlist?', '',
        { confirm: 'Yes', cancel: 'No' },setConfirmHappened,setCloseHappened);

    useEffect(() => {
        if (addedToCart) {
            clickHandlerGreen({ vertical: 'top', horizontal: 'left' })();
        }
        else if (addedToCart === false) {
            clickHandlerRed({ vertical: 'top', horizontal: 'left' })();
        }
    }, [addedToCart]);

    useEffect(() => {
        if(removedItemFail) {
            clickHandlerRed2({ vertical: 'top', horizontal: 'left' })();
        }
    },[removedItemFail])

    useEffect(() => {
        initializeBrandsOnClient(setBrands);
    }, [setBrands]);

    useEffect(() => {
        if(productToDelete) {
            setProductToDelete(null);
        }
    },[productToDelete])

    useEffect(() => {
        if(confirmHappened) {
            setConfirmHappened(false);
        }
    },[confirmHappened])

    return (
        <div className='mb-10 mt-1'>
            {productsData === undefined && <WishlistSkeleton />}

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
                            const needToDelete = productToDelete === item;

                            return (
                                <div key={'product' + index}>
                                    <div className='flex flex-col gap-y-2'>
                                        <WishlistWrapper link={link} product={item} brands={brands} setAddedToCart={setAddedToCart}
                                        openDialog={openFunction} setRemovedItemFail={setRemovedItemFail}
                                        confirmedDeletion={confirmHappened} deleteProductSetter={setProductToDelete}
                                        needToDelete={needToDelete} closedDialog={closeHappened}/>

                                        <ProductDetails brand={brand} price={price} discount={discount} />
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                }

                {productsData === null && <LoadError resource='wishlist items' />}

            </Box>
            {snackbarRed}
            {snackbarRed2}
            {snackbarGreen}
            {confirmationDialog}
        </div>
    );
}