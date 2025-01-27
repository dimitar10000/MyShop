/* eslint-disable react/react-in-jsx-scope */
import BreadcrumbTemplate from '@/app/components/breadcrumbs/breadcrumb-template';
import {getProductsByQuery,getBrandsByQuery,getCategoriesByQuery} from '@/app/lib/search-queries';
import SearchProductBox from '@/app/components/search/search-product-box';
import {fetchBrands} from '@/app/lib/fetch-brands';
import SearchBrandsBox from '@/app/components/search/search-brands-box';
import LoadError from '@/app/components/load-error';
import Link from 'next/link';
import {addHyphens} from '@/app/lib/util-funcs';

export default async function Page(props: {searchParams?: Promise<{query?: string}>}) {
    const searchParams = await props.searchParams;
    const products = await getProductsByQuery(searchParams?.query);
    const brands = await fetchBrands();
    const filteredBrands = await getBrandsByQuery(searchParams?.query);
    const categories = await getCategoriesByQuery(searchParams?.query);

    return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }} className='mt-1'>
            <BreadcrumbTemplate labels={["Home", 'Search']} links={['/']}/>

            <div className='text-2xl mt-5 mb-5 ms-5'> Search results for &quot;{searchParams?.query}&quot;: </div>

            <div className='mb-10'>
                {products && brands &&
                <div className='mb-5'>
                    <div className='text-xl ms-5 mb-2'> Products ({products.length})</div>
                    <SearchProductBox productsData={products} brands={brands}/>
                </div>
                }
                {(products === null || brands === null) &&
                    <LoadError resource='products'/>
                }

                {categories &&
                <div className='mb-5'>
                    <div className='text-xl ms-5'> Categories ({categories.length})</div>
                    <div className='ms-5 flex flex-col'>
                        {categories.map((cat) => {
                            let sex, item, itemHyphens;
                            if(Array.isArray(cat)) {
                                sex = ['men', 'women'].includes(cat[0]) ? cat[0] : cat[1];
                                item = ['men', 'women'].includes(cat[0]) ? cat[1] : cat[0];
                                itemHyphens = addHyphens(item);
                            }

                            return (
                                <div key={
                                    typeof cat === 'string'
                                    ? cat
                                    : cat[0] + cat[1]
                                }>
                                    {typeof cat === 'string'
                                    ? <Link href={'/products/' + cat}>
                                        {cat}
                                    </Link>
                                    : <Link href={'/products/' + sex + '/' + itemHyphens}>
                                        {sex + ' ' + item}
                                    </Link>
                                    }
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                }
                {categories === null &&
                    <LoadError resource='categories'/>
                }
                
                {filteredBrands &&
                <div>
                    <div className='text-xl ms-5 mb-2'> Brands ({filteredBrands.length}) </div>
                    <SearchBrandsBox brands={filteredBrands} />
                </div>
                }
                {filteredBrands === null &&
                    <LoadError resource='brands'/>
                }

            </div>

        </div>
    )
}