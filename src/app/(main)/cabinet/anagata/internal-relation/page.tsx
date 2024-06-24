"use client";
import Button from "@/components/Button";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import MemberCard from "@/components/cabinet/MemberCard";
import { Pagination } from "swiper/modules";
import { IRImages } from "@/lib/cabinet";
import Header from "@/components/cabinet/Header";
import EventsAndWorkplan from "@/components/cabinet/EventsAndWorkplan";
import BG from "@/assets/coming_soon.jpg"


const members = [
   {
      name: "Chaesha Fairixa",
      position: "Head of Division",
      image: IRImages.CHAESA_IR.src,
      instagram: "",
      linkedin: "",
   },
   {
      name: "Anissa Intan Rahmawati",
      position: "Vice of Division",
      image: IRImages.CHAESA_IR.src,
      instagram: "",
      linkedin: "https://www.linkedin.com/in/annisa-intan-rahmawati-4b5b81245/",
   },
   {
      name: "Muh. Fakhri Hisyam Bakar",
      position: "Member",
      image: IRImages.CHAESA_IR.src,
      instagram: "",
      linkedin: "",
   },
   {
      name: "Crisceline Abella Ranggen",
      position: "Member",
      image: IRImages.CHAESA_IR.src,
      instagram: "",
      linkedin: "",
   },
   {
      name: "Samuel Christofel Owen",
      position: "Member",
      image: IRImages.CHAESA_IR.src,
      instagram: "",
      linkedin: "",
   },
];

const buttons = ["COMPUTING NIGHT", "COMPSHADOW", "COMPAST", "COMPUTING REGEN","COMPBRAINTS"];


export default function page() {
   return (
      <section>
         <Header title="Internal Relations" description=" Division that focuses on developing interest and burning the arts and sports in the computing sphere." image={BG.src} />

         <EventsAndWorkplan buttons={buttons} />


         {/* member */}
         <div className="bg-[#F2F2F2] px-4 py-4 md:px-[10rem] md:py-[1rem]">
            <h1 className="justify-center py-1 text-center text-[2.25rem] font-[700] text-[#353535] md:flex md:py-[0.125rem]">
               Division Members
            </h1>
            {/* carousel  */}
            <div className="block py-4 md:hidden">
               <Swiper
                  slidesPerView={1}
                  spaceBetween={5}
                  pagination={{
                     clickable: true,
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
               >
                  {members.map((member, index) => (
                     <SwiperSlide key={index}>
                        <MemberCard
                           name={member.name}
                           position={member.position}
                           image={member.image}
                        />
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
            <div className="hidden py-4 md:block">
               <Swiper
                  slidesPerView={4}
                  spaceBetween={5}
                  pagination={{
                     clickable: true,
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
               >
                  {members.map((member, index) => (
                     <SwiperSlide key={index}>
                        <MemberCard
                           name={member.name}
                           position={member.position}
                           image={member.image}
                        />
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         </div>
      </section>
   );
}
