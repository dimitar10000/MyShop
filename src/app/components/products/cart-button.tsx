'use client'
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {addToCart} from '@/app/actions/shopping-cart';
import { useUser } from '@/app/lib/user';
import {Product} from '@/app/lib/definitions';
import { useSnackbar } from '@/app/lib/snackbar';
import {useMutation } from '@tanstack/react-query';
import { useCart } from '@/app/lib/cart/cart-provider';

export default function CartButton({ show, product }: { show: boolean, product: Product
}) {
    const { user} = useUser();
    const {setCart} = useCart();
    const {snackbar: snackbarGreen,clickHandler: clickHandlerGreen} = useSnackbar("Your product was added to the cart!",undefined,1);
    const {snackbar: snackbarRed,clickHandler: clickHandlerRed} = useSnackbar("The product couldn't be added to the cart... Please try again later.", 'red',2);

    const mutation = useMutation({
        mutationFn: () => {
            return addToCart(user?.sub!,product);
        },
        onSuccess: (data) => {
            displayPopup('green');
            setCart(data);
        },
        onError: () => {
            displayPopup('red');
        }
    })

    const displayPopup = (color: string) => {
        if(color === 'green') {
        (clickHandlerGreen({vertical: 'bottom', horizontal: 'left'}))();
        }
        else if(color === 'red') {
            (clickHandlerRed({vertical: 'bottom', horizontal: 'left'}))();
        }
    };

    const shopping = <ShoppingCartIcon style={{ color: 'white', fontSize: 25 }} />;

    return (
        <>
        {show &&
        <Button variant="contained" size='small' startIcon={shopping} color='success'
            style={{ position: 'absolute', right: 5, bottom: 8 }}
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                mutation.mutate()}
                }>
            <div className='text-sm font-medium p-1' style={{ textTransform: 'none' }}>
                {mutation.isPending ? 'Adding to cart...' : 'Add to cart'}
            </div>
        </Button>}
        {snackbarGreen}
        {snackbarRed}
        </>
    )
}