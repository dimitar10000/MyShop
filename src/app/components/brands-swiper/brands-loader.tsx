import {fetchBrands} from '@/app/lib/fetch-brands';
import BrandsSwiper from './brands-swiper';

export default async function BrandsLoader({brandsPerSlide} : {brandsPerSlide: number}) {
    const data = await fetchBrands();

    return (
        <BrandsSwiper data={data} brandsPerSlide={brandsPerSlide}/>
    )
}