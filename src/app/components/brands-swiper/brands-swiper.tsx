'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './swiper.module.css'
import Image from 'next/image'
import { Brand } from '@/app/lib/definitions'
import LoadError from '../load-error';

export default function BrandsSwiper({ data, brandsPerSlide }: { data: any, brandsPerSlide: number }) {

    return (
        <>
            <div className='mb-4'
                style={{ marginLeft: "5%" }}>
                <span className='text-4xl font-medium'> Top Brands </span>
            </div>

            {data
                ? (<Swiper modules={[]}
                    slidesPerView={brandsPerSlide}
                    loop={true}
                    className={`${styles['swiper']}`}>

                    {data.map((brand: Brand) => {
                        const imgLink = brand.image;

                        return (
                            <SwiperSlide key={brand.name} className={`${styles['swiper-slide']}`}>
                                <Image src={imgLink!}
                                    alt={brand.name}
                                    width={80}
                                    height={80}
                                />
                                <div> {brand.name}</div>
                            </SwiperSlide>)
                    })}
                </Swiper>)
                : <div className='flex flex-row justify-center'> <LoadError resource={'brands'} /> </div>
            }
        </>
    );
};
