import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Button } from "@mui/material";
import { useConfirmationDialog } from '@/app/lib/confirmation-dialog';
import { useCart } from '@/app/lib/cart/cart-provider';
import { useUser } from '@/app/lib/user';
import {User} from '@/app/lib/definitions';
import { Nullable, ShoppingCart } from '@/app/lib/definitions';
import { deleteCart } from '@/app/actions/shopping-cart';
import { useEffect,Dispatch, SetStateAction } from 'react';

const handleClearCart = async (user: User | undefined,
    updater: Dispatch<SetStateAction<Nullable<ShoppingCart>>>) => {

    const newCart = await deleteCart(user?.sub!);
    updater(newCart);
}

export default function ClearCartButton() {
    const { user } = useUser();
    const { confirmationDialog, openFunction, setConfirmFunction } = useConfirmationDialog('This will remove all the products from the cart and cannot be undone. Do you want to proceed?', '',
        { confirm: 'Yes', cancel: 'No' });
    const {setCart} = useCart();

    useEffect(() => {
        setConfirmFunction(() => async () => { await handleClearCart(user, setCart) });
    }, [setCart,user,setConfirmFunction]);

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