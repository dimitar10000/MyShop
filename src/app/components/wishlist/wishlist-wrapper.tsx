import { WishlistItemType,Brand } from '@/app/lib/definitions';
import { useState, Dispatch, SetStateAction,useEffect } from 'react';
import Box from '@mui/system/Box';
import Image from 'next/image';
import Link from 'next/link';
import DiscountDisplay from '@/app/components/products/discount-display';
import WishlistCartButton from '@/app/components/wishlist/wishlist-cart-button';
import RemoveButton from '@/app/components/wishlist/remove-button';
import CircularProgress from '@mui/material/CircularProgress';
import { useConfirmationDialog } from '@/app/lib/confirmation-dialog';
import {getBrandImageOfProduct,setLocalStorageForProduct} from '@/app/lib/util-funcs';
import { useRouter } from "next/navigation";

function RemoveProductLoader() {

    return (
        <div className='absolute left-1/3 top-1/3'>
            <div className='flex flex-col items-center gap-y-2'>
                <div className='text-red-500 font-bold'> Removing... </div>
                <CircularProgress color='warning' />
            </div>
        </div>);
}

export default function WishlistWrapper({ link, product, setAddedToCart, setRemovedFromList, brands }: {
    link: string, product: WishlistItemType,
    setAddedToCart: Dispatch<SetStateAction<null | boolean>>,
    setRemovedFromList: Dispatch<SetStateAction<null | boolean>>,
    brands: Brand[] | null
}) {
    const [showCart, setShowCart] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [brandImg, setBrandImg] = useState("");
    const { confirmationDialog, openFunction, setConfirmFunction, setCloseFunction } = useConfirmationDialog('Are you sure you want to remove the product from the wishlist?', '',
        { confirm: 'Yes', cancel: 'No' });
    const router = useRouter();
    
    useEffect(() => {
        const img = getBrandImageOfProduct(product, brands);
        setBrandImg(img);
    }, [product, brands])

    const discount = product.discountedPercent;

    const removeProductEmitter = (load: boolean) => {
        setShowLoader(load);
    }

    const addToCartEmitter = (success: boolean) => {
        setAddedToCart(success);
    }

    const removeFromListEmitter = (success: boolean) => {
        setRemovedFromList(success);
    }

    return (
        <Box
            height={300}
            width={260}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: "white" }}
            onMouseEnter={() => { setShowCart(true); setShowButton(true);
                setCloseFunction(() => () => {setShowCart(false); setShowButton(false);})
            }}
            onMouseLeave={() => { setShowCart(false); setShowButton(false); }}
        >
            <Link href={link} style={{ height: '100%', width: '100%', position: 'relative' }}
            onClick={(e) => {
                console.log('product link was clicked!');
                e.preventDefault();
                setLocalStorageForProduct(product,brandImg,true);
                router.push(link);
            }}>
                <Image src={product.image.source}
                    alt={product.image.description}
                    fill
                    sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {showLoader && <RemoveProductLoader />}
                <RemoveButton show={showButton} product={product} dialog={confirmationDialog} openDialog={openFunction}
                 confirmSetter={setConfirmFunction} onRemoveProductLoad={removeProductEmitter} />
                <WishlistCartButton show={showCart} product={product} onAddToCartNotify={addToCartEmitter}
                onRemoveFromListNotify={setRemovedFromList}/>
                {discount
                    ? <DiscountDisplay percent={discount} />
                    : null
                }
            </Link>
        </Box>
    )
}