'use client'
import Box from '@mui/material/Box';
import ProductWrapper from '@/app/components/products/product-wrapper';
import ProductDetails from '@/app/components/products/product-details';
import styles from './products.module.css';
import LoadError from '../load-error';
import { Wishlist,Brand,Product,Nullable } from '@/app/lib/definitions';
import {isInWishlist,getProductLink,filterProductsByRange} from '@/app/lib/util-funcs';
import { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';
import {initializeBrandsOnClient} from '@/app/lib/fetch-brands';
import {initializeList} from '@/app/lib/list/initialize-list';
import {useProducts} from '@/app/lib/product/products-provider';

export default function ProductsBox({ productsData, minPrice, maxPrice }: { productsData: Nullable<Product[]>,
    minPrice?: number, maxPrice?: number}) {
    const { user } = useUser();
    const [list, setList] = useState<Wishlist | null>(null);
    const [brands, setBrands] = useState<Brand[] | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<Nullable<Product[]>>(undefined);
    const {setProducts} = useProducts();
    
    useEffect(() => {
        initializeList(user,setList);
    }, [user]);

    useEffect(() => {
        initializeBrandsOnClient(setBrands);
    },[setBrands]);

    useEffect(() => {
        if(minPrice && maxPrice && productsData) {
            const filteredData = filterProductsByRange(minPrice,maxPrice,productsData);
            setFilteredProducts(filteredData);
            setProducts(filteredData);
        }
        else {
            setFilteredProducts(productsData);
            setProducts(productsData);
        }
    },[productsData,minPrice,maxPrice]);

    return (
        <Box sx={{ flexGrow: 1, marginLeft: 10, marginTop: 5, marginBottom: 10 }}>
            <div className={styles.wrapper}>
                {filteredProducts &&
                     (filteredProducts.map(async (item: Product, index: number) => {
                        const link = getProductLink(item);
                        const discount = item.discountedPercent;
                        const price = item.price;
                        const brand = item.brand.name;
                        const inWishlist = isInWishlist(item,list);

                        return (
                            <div key={'product' + index}>
                                <div className='flex flex-col gap-y-2'>
                                    <ProductWrapper link={link} inWishlist={inWishlist} product={item} brands={brands}/>
                                    <ProductDetails brand={brand} price={price} discount={discount} />
                                </div>
                            </div>
                        )
                    }))
                    }
                    
                    {filteredProducts === null && <LoadError resource={'products'} />}
            </div>
        </Box>
    )
}