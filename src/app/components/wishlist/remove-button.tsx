import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { removeFromList } from '@/app/actions/wishlist';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useMutation } from '@tanstack/react-query';
import { WishlistItemType, isProduct } from '@/app/lib/definitions';
import { useSnackbar } from '@/app/lib/snackbar';
import {useList} from '@/app/lib/list/list-provider';

interface ButtonProperties {
    mutateFunction: any,
    hoveredUpdater: Dispatch<SetStateAction<boolean>>,
    extraStyles?: React.CSSProperties,
    openDialog: () => void
}

function ButtonComponent({ mutateFunction, hoveredUpdater, extraStyles, openDialog }: ButtonProperties) {
    const circle = <div className='absolute right-4 top-3 rounded-full bg-gray-500 size-6' />

    return (
        <>
            {circle}
            <RemoveCircleSharpIcon style={{
                ...extraStyles,
                position: 'absolute', right: 4, top: 2, backgroundColor: 'none',
                borderRadius: '50%', padding: '3px', fontSize: 50, color: 'red',
            }}
                onMouseEnter={() => { hoveredUpdater(true); }}
                onMouseLeave={() => { hoveredUpdater(false); }}

                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('clicked on remove button');
                    openDialog();
                }}
            />
        </>
    )
}

export default function RemoveButton({ show, product, onRemoveProductLoad,dialog,openDialog,confirmSetter }: {
    show: boolean, product: WishlistItemType, onRemoveProductLoad: (load: boolean) => void,
    dialog: JSX.Element, openDialog: () => void, confirmSetter: any
}) {
    const { user } = useUser();
    const [hovered, setHovered] = useState(false);
    const { snackbar, clickHandler } = useSnackbar("There was a problem removing the item... Please try again later.", 'red');
    const {setListItems} = useList();

    const mutationRemove = useMutation({
        mutationFn: () => {
            return removeFromList(user?.sub!, product.productID);
        }, onError: () => {
            clickHandler({ vertical: 'top', horizontal: 'left' })();
            onRemoveProductLoad(false);
        }, onSuccess: (data) => {
            setListItems(data?.items);
            onRemoveProductLoad(false);
            console.log('list updated, load for removal');
        }
    });

    useEffect(() => {
        confirmSetter(mutationRemove);
    }, []);

    useEffect(() => {
        if (mutationRemove.isPending) {
            onRemoveProductLoad(true);
        }
    }, [mutationRemove.isPending,onRemoveProductLoad]);

    return (
        <div>
            {show
                ? !hovered
                    ? <ButtonComponent mutateFunction={mutationRemove} hoveredUpdater={setHovered}
                        openDialog={openDialog}/>
                    : <ButtonComponent mutateFunction={mutationRemove} hoveredUpdater={setHovered}
                        openDialog={openDialog} extraStyles={{ filter: 'brightness(90%' }} />
                : null
            }
            {dialog}
            {snackbar}
        </div>)
}