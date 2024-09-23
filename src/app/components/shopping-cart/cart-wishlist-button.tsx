'use client'
import { addToList, removeFromList } from '@/app/actions/wishlist';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useSnackbar } from '@/app/lib/snackbar';
import { ShoppingCartItemType } from '@/app/lib/definitions';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';
import {useList} from '@/app/lib/list/list-provider';

export default function CartWishlistButton({ item, initialSelected }: {
    item: ShoppingCartItemType,
    initialSelected: boolean
}) {
    const { user } = useUser();
    const [hovered, setHovered] = useState(false);
    const [selected, setSelected] = useState(initialSelected);
    const {setListItems} = useList();

    const { snackbar: snackbarGreen, clickHandler: clickHandlerGreen } = useSnackbar("Your product was added to the wishlist!", undefined, 1);
    const { snackbar: snackbarRed, clickHandler: clickHandlerRed } = useSnackbar("The product couldn't be added to the list...", 'red', 2);
    const { snackbar: snackbarGreen2, clickHandler: clickHandlerGreen2 } = useSnackbar("The product was removed from the wishlist!", 'grey', 3);
    const { snackbar: snackbarRed2, clickHandler: clickHandlerRed2 } = useSnackbar("The product couldn't be removed from the list...", 'red', 4);

    return (<>
        {hovered && selected
            && <FavoriteIcon
                sx={{
                    '&:hover': {
                        cursor: 'pointer',
                    },
                    color: 'red',
                    filter: 'brightness(90%)'
                }}
                onMouseLeave={() => {
                    setHovered(false);
                }}
                onClick={async () => {
                    try {
                        const newList = await removeFromList(user?.sub!, item.productID);
                        setListItems(newList?.items);
                        clickHandlerGreen2({ horizontal: 'left', vertical: 'top' })();
                        setSelected(false);
                    }
                    catch (e) {
                        console.error(e);
                        clickHandlerRed2({ horizontal: 'left', vertical: 'top' })();
                    }
                }}
            />
        }
        {hovered && !selected
            && <FavoriteIcon
                sx={{
                    '&:hover': {
                        cursor: 'pointer'
                    },
                    color: 'red'
                }}
                onClick={async () => {
                    try {
                        const newList = await addToList(user?.sub!, item);
                        setListItems(newList?.items);
                        clickHandlerGreen({ horizontal: 'left', vertical: 'top' })();
                        setSelected(true);
                    }
                    catch (e) {
                        console.error(e);
                        clickHandlerRed({ horizontal: 'left', vertical: 'top' })();
                    }
                }}
                onMouseLeave={() => {
                    setHovered(false);
                }}
            />
        }
        {!hovered && selected
            && <FavoriteIcon
                sx={{
                    '&:hover': {
                        cursor: 'pointer',
                    },
                    color: 'red'
                }}
                onMouseOver={() => {
                    setHovered(true);
                }}
            />
        }
        {
            !hovered && !selected
            && <FavoriteBorderOutlinedIcon
                sx={{
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}
                onMouseOver={() => {
                    setHovered(true);
                }}
            />
        }
        {snackbarRed}
        {snackbarGreen}
        {snackbarRed2}
        {snackbarGreen2}
    </>
    )
}