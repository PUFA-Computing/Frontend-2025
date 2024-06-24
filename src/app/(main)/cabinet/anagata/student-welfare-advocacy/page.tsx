"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import MemberCard from "@/components/cabinet/MemberCard";
import { Pagination } from "swiper/modules";
import { SWAImages } from "@/lib/cabinet";
import Header from "@/components/cabinet/Header";
import EventsAndWorkplan from "@/components/cabinet/EventsAndWorkplan";
import BG from "@/assets/coming_soon.jpg"


const members = [
   {
      name: "Deby Ayu Putri Butar-Butar",
      position: "Head of Division",
      image: SWAImages.DEBY_SWA.src,
      instagram: "https://www.instagram.com/de__byy/",
      linkedin: "https://www.linkedin.com/in/debybutar/",
   },
   {
      name: "Muhammad Hanif Insan Rabbani",
      position: "Vice of Division",
      image: SWAImages.HANIF_SWA.src,
      instagram: "",
      linkedin:
         "https://www.linkedin.com/in/muhammad-hanif-insan-rabbani-4b17282b2/",
   },
   {
      name: "Najwa Ratu Aini Alamsyah",
      position: "Member",
      image: SWAImages.NAJWA_SWA.src,
      instagram: "https://www.instagram.com/najwaalamsyah/",
      linkedin: "https://www.linkedin.com/in/najwa-ratu-aini-alamsyah/",
   },
   {
      name: "Hafizh Cexarian",
      position: "Member",
      image: SWAImages.HAFIZH_SWA.src,
      instagram: "",
      linkedin: "https://www.linkedin.com/in/hafizh-cexarian-95a10528b/",
   },
];

const buttons = ["COMPBRAINTS", "ASPIRATION WEEK", "CIC", "COMPAST"];


export default function page() {
   return (
      <section>
         <Header title="Student Welfare Advocacy" description=" Division that focuses on developing interest and burning the arts and sports in the computing sphere." image={BG.src} />

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
