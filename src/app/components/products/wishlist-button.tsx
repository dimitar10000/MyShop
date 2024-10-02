import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { useState,Dispatch,SetStateAction } from 'react';
import { addToList, removeFromList } from '@/app/actions/wishlist';
import { useUser } from '@auth0/nextjs-auth0/client';
import {useMutation } from '@tanstack/react-query'; 
import {useList} from '@/app/lib/list/list-provider';
import {Product} from '@/app/lib/definitions';

export default function WishlistButton({ product, initialSelected,setAddedToList,setRemovedFromList }:
    { product: Product, initialSelected: boolean, setAddedToList: Dispatch<SetStateAction<boolean | null>>,
        setRemovedFromList: Dispatch<SetStateAction<boolean | null>>}) {

    const { user } = useUser();
    const [hovered, setHovered] = useState(false);
    const [selected, setSelected] = useState(initialSelected);
    const {setListItems} = useList();

    const mutationAdd = useMutation({
        mutationFn: () => {
            return addToList(user?.sub!,product);
        },
        onSuccess: (data) => {
            setAddedToList(true);
            setListItems(data?.items);
        },
        onError: () => {
            setAddedToList(false);
        }
    });

    const mutationRemove = useMutation({
        mutationFn: () => {
            return removeFromList(user?.sub!,product.id);
        },
        onSuccess: (data) => {
            setRemovedFromList(true);
            setListItems(data?.items);
        },
        onError: () => {
            setRemovedFromList(false);
        }

    })

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
        </>
    )
}