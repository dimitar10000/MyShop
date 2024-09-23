'use client'
import Box from '@mui/material/Box';
import { Product, Nullable, Brand, Wishlist } from '@/app/lib/definitions';
import styles from './search.module.css';
import { getProductLink,isInWishlist } from '@/app/lib/util-funcs';
import { useEffect, useState } from 'react'
import {initializeList} from '@/app/lib/list/initialize-list';
import { useUser } from '@auth0/nextjs-auth0/client';
import SearchProductWrapper from './search-product-wrapper';
import SearchProductDetails from './search-product-details';

export default function SearchProductBox({ productsData, brands }: {
    productsData: Nullable<Product[]>, brands: Brand[] | null}) {

    const { user } = useUser();
    const [list, setList] = useState<Wishlist | null>(null);

    useEffect(() => {
        initializeList(user,setList);
    }, [user]);

    return (
        <Box sx={{ flexGrow: 1, marginLeft: 3 }}>
            {productsData &&
                <div className={styles['products-wrapper']}>
                    {productsData.map((item: Product, index: number) => {
                        const link = getProductLink(item);
                        const discount = item.discountedPercent;
                        const price = item.price;
                        const inWishlist = isInWishlist(item,list);
                        const name = item.name;

                        return (
                            <div key={'product' + index}>
                                <div className='flex flex-col gap-y-2'>
                                    <SearchProductWrapper link={link} product={item} brands={brands}
                                    inWishlist={inWishlist} />

                                    <SearchProductDetails name={name} price={price} discount = {discount}/>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            }
        </Box>);
}