import ProductsBox from '@/app/components/products/products-box';
import { fetchProducts } from '@/app/lib/fetch-products';
import { Nullable } from '@/app/lib/definitions';
import Pagination from './pagination';

export default async function ProductsLoader({ categories, sale = false,
    minPrice, maxPrice, currPage }: {
        categories: Nullable<string[]>, sale?: Nullable<boolean>,
        minPrice?: number, maxPrice?: number, currPage: number
    }) {
    const ITEMS_PER_PAGE = 6;
    const data = await fetchProducts(categories, sale);
    const pagesNum = data ? Math.ceil(data.length / ITEMS_PER_PAGE) : 0;

    return (
        <div>
            <ProductsBox productsData={data} minPrice={minPrice} maxPrice={maxPrice}
            currPage={currPage} itemsPerPage={ITEMS_PER_PAGE}/>
            <div className='mb-5'>
                <Pagination pagesNum={pagesNum} />
            </div>
        </div>
    )
}