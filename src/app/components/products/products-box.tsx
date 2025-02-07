'use client'
import Box from '@mui/material/Box';
import ProductWrapper from '@/app/components/products/product-wrapper';
import ProductDetails from '@/app/components/products/product-details';
import styles from './products.module.css';
import LoadError from '../load-error';
import { Brand, Product, Nullable } from '@/app/lib/definitions';
import { isInWishlist, getProductLink, filterProductsByRange } from '@/app/lib/util-funcs';
import { useEffect, useState } from 'react'
import { useUser } from '@/app/lib/user';
import { initializeBrandsOnClient } from '@/app/lib/fetch-brands';
import { initializeList } from '@/app/lib/list/initialize-list';
import { useProducts } from '@/app/lib/product/products-provider';
import { useSnackbar } from '@/app/lib/snackbar';
import {useList} from '@/app/lib/list/list-provider';
 
export default function ProductsBox({ productsData, minPrice, maxPrice, currPage, itemsPerPage }: {
    productsData: Nullable<Product[]>,minPrice?: number, maxPrice?: number,
    currPage: number, itemsPerPage: number
}) {
    const { user } = useUser();
    const {list, setList} = useList();
    const [brands, setBrands] = useState<Brand[] | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<Nullable<Product[]>>(undefined);
    const { setProducts } = useProducts();
    const [startIndex, setStartIndex] = useState<number>(0);
    const [endIndex,setEndIndex] = useState<number>(productsData ? productsData.length-1 : 0);

    const [addedToList, setAddedToList] = useState<boolean | null>(null);
    const [removedFromList, setRemovedFromList] = useState<boolean | null>(null);

    const { snackbar: snackbarGreen, clickHandler: clickHandlerGreen } = useSnackbar("Your product was added to the wishlist!", undefined, 1);
    const { snackbar: snackbarRed, clickHandler: clickHandlerRed } = useSnackbar("The product couldn't be added to the list...", 'red', 2);
    const { snackbar: snackbarGreen2, clickHandler: clickHandlerGreen2 } = useSnackbar("The product was removed from the wishlist!", 'grey', 3);
    const { snackbar: snackbarRed2, clickHandler: clickHandlerRed2 } = useSnackbar("The product couldn't be removed from the list...", 'red', 4);

    
    useEffect(() => {
        initializeList(user, setList);
    }, [user]);

    useEffect(() => {
        initializeBrandsOnClient(setBrands);
    }, [setBrands]);
    

    useEffect(() => {
        if (minPrice && maxPrice && productsData) {
            const filteredData = filterProductsByRange(minPrice, maxPrice, productsData);
            setFilteredProducts(filteredData);
            setProducts(filteredData);
        }
        else {
            setFilteredProducts(productsData);
            setProducts(productsData);
        }
    }, [productsData, minPrice, maxPrice]);

    useEffect(() => {
        if (addedToList) {
            (clickHandlerGreen({ vertical: 'bottom', horizontal: 'left' }))();
            setAddedToList(null);
        }
        else if (addedToList === false) {
            (clickHandlerRed({ vertical: 'bottom', horizontal: 'left' }))();
            setAddedToList(null);
        }
    }, [addedToList])

    useEffect(() => {
        if (removedFromList) {
            (clickHandlerGreen2({ vertical: 'bottom', horizontal: 'left' }))();
            setRemovedFromList(null);
        }
        else if (removedFromList === false) {
            (clickHandlerRed2({ vertical: 'bottom', horizontal: 'left' }))();
            setRemovedFromList(null);
        }
    }, [removedFromList])

    useEffect(() => {
        setStartIndex((currPage - 1) * itemsPerPage);
        setEndIndex(itemsPerPage * currPage - 1);
    },[currPage])

    return (
        <>
        <Box sx={{ flexGrow: 1, marginLeft: 10, marginTop: 5, marginBottom: 10,
            width: 900}}>
            <div className={styles.wrapper}>
                {filteredProducts &&
                    (filteredProducts.map((item: Product, index: number) => {
                        if(index < startIndex || index > endIndex) {
                            return null;
                        }

                        const link = getProductLink(item);
                        const discount = item.discountedPercent;
                        const price = item.price;
                        const brand = item.brand.name;
                        const inWishlist = isInWishlist(item, list);

                        return (
                            <div key={'product' + index}>
                                <div className='flex flex-col gap-y-2'>
                                    <ProductWrapper link={link} inWishlist={inWishlist} product={item} brands={brands}
                                        setAddedToList={setAddedToList} setRemovedFromList={setRemovedFromList} />
                                    <ProductDetails brand={brand} price={price} discount={discount} />
                                </div>
                            </div>
                        )
                    }))
                }

                {filteredProducts === null && <LoadError resource={'products'} />}
            </div>
        </Box>
        {snackbarGreen}
        {snackbarGreen2}
        {snackbarRed}
        {snackbarRed2}
        </>
    )
}