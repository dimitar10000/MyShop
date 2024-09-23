import ProductsBox from '@/app/components/products/products-box';
import {fetchProducts} from '@/app/lib/fetch-products';
import { Nullable } from '@/app/lib/definitions';

export default async function ProductsLoader({ categories, sale = false, minPrice, maxPrice }: {
    categories: Nullable<string[]>,
    sale?: Nullable<boolean>,
    minPrice?: number,
    maxPrice?: number
}) {
    const data = await fetchProducts(categories,sale);

    return (
        <ProductsBox productsData={data} minPrice={minPrice} maxPrice={maxPrice}/>
    )
}