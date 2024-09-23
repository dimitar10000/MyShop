import IndividualProductPage from '@/app/components/products/individual-page/individual-product-page'
import CategoryProductsPage from '@/app/components/products/category-products-page';

export default function Page({params} : {params: {sex: string, category: string}}) {
    
    if(!isNaN(Number(params.category))) {
        return (<IndividualProductPage />)
    }

    return (
        <CategoryProductsPage sex={params.sex} category={params.category} />
    )
}