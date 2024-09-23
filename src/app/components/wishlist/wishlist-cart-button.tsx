import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addToCart } from '@/app/actions/shopping-cart';
import { removeFromList } from '@/app/actions/wishlist';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useMutation } from '@tanstack/react-query';
import { WishlistItemType } from '@/app/lib/definitions';
import {useCart} from '@/app/lib/cart/cart-provider';
import {useList} from '@/app/lib/list/list-provider';

export default function WishlistCartButton({ show, product, onAddToCartNotify }: {
    show: boolean, product: WishlistItemType,
    onAddToCartNotify: (success: boolean) => void
}) {
    const { user } = useUser();
    const {setCartItems} = useCart();
    const {setListItems} = useList();

    const mutationAdd = useMutation({
        mutationFn: () => {
            return addToCart(user?.sub!, product);
        },
        onSuccess: (data) => {
            setCartItems(data?.items);
            displayPopup('green');
            mutationRemove.mutate();
        },
        onError: () => {
            displayPopup('red');
        }
    })

    const mutationRemove = useMutation({
        mutationFn: () => {
            return removeFromList(user?.sub!, product.productID);
        },
        onError: () => {
            displayPopup('red');
        },
        onSuccess: (data) => {
            setListItems(data?.items);
        }
    })

    const displayPopup = (color: string) => {
        if (color === 'red') {
            onAddToCartNotify(false);
        }
        else if (color === 'green') {
            onAddToCartNotify(true);
        }
    };

    const shopping = <ShoppingCartIcon style={{ color: 'white', fontSize: 25 }} />;

    return (
        <div>
            {show &&
                <Button variant="contained" size='small' startIcon={shopping} color='success'
                    style={{ position: 'absolute', right: 5, bottom: 8 }}
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        mutationAdd.mutate();
                    }
                    }>
                    <div className='text-sm font-medium p-1' style={{ textTransform: 'none' }}>
                        {mutationRemove.isPending || mutationAdd.isPending ? 'Adding to cart...' : 'Add to cart'}
                    </div>
                </Button>
            }
        </div>
    )
}