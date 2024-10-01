'use client';

import { ComponentProps, Key, ReactNode } from 'react';

import { faArrowLeft, faArrowRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/css';

export type SliderProps<T> = {
  data?: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor?: (item: T, index: number) => Key;
} & ComponentProps<typeof Swiper>;

export function Slider<T>({
  data,
  renderItem,
  keyExtractor,
  ...swiperProps
}: SliderProps<T>) {
  if (!data?.length) {
    return null;
  }

  return (
    <Swiper wrapperClass="items-center" {...swiperProps}>
      {data.map((item, index) => (
        <SwiperSlide key={keyExtractor?.(item, index) ?? index}>
          {renderItem(item, index)}
        </SwiperSlide>
      ))}
      <SlideNavButton direction="prev" />
      <SlideNavButton direction="next" />
    </Swiper>
  );
}

function SlideNavButton({ direction }: { direction: 'next' | 'prev' }) {
  const isPrev = direction === 'prev';

  const swiperRef = useSwiper();

  function handleClick() {
    if (isPrev) {
      swiperRef.slidePrev();
    } else {
      swiperRef.slideNext();
    }
  }

  return (
    <button
      className={clsx(
        'absolute top-1/2 -mt-1/2 z-10 bg-slate-300 hover:bg-slate-400 active:bg-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500 rounded-md p-1',
        isPrev ? 'left-0' : 'right-0',
      )}
      onClick={handleClick}>
      <FontAwesomeIcon icon={isPrev ? faArrowLeft : faArrowRight} size="xl" />
    </button>
  );
}
