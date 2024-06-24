"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";

interface MissionSectionProps {
    misi: string[];
}

export default function MissionSection({ misi }: MissionSectionProps) {
    return (
        <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            className="mySwiper"
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
        >
            {misi.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className="flex gap-2 text-justify text-[20px] font-[600] text-[#313131] md:col-span-2 lg:col-span-2 xl:col-span-2">
                        <p>{index + 1}.</p>
                        <p>{item}</p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
