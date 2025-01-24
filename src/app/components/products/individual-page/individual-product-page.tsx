'use client'
import BreadcrumbTemplate from '@/app/components/breadcrumbs/breadcrumb-template';
import { capitalizeAllWords, addHyphens, getDiscountedPrice } from '@/app/lib/util-funcs';
import Image from 'next/image';
import {Product} from '@/app/lib/definitions';
import styles from './product.module.css';
import CartButton from '@/app/components/products/individual-page/cart-button';
import WishlistButton from '@/app/components/products/individual-page/wishlist-button';
import {WishlistItemType,ShoppingCartItemType} from '@/app/lib/definitions';
import {useEffect, useState} from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PreviewPlaceholders from './preview-placeholders';

export default function IndividualProductPage() {
    const [item, setItem] = useState<string | null>(null);
    const [itemImage, setItemImage] = useState<string | null>(null);
    const [included, setIncluded] = useState<string | null>(null);

    let img: string | null;
    let product: Product | WishlistItemType | ShoppingCartItemType | null;
    let inWishlist: boolean;

    useEffect(() => {
        setItem(localStorage.getItem("product"));
        setItemImage(localStorage.getItem("product image"));
        setIncluded(localStorage.getItem("in wishlist"));
    },[]);
    
    product = item ? JSON.parse(item) : null;
    img = itemImage ? itemImage : null;
    inWishlist = included ? (included === "true") : false;

    const sexLabel = product?.categories?.find(cat => cat === "men" || cat === "women");
    const itemTypeLabel = product?.categories?.find(cat => !cat.includes("men") && !cat.includes("women"));

    const capitalizedSexLabel = capitalizeAllWords(sexLabel);
    const capitalizedItemLabel = capitalizeAllWords(itemTypeLabel);

    const sexLink = '/products/' + sexLabel;
    const itemLink = sexLink + '/' + addHyphens(itemTypeLabel);

    return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }} className='mt-3'>
            <BreadcrumbTemplate labels={["Home", capitalizedSexLabel, capitalizedItemLabel]}
                links={['/', sexLink, itemLink]} includeAllLinks={true} />

            <div className={`mt-5 mb-10 ${styles.wrapper}`}>
                <div className='flex flex-row' style={{ gridColumnStart: 1 }}>
                    <PreviewPlaceholders/>

                    <div style={{ height: 500, width: 620, position: 'relative' }}>
                        {product
                            ? <Image
                                src={product.image.source}
                                alt={product.image.description}
                                fill
                            />
                            : <Skeleton height={500} width={620}/>
                        }
                    </div>
                </div>

                {product && img
                    ? <div className='flex flex-col gap-y-3 ms-5' style={{ gridColumnStart: 2 }}>
                        <div style={{ height: 80, width: 80, position: 'relative' }}>
                            <Image
                                src={img}
                                alt={"brand description"}
                                fill
                            />
                        </div>

                        <div className='text-2xl'> {product.name} </div>

                        <div className='flex flex-row align-baseline'>
                            {product.discountedPercent
                            ? <div className='line-through decoration-2 text-lg'>
                                {product.price.toFixed(2)} $
                              </div>
                            : <div className='text-lg'>
                                {product.price.toFixed(2)} $
                            </div>  
                            }

                            {product.discountedPercent &&
                                <div className='flex flex-row ms-2'>
                                    <div className='text-xl text-orange-800'>
                                        {getDiscountedPrice(product.price, product.discountedPercent, 1)} $
                                    </div>
                                </div>
                            }

                            {product.discountedPercent &&
                                <div className='text-base bg-orange-800 py-1 px-2 ms-auto'>
                                    {-product.discountedPercent} %
                                </div>
                            }

                        </div>

                        <div className='mt-10 flex flex-row justify-between items-center'>
                            <CartButton product={product}/>
                            <div className='me-2'>
                                <WishlistButton item={product} initialSelected={inWishlist} />
                            </div>
                        </div>
                    </div>
                : <Skeleton width={400} height={300}/>
                }
            </div>
        </div>
    )

}