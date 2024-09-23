'use client'
import { addToCart } from '@/app/actions/shopping-cart';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useSnackbar } from '@/app/lib/snackbar';
import { useMutation } from '@tanstack/react-query';
import { Button } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {WishlistItemType,ShoppingCartItemType} from '@/app/lib/definitions';
import {useCart} from '@/app/lib/cart/cart-provider';
import {Product} from '@/app/lib/definitions';

export default function CartButton({ product }: { product: Product | WishlistItemType | ShoppingCartItemType}) {
    const { user } = useUser();
    const {cartItems, setCartItems} = useCart();
    const { snackbar: snackbarGreen, clickHandler: clickHandlerGreen } = useSnackbar("Your product was added to the cart!", undefined, 1);
    const { snackbar: snackbarRed, clickHandler: clickHandlerRed } = useSnackbar("The product couldn't be added to the cart... Please try again later.", 'red', 2);

    const mutation = useMutation({
        mutationFn: () => {
            return addToCart(user?.sub!, product);
        },
        onSuccess: (data) => {
            setCartItems(data?.items);
            console.log('changed items ',cartItems);
            displayPopup('green');
        },
        onError: () => {
            displayPopup('red');
        }
    })

    const displayPopup = (color: string) => {
        if (color === 'green') {
            (clickHandlerGreen({ vertical: 'bottom', horizontal: 'left' }))();
        }
        else if (color === 'red') {
            (clickHandlerRed({ vertical: 'bottom', horizontal: 'left' }))();
        }
    };

    return (
        <>
            <Button variant='contained'
                size='large'
                color='success'
                startIcon={<ShoppingCartIcon />}
                style={{ textTransform: 'none', width: '85%' }}
                onClick={(event) => {
                    event.preventDefault();
                    mutation.mutate()}
                    }>
                {mutation.isPending ? 'Adding to cart...' : 'Add to shopping cart'}
            </Button>
            {snackbarGreen}
            {snackbarRed}
        </>
    )
}