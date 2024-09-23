import { capitalizeFirstLetter,getDiscountedPrice } from '@/app/lib/util-funcs';

export default function ProductDetails({brand, price, discount} : {brand: string, price: number, discount: number | null}) {
    const discountedPrice = getDiscountedPrice(price,discount,1);
    let strikeThrough = <div className='line-through decoration-2	decoration-red-500'> {price} </div>;

    function returnCorrectPrice() {
        if(discountedPrice) {
            return (
                <div className='flex flex-row gap-x-2 items-baseline'>
                    {strikeThrough}
                    <div className='text-lg'>{discountedPrice} $ </div>
                </div>
            )
        }
        else {
            return (
                <div className='text-base'>
                    {price} $
                </div>
            )
        }
    }

        return (
            <div className="flex flex-col">
                <div> {capitalizeFirstLetter(brand)} </div>
                {returnCorrectPrice()}
            </div>
        )

}