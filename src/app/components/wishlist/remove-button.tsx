import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { removeFromList } from '@/app/actions/wishlist';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useMutation } from '@tanstack/react-query';
import { WishlistItemType,Product } from '@/app/lib/definitions';
import {useList} from '@/app/lib/list/list-provider';

interface ButtonProperties {
    hoveredUpdater: Dispatch<SetStateAction<boolean>>,
    extraStyles?: React.CSSProperties,
    openDialog: () => void,
    openedUpdater: Dispatch<SetStateAction<boolean>>
}

function ButtonComponent({hoveredUpdater, extraStyles, openDialog,openedUpdater }: ButtonProperties) {
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
                    openedUpdater(true);
                }}
            />
        </>
    )
}

interface ComponentProps {
    show: boolean, product: WishlistItemType, onRemoveProductLoad: (load: boolean) => void,
    openDialog: () => void,onRemoveItemFailNotify: () => void,
    confirmedDeletion: null | boolean, closedDialog: null | boolean,
    deleteProductSetter: Dispatch<SetStateAction<WishlistItemType | null>>,needToDelete: boolean
}

export default function RemoveButton({ show, product, onRemoveProductLoad,openDialog,
    onRemoveItemFailNotify, confirmedDeletion, deleteProductSetter, closedDialog,needToDelete}: ComponentProps) {

    const { user } = useUser();
    const [hovered, setHovered] = useState(false);
    const {setListItems} = useList();
    const [openedDialog, setOpenedDialog] = useState<boolean>(false);

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
        if(openedDialog && confirmedDeletion) {
            deleteProductSetter(product);
        }
    },[openedDialog,confirmedDeletion,deleteProductSetter])

    useEffect(() => {
        if(closedDialog) {
            setOpenedDialog(false);
        }
    },[closedDialog,setOpenedDialog])

    useEffect(() => {
        if(needToDelete) {
            mutationRemove.mutate();
        }
    },[needToDelete])

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
                        openDialog={openDialog} openedUpdater={setOpenedDialog}/>
                    : <ButtonComponent hoveredUpdater={setHovered}
                        openDialog={openDialog} openedUpdater={setOpenedDialog}
                        extraStyles={{ filter: 'brightness(90%' }} />
                : null
            }
        </div>)
}