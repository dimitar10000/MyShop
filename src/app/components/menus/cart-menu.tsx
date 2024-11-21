'use client'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { Button } from "@mui/material";
import { useState,useEffect } from 'react';
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Badge from '@mui/material/Badge';
import { ShoppingCartItemType, Nullable,Brand, Wishlist } from '@/app/lib/definitions';
import { ButtonBaseOwnProps } from '@mui/material/ButtonBase';
import CartMenuBox from '../header/shopping-cart/cart-menu-box';
import Box from '@mui/material/Box';
import LoadError from '@/app/components/load-error';
import { getCartItemsTotalPrice, getCartItemsTotalDiscount,isInWishlist } from '@/app/lib/util-funcs';
import {initializeBrandsOnClient} from '@/app/lib/fetch-brands';
import { useUser } from '@auth0/nextjs-auth0/client';
import {initializeList} from '@/app/lib/list/initialize-list';

export default function CartMenu({ cartItems, numItems }: {numItems: number,
    cartItems: Nullable<ShoppingCartItemType[]>}) {
    
    const { user } = useUser();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [brands, setBrands] = useState<Brand[] | null>(null);
    const [list, setList] = useState<Nullable<Wishlist>>(null);
    const open = Boolean(anchorEl);
    let timeoutId: NodeJS.Timeout | null = null;
    
    useEffect(() => {
        initializeBrandsOnClient(setBrands);
    },[setBrands]);

    useEffect(() => {
        initializeList(user,setList);

    },[user]);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        timeoutId = setTimeout(() => {
            setAnchorEl(null);
        }, 0);
    };

    const handleMenuEnter = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        if (anchorEl) {
            anchorEl.classList.add('brightness-90');
        }
    }

    const handleMenuClose = () => {
        if (anchorEl) {
            anchorEl.classList.remove('brightness-90');
        }

        timeoutId = setTimeout(() => {
            setAnchorEl(null);
        }, 0);
    }

    const commonMenuItemProps: ButtonBaseOwnProps['sx'] = {
        borderColor: (theme) => theme.palette.primary.light,
        borderWidth: "1px", borderStyle: 'solid', userSelect: 'text',
        cursor: 'default'
    };

    const totalPrice = getCartItemsTotalPrice(cartItems);
    const totalDiscount = getCartItemsTotalDiscount(cartItems);

    return (
        <div className='flex flex-row items-center'>
            <Link href={'/shopping-cart'}>
                <Button
                    id="toggle-button"
                    aria-controls={open ? 'dropdown-menu' : undefined}
                    aria-haspopup="menu"
                    aria-expanded={open ? 'true' : undefined}
                    onMouseEnter={handleOpen}
                    onMouseLeave={handleClose}
                    className='flex flex-row gap-x-0 hover:brightness-90'
                    sx={{ zIndex: (theme) => theme.zIndex.modal + 1, textTransform: 'none' }}
                >
                    <Badge badgeContent={numItems} color="success">
                        <ShoppingCartOutlined fontSize="large" sx={{ color: 'white' }} />
                    </Badge>
                    <span className='text-center text-white'> Shopping Cart </span>
                </Button>
            </Link>
            <Menu
                id="dropdown-menu"
                anchorEl={anchorEl}
                open={open}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}

                MenuListProps={{
                    'aria-labelledby': 'toggle-button',
                    onMouseEnter: handleMenuEnter,
                    onMouseLeave: handleMenuClose,
                    disablePadding: true,
                }}
            >
                <MenuItem disableRipple sx={{
                    ...commonMenuItemProps, paddingLeft: 2, borderBottom: 'none'
                }}>
                    <div className='text-lg cursor-text'>  Shopping cart ({numItems + " items"}): </div>
                </MenuItem>

                {cartItems
                    ?
                    cartItems.map((item, index) => {
                        const inWishlist = isInWishlist(item,list);

                        return (
                            <MenuItem key={'cart-menu-item' + index} disableRipple sx={{ ...commonMenuItemProps }}>
                                <Box sx={{ marginTop: 2 }}>
                                    <CartMenuBox cartItem={item} inWishlist={inWishlist} brands={brands}/>
                                </Box>
                            </MenuItem>
                        )
                    })
                    : <MenuItem disableRipple>
                        <LoadError resource={'cart items'} />
                    </MenuItem>
                }

                {cartItems
                    ? <MenuItem disableRipple sx={{ ...commonMenuItemProps }}>
                        <Box sx={{ width: 300, marginTop: 2, marginBottom: 2 }}>
                            {totalDiscount !== "0.00" &&
                            <div className='flex flex-row justify-between me-2 ms-1'>
                                <div className='text-orange-600 cursor-text'> Saved: </div>
                                <div className='text-orange-600 cursor-text'> -{totalDiscount} $ </div>
                            </div>
                            }
                            
                            <div className='flex flex-row justify-between me-2 ms-1'>
                                <div className='text-green-400 cursor-text'> Total: </div>
                                <div className='text-green-400 cursor-text'> {totalPrice} $ </div>
                            </div>

                            <div className='flex flex-row justify-center mt-4'>
                                <Link href={'/shopping-cart'}>
                                    <Button variant='contained'
                                        size='large'
                                        color='success'
                                        style={{ textTransform: 'none', width: 284 }}>
                                            Go to shopping cart
                                    </Button>
                                </Link>
                            </div>
                        </Box>
                    </MenuItem>
                    : null
                }
            </Menu>
        </div>
    )
}