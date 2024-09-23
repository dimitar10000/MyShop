import BreadcrumbTemplate from '@/app/components/breadcrumbs/breadcrumb-template';
import ProductsLoader from '@/app/components/products/products-loader';
import { Suspense } from 'react';
import ProductsSkeleton from '@/app/components/loadings/products-skeleton';
import MenSidebar from '@/app/components/products/sidebar-menus/men-sidebar';
import WomenSidebar from '@/app/components/products/sidebar-menus/women-sidebar';
import { capitalizeAllWords,removeHyphens } from '@/app/lib/util-funcs';

export default function CategoryProductsPage({sex, category} : {sex: string, category: string}) {
    console.log(sex, category);

    const properCategory = removeHyphens(category);

    const capitalizedSexLabel = capitalizeAllWords(sex);
    const capitalizedItemLabel = capitalizeAllWords(properCategory);

    const sexLink = '/products/' + sex;

    return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }} className='mt-1'>
            <BreadcrumbTemplate labels={["Home", capitalizedSexLabel, capitalizedItemLabel]}
            links={['/', sexLink]}/>

            <div className='mt-5'>
                <div className='flex flex-row justify-between'>
                    {sex === "men" && <MenSidebar/>}
                    {sex === "women" && <WomenSidebar/>}

                    <Suspense fallback={<ProductsSkeleton amount={6}/>}>
                        {category === 'sale'
                        ? <ProductsLoader categories={[sex]} sale={true}/>
                        : <ProductsLoader categories={[sex,properCategory]}/>
                        }
                    </Suspense>
                </div>
            </div>

        </div>
    )
}