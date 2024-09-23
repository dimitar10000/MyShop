'use client'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useState } from 'react';
import { addToList, removeFromList } from '@/app/actions/wishlist';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useSnackbar } from '@/app/lib/snackbar';
import {useMutation } from '@tanstack/react-query'; 
import {useList} from '@/app/lib/list/list-provider';
import {Product} from '@/app/lib/definitions';

export default function WishlistButton({ product, initialSelected }: { product: Product, initialSelected: boolean }) {
    const { user } = useUser();
    const [hovered, setHovered] = useState(false);
    const [selected, setSelected] = useState(initialSelected);
    const {setListItems} = useList();

    const {snackbar: snackbarGreen,clickHandler: clickHandlerGreen} = useSnackbar("Your product was added to the wishlist!",undefined,1);
    const {snackbar: snackbarRed,clickHandler: clickHandlerRed} = useSnackbar("The product couldn't be added to the list...", 'red',2);
    const {snackbar: snackbarGreen2,clickHandler: clickHandlerGreen2} = useSnackbar("The product was removed from the wishlist!", 'grey',3);
    const {snackbar: snackbarRed2,clickHandler: clickHandlerRed2} = useSnackbar("The product couldn't be removed from the list...", 'red',4);

    const mutationAdd = useMutation({
        mutationFn: () => {
            return addToList(user?.sub!,product);
        },
        onSuccess: (data) => {
            displayPopup('green');
            setListItems(data?.items);
        },
        onError: () => {
            displayPopup('red');
        }
    });

    const mutationRemove = useMutation({
        mutationFn: () => {
            return removeFromList(user?.sub!,product.id);
        },
        onSuccess: (data) => {
            displayPopup('grey');
            setListItems(data?.items);
        },
        onError: () => {
            displayPopup('red',2);
        }

    })

    const displayPopup = (color: string, variant?: number) => {
        if(color === 'green') {
        (clickHandlerGreen({vertical: 'bottom', horizontal: 'left'}))();
        }
        else if(color === 'red') {
            if(variant && variant === 2) {
                (clickHandlerRed2({vertical: 'bottom', horizontal: 'left'}))();
            }
            else {
                (clickHandlerRed({vertical: 'bottom', horizontal: 'left'}))();
            }
        }
        else if(color === 'grey') {
            (clickHandlerGreen2({vertical: 'bottom', horizontal: 'left'}))();
        }
    };

    return (
        <>
            {selected && !hovered
                && <FavoriteOutlinedIcon
                    style={{
                        position: 'absolute', left: 5, top: 5, backgroundColor: 'red',
                        borderRadius: '50%', padding: '3px', fontSize: 35, color: 'white'
                    }}
                    onMouseEnter={() => { setHovered(true); }}
                    onMouseLeave={() => { setHovered(false); }}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelected(false);
                        mutationRemove.mutate();
                    }}
                />
            }
            {selected && hovered
                && <FavoriteOutlinedIcon
                    style={{
                        position: 'absolute', left: 5, top: 5, backgroundColor: 'red',
                        borderRadius: '50%', padding: '3px', fontSize: 35, color: 'white',
                        filter: 'brightness(90%)'
                    }}
                    onMouseEnter={() => { setHovered(true); }}
                    onMouseLeave={() => { setHovered(false); }}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelected(false);
                        mutationRemove.mutate();
                    }}
                />
            }
            {!selected && hovered
                && <FavoriteOutlinedIcon
                    style={{
                        position: 'absolute', left: 5, top: 5, backgroundColor: 'red',
                        borderRadius: '50%', padding: '3px', fontSize: 35, color: 'white'
                    }}
                    onMouseEnter={() => { setHovered(true); }}
                    onMouseLeave={() => { setHovered(false); }}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelected(true);
                        mutationAdd.mutate();
                    }}
                />
            }

            {!selected && !hovered
                && <FavoriteBorderOutlinedIcon
                    style={{
                        position: 'absolute', left: 5, top: 5, backgroundColor: 'black',
                        borderRadius: '50%', padding: '3px', fontSize: 35, color: 'grey'
                    }}
                    onMouseEnter={() => { setHovered(true); }}
                    onMouseLeave={() => { setHovered(false); }}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelected(true);
                        mutationAdd.mutate();
                    }}
                />
            }
            {snackbarGreen}
            {snackbarGreen2}
            {snackbarRed}
            {snackbarRed2}
        </>
    )
}