import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Button } from "@mui/material";
import { useConfirmationDialog } from '@/app/lib/confirmation-dialog';
import { useCart } from '@/app/lib/cart/cart-provider';
import { useUser, UserProfile } from '@auth0/nextjs-auth0/client';
import { Nullable, ShoppingCartItemType } from '@/app/lib/definitions';
import { deleteCart } from '@/app/actions/shopping-cart';
import { useEffect,Dispatch, SetStateAction } from 'react';

const handleClearCart = async (user: UserProfile | undefined,
    updater: Dispatch<SetStateAction<Nullable<ShoppingCartItemType[]>>>) => {

    const newCart = await deleteCart(user?.sub!);
    updater(newCart?.items);
}

export default function ClearCartButton() {
    const { user } = useUser();
    const { confirmationDialog, openFunction, setConfirmFunction } = useConfirmationDialog('This will remove all the products from the cart and cannot be undone. Do you want to proceed?', '',
        { confirm: 'Yes', cancel: 'No' });
    const {setCartItems} = useCart();

    useEffect(() => {
        setConfirmFunction(() => async () => { await handleClearCart(user, setCartItems) });
    }, [setCartItems,user,setConfirmFunction]);

    return (
        <div>
            <Button variant='contained'
                size='large'
                color='error'
                style={{ textTransform: 'none', width: 220, height: 45 }}
                endIcon={<DeleteForeverOutlinedIcon sx={{ width: 30, height: 30 }} />}
                onClick={openFunction}>
                <div className='text-base'> Clear cart </div>
            </Button>
            {confirmationDialog}
        </div>
    )
}