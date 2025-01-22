import ProductsBox from '@/app/components/products/products-box';
import { fetchProducts } from '@/app/lib/fetch-products';
import { Nullable } from '@/app/lib/definitions';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default async function ProductsLoader({ categories, sale = false, minPrice, maxPrice }: {
    categories: Nullable<string[]>,
    sale?: Nullable<boolean>,
    minPrice?: number,
    maxPrice?: number
}) {
    const ITEMS_PER_PAGE = 6;
    const data = await fetchProducts(categories, sale);
    const pagesNum = data ? Math.ceil(data.length / ITEMS_PER_PAGE) : 0;

    return (
        <div>
            <ProductsBox productsData={data} minPrice={minPrice} maxPrice={maxPrice} />
            <Stack spacing={2}>
                <Pagination count={pagesNum} variant="outlined" shape="rounded" color="primary" />
            </Stack>
        </div>
    )
}