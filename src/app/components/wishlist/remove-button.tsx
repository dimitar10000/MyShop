import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { removeFromList } from '@/app/actions/wishlist';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useMutation } from '@tanstack/react-query';
import { WishlistItemType } from '@/app/lib/definitions';
import {useList} from '@/app/lib/list/list-provider';

interface ButtonProperties {
    hoveredUpdater: Dispatch<SetStateAction<boolean>>,
    extraStyles?: React.CSSProperties,
    openDialog: () => void
}

function ButtonComponent({hoveredUpdater, extraStyles, openDialog }: ButtonProperties) {
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
                    openDialog();
                }}
            />
        </>
    )
}

export default function RemoveButton({ show, product, onRemoveProductLoad,openDialog,confirmSetter,
    onRemoveItemFailNotify}: {
    show: boolean, product: WishlistItemType, onRemoveProductLoad: (load: boolean) => void,
    dialog: JSX.Element, openDialog: () => void, confirmSetter: any,
    onRemoveItemFailNotify: () => void
}) {
    const { user } = useUser();
    const [hovered, setHovered] = useState(false);
    const {setListItems} = useList();

    const mutationRemove = useMutation({
        mutationFn: () => {
            return removeFromList(user?.sub!, product.productID);
        }, onError: () => {
            onRemoveItemFailNotify();
            onRemoveProductLoad(false);
        }, onSuccess: (data) => {
            setListItems(data?.items);
            onRemoveProductLoad(false);
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
                    ? <ButtonComponent hoveredUpdater={setHovered}
                        openDialog={openDialog}/>
                    : <ButtonComponent hoveredUpdater={setHovered}
                        openDialog={openDialog} extraStyles={{ filter: 'brightness(90%' }} />
                : null
            }
        </div>)
}