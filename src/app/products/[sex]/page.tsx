import BreadcrumbTemplate from '@/app/components/breadcrumbs/breadcrumb-template';
import ProductsLoader from '@/app/components/products/products-loader';
import { Suspense } from 'react';
import ProductsSkeleton from '@/app/components/loadings/products-skeleton';
import MenSidebar from '@/app/components/products/sidebar-menus/men-sidebar';
import WomenSidebar from '@/app/components/products/sidebar-menus/women-sidebar';
import { capitalizeAllWords } from '@/app/lib/util-funcs';

export default function Page({params, searchParams} : {params: {sex: string}, searchParams?: {
    minp?: string, maxp?: string}}) {

    const minPrice = Number(searchParams?.minp) || 0;
    const maxPrice = Number(searchParams?.maxp) || 0;
    const capitalizedSexLabel = capitalizeAllWords(params.sex);

    return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }} className='mt-1'>
            <BreadcrumbTemplate labels={["Home", capitalizedSexLabel]}
            links={['/']}/>

            <div className='mt-5'>
                <div className='flex flex-row justify-between'>
                    {params.sex === "men" && <MenSidebar/>}
                    {params.sex === "women" && <WomenSidebar/>}

                    <Suspense fallback={<ProductsSkeleton amount={6}/>}>
                        <ProductsLoader categories={[params.sex]} minPrice={minPrice} maxPrice={maxPrice}/>
                    </Suspense>
                </div>
            </div>

        </div>
    )
}