import type { Metadata } from "next";
import MainSwiper from "./components/main-swiper/main-swiper";
import Ads from './components/ads';
import Guarantees from "./components/guarantees";
import { Suspense } from 'react';
import BrandsLoader from '@/app/components/brands-swiper/brands-loader';
import BrandsSkeleton from "./components/loadings/brands-skeleton";

export const metadata: Metadata = {
  title: "Shop home",
  description: "The homepage of the shop",
};

const BRANDS_PER_SLIDE = 6;

export default function Home() {  

  return (
    <main>
      <div className="pt-5">
        <MainSwiper/>
      </div>

      <div className="pt-5">
        <Suspense fallback={<BrandsSkeleton amount={BRANDS_PER_SLIDE}/>}>
          <BrandsLoader brandsPerSlide={BRANDS_PER_SLIDE}/>
        </Suspense>
      </div>

      <div className="pt-5">
        <Ads/>
      </div>

      <div className="pt-1 pb-10">
        <Guarantees/>
      </div>

    </main>
  );
}
