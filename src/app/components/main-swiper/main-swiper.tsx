'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './swiper.module.css'
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image'

export default function MainSwiper() {

  const slides = [1, 2, 3];

  return (
    <Swiper pagination={true} navigation={true} modules={[Pagination, Navigation, Autoplay]}
      slidesPerView={1}
      loop={true}
      speed={1000}
      autoplay={{delay: 10000, pauseOnMouseEnter: true}}
      className={`${styles['swiper']}`}>

      {slides.map((slideNum) => {
        const imgLink = "https://placehold.co/500x180/000000/FFFFFF/png?text=Slide+" + slideNum;

        return (
          <SwiperSlide key={imgLink} className={`${styles['swiper-slide']}`}>
            <Image src={imgLink}
              alt={"placeholder image for the sliders"}
              width={500}
              height={180}
              className={`${styles['swiper-slide img']}`}
            />
          </SwiperSlide>)
      })}
    </Swiper>
  );
};
