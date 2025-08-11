import React, { useRef, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { testimonials } from '../../data/testimonials';

import TestimonialHeader from './TestimonialHeader';
import TestimonialGroup from './TestimonialGroup';
import TestimonialImage from './TestimonialImage';

import 'swiper/css';
import 'swiper/css/pagination';

import { FiChevronLeft } from '@react-icons/all-files/fi/FiChevronLeft';
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';

const Testimonials: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const onSwiperInit = (swiper: SwiperClass) => {
    setSwiperInstance(swiper);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const onSlideChange = (swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section id="testimonials" className="tbg-cyan-400 relative">
      <TestimonialHeader />

      <div className="relative flex items-center">
        <button
          ref={prevRef}
          className="rounded-full bg-orange-500 hover:bg-hover-orange-500 text-white p-2 disabled:cursor-not-allowed disabled:opacity-50
    transition-colors"
          onClick={() => swiperInstance?.slidePrev()}
          disabled={isBeginning}
          aria-label="Previous testimonial"
          type="button"
        >
          <FiChevronLeft size={15} />
        </button>

        <Swiper
          modules={[Pagination, Navigation]}
          onSwiper={onSwiperInit}
          onSlideChange={onSlideChange}
          navigation={false} // Вимикаємо дефолтні кнопки
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 5 },
            640: { slidesPerView: 2, spaceBetween: 5 },
            768: { slidesPerView: 2, spaceBetween: 10 },
            1024: { slidesPerView: 3, spaceBetween: 10 },
          }}
          className="h-[450px]"
        >
          {testimonials.map(({ id, src, alt }) => (
            <SwiperSlide key={id} className="h-full flex justify-center items-center">
              {Array.isArray(src) ? (
                <TestimonialGroup srcList={src} alt={alt} />
              ) : (
                <TestimonialImage src={src} alt={alt} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          ref={nextRef}
          className="rounded-full bg-orange-500 hover:bg-hover-orange-500 text-white p-2 disabled:cursor-not-allowed disabled:opacity-50
    transition-colors"
          onClick={() => swiperInstance?.slideNext()}
          disabled={isEnd}
          aria-label="Next testimonial"
          type="button"
        >
          <FiChevronRight size={15} />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
