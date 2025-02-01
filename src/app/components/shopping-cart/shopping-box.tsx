import Box from '@mui/material/Box';
import LoadError from '@/app/components/load-error';
import { ShoppingCart, Nullable, Brand } from '@/app/lib/definitions';
import { isInWishlist } from '@/app/lib/util-funcs';
import { useTheme } from '@mui/material/styles';
import { useUser } from '@/app/lib/user';
import { useState, useEffect,Dispatch, SetStateAction } from 'react';
import { useList } from '@/app/lib/list/list-provider';
import { initializeList } from '@/app/lib/list/initialize-list';
import ShoppingItem from './shopping-item';
import ShoppingSkeleton from '@/app/components/loadings/shopping-skeleton';
import { initializeBrandsOnClient } from '@/app/lib/fetch-brands';
import PackageInsurance from './package-insurance';

export default function ShoppingBox({ cartItems,insuranceIncluded, insuranceUpdater }: 
    { cartItems: Nullable<ShoppingCart['items']>, insuranceIncluded: boolean,
        insuranceUpdater: Dispatch<SetStateAction<boolean>> }) {
    const { user } = useUser();
    const theme = useTheme();
    const { list, setList } = useList(); 
    const [brands, setBrands] = useState<Brand[] | null>(null);

    useEffect(() => {
        initializeList(user, setList);
    }, [user]);

    useEffect(() => {
        initializeBrandsOnClient(setBrands);
    }, [setBrands]);

    const themeBorderColor = theme.palette.primary.light;

    return (
        !cartItems
            ? <ShoppingSkeleton />
            : <Box sx={{
                width: "60vw", borderColor: themeBorderColor, borderWidth: "2px", borderStyle: 'solid',
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
                                const inWishlist = isInWishlist(item, list);

                                return (
                                    <ShoppingItem key={'shopping item' + index} item={item} index={index} inWishlist={inWishlist} brands={brands} />
                                )
                            })
                        }

                        {cartItems && cartItems.length > 0 &&
                            <PackageInsurance insuranceIncluded={insuranceIncluded} insuranceUpdater={insuranceUpdater} />
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