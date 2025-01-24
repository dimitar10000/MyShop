import IndividualProductPage from '@/app/components/products/individual-page/individual-product-page'
import CategoryProductsPage from '@/app/components/products/category-products-page';

export default async function Page(props: {
    params: Promise<{
        sex: string,
        category: string, page?: string
    }>,
    searchParams?: Promise<{ page?: number }>
}) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const currPage = Number(searchParams?.page) || 1;

    if (!isNaN(Number(params.category))) {
        return (<IndividualProductPage />)
    }

    return (
        <CategoryProductsPage sex={params.sex} category={params.category} currPage={currPage}/>
    )
}