"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import MemberCard from "@/components/cabinet/MemberCard";
import { Pagination } from "swiper/modules";
import { StaticImageData } from "next/image";

interface SwiperCardProps {
    members: {
        name: string;
        position: string;
        image: string | StaticImageData;
        instagram?: string;
        linkedin?: string;
    }[];
}

export default function SwiperCard({ members }: SwiperCardProps) {
    return (
        <div className="bg-[#F2F2F2] px-4 py-4 md:px-[10rem] md:py-[1rem]">
            <h1 className="justify-center py-1 text-center text-[2.25rem] font-[700] text-[#353535] md:flex md:py-[0.125rem]">
                Division Members
            </h1>
            <div className="block py-4 md:hidden">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={5}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {members.map((member, index) => (
                        <SwiperSlide key={index}>
                            <MemberCard
                                name={member.name}
                                position={member.position}
                                image={member.image}
                                instagram={member.instagram}
                                linkedin={member.linkedin}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="hidden py-4 md:block">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={5}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {members.map((member, index) => (
                        <SwiperSlide key={index}>
                            <MemberCard
                                name={member.name}
                                position={member.position}
                                image={member.image}
                                instagram={member.instagram}
                                linkedin={member.linkedin}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
