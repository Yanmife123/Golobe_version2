"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper from "swiper";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { SwiperType } from "../dataType/types";

import "swiper/css";
import "swiper/css/autoplay";

export function CardContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={` bg-white shadow-card rounded-[16px] ${className}`}>
      {children}
    </div>
  );
}

// Swiper.([Autoplay]);

export function SwiperDesign({
  classname,
  data,
}: {
  classname?: string;
  data: SwiperType[];
}) {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      speed={800}
      allowTouchMove={false}
      className={`${classname} rounded-[30px]`}
    >
      {data.map((image) => (
        <SwiperSlide key={image.id}>
          <Image
            src={image.src}
            alt={`sliderimg + ${image.id} `}
            height={600}
            width={600}
            className="rounded-[30px] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
