import Box from '@mui/material/Box';
import LoadError from '@/app/components/load-error';
import { ShoppingCart, Nullable, Wishlist, UserCookie,Brand } from '@/app/lib/definitions';
import {isInWishlist} from '@/app/lib/util-funcs';
import { useTheme } from '@mui/material/styles';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';
import { getListByUser } from '@/app/actions/wishlist';
import { getUserCookie } from '@/app/actions/cookies';
import ShoppingItem from './shopping-item';
import ShoppingSkeleton from '@/app/components/loadings/shopping-skeleton';
import {initializeBrandsOnClient} from '@/app/lib/fetch-brands';

export default function ShoppingBox({ cartItems }: {cartItems: Nullable<ShoppingCart['items']>,}) {
    const { user } = useUser();
    const theme = useTheme();
    const [itemCount, setItemCount] = useState(0);
    const [listData, setListData] = useState<Wishlist | UserCookie | null>(null);
    const [brands, setBrands] = useState<Brand[] | null>(null);

    useEffect(() => {
        if (cartItems) {
            setItemCount(cartItems.length);
        }
        else {
            setItemCount(0);
        }
    }, [cartItems]);

    useEffect(() => {
        const fetchList = async () => {
            if (user) {
                const data = await getListByUser(user.sub!);
                setListData(data);
            }
            else {
                const data = await getUserCookie();
                setListData(data);
            }
        }

        fetchList();
    }, [user]);

    useEffect(() => {
        initializeBrandsOnClient(setBrands);
    },[setBrands]);

    const themeBorderColor = theme.palette.primary.light;

    return (
        !cartItems
        ? <ShoppingSkeleton />
        : <Box sx={{
            width: '800px', borderColor: themeBorderColor, borderWidth: "2px", borderStyle: 'solid',
            paddingTop: 3, paddingBottom: 3, marginBottom: 3
        }}>
            {
                <div>
                    {cartItems.length === 0 &&
                        <div className='flex flex-row justify-center items-center'>
                            It looks like your cart is empty... Your products will appear here once you add them.
                        </div>
                    }

                    {
                        cartItems.map((item, index) => {
                            const inWishlist = isInWishlist(item,listData);
                            const isLastItem = index === itemCount - 1;

                            return (
                            <ShoppingItem key={'shopping item' + index} item={item} index={index} inWishlist={inWishlist}
                                          isLastItem={isLastItem} brands={brands}/>
                        )
                        })
                    }
                </div>
            }

            {
                cartItems === null &&
                <div className='flex flex-row justify-center items-center'>
                    <LoadError resource='cart items' />
                </div>
            }
        </Box>
    )
}