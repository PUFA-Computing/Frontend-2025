"use client";
import Button from "@/components/Button";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import MemberCard from "@/components/cabinet/MemberCard";
import { Pagination } from "swiper/modules";
import { COMMImages } from "@/lib/data";

const members = [
   {
      name: "Annisa Delicia Yansaf",
      position: "Head of Division (Communication)",
      image: COMMImages.YANSAF_COMM.src,
      instagram: "",
      linkedin: "https://www.linkedin.com/in/annisa-yansaf04/",
   },
   {
      name: "Annisa Nirwana Nasution",
      position: "Vice of Division (Multimedia)",
      image: "/member/bod/Bintang Wira Gemilang.png",
      instagram: "",
      linkedin: "",
   },
   {
      name: "Nailah Septiani Putri",
      position: "Member (Communication)",
      image: COMMImages.NAILAH_COMM.src,
      instagram: "https://www.instagram.com/nailahesp/",
      linkedin: "https://www.linkedin.com/in/nailah-septiani-putri-248b2328a/",
   },
   {
      name: "Ricarda Sebastian Hutagalung",
      position: "Member (Communication)",
      image: COMMImages.RICARDA_COMM.src,
      instagram: "",
      linkedin:
         "https://www.linkedin.com/in/ricarda-sebastian-hutagalung-2b503b2b6/",
   },
   {
      name: "Aqeel Fazlemawla Faslah",
      position: "Member (Communication)",
      image: COMMImages.AQEEL_COMM.src,
      instagram: "",
      linkedin:
         "https://www.linkedin.com/in/aqeel-fazlemawla-faslah-bba439288/",
   },
   {
      name: "Ngurah Jaya Deva",
      position: "Member (Multimedia)",
      image: "/member/bod/Bintang Wira Gemilang.png",
      instagram: "",
      linkedin: "https://www.linkedin.com/in/ngurah-jaya-deva-5b401528b/",
   },
   {
      name: "Deswita Ranny",
      position: "Member (Multimedia)",
      image: "/member/bod/Bintang Wira Gemilang.png",
      instagram: "",
      linkedin: "",
   },
   {
      name: "Anak Agung Gede Bagus Krishna M.P",
      position: "Member (Multimedia)",
      image: "/member/bod/Bintang Wira Gemilang.png",
      instagram: "",
      linkedin: "",
   },
   {
      name: "Thomas Alexander",
      position: "Member (Multimedia)",
      image: "/member/bod/Bintang Wira Gemilang.png",
      instagram: "",
      linkedin: "",
   },
   {
      name: "Riswaldy Pakpahan",
      position: "Member (Multimedia)",
      image: "/member/bod/Bintang Wira Gemilang.png",
      instagram: "https://www.instagram.com/riswaldyp/",
      linkedin: "https://www.linkedin.com/in/riswaldy-pakpahan-321b74252/",
   },
];
const buttons = ["SOSIAL MEDIA", "MOMO", "VAL’S DAY", "COMINFO","COMPUTING NIGHT","COMPBRAINST"];


export default function page() {
   return (
      <section>
         <div className="flex flex-col space-y-12 px-4 py-[2rem] md:px-[10rem]">
            {/* text logo nya  */}
            <div className="flex flex-col border-l-4 border-[#1FA820] pl-4 md:pl-8">
               <h1 className="text-[2rem] font-[900] uppercase tracking-widest md:text-[3rem]">
                  Communication and Multimedia
               </h1>
               <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
                  <h1 className="text-[2rem] font-thin uppercase tracking-widest text-stroke-1 text-stroke-black text-stroke-fill-white md:text-[3rem]">
                     Division
                  </h1>
                  <h1 className="text-justify text-[0.8rem] md:max-w-[20rem]">
                     is a representative of the highest division consisting of
                     Chairperson, Vice Chairperson, Secretary, and Treasurer.
                  </h1>
               </div>
            </div>

            {/* gambarnya  */}
            <div className="h-[200px] w-full rounded-lg bg-[#1FA820] md:h-[363px] md:w-[645px]"></div>
         </div>

         <div className="px-4 py-[3rem] md:px-[10rem]">
            <h1 className="text-center font-[700] text-[#353535] md:text-[2.25rem]">
               Events and Workplan
            </h1>
            <div className="mx-auto grid grid-cols-1 gap-4 py-4 md:grid-cols-3 md:gap-10 md:py-[2rem]">
               <Button className="rounded-full border-[#1FA820] text-sm uppercase text-[#1FA820] hover:bg-[#1FA820] md:text-[1.563]">
                  legislator
               </Button>
               <Button className="rounded-full border-[#1FA820] text-sm uppercase text-[#1FA820] hover:bg-[#1FA820] md:text-[1.563]">
                  annual event
               </Button>
               <Button className="rounded-full border-[#1FA820] text-sm uppercase text-[#1FA820] hover:bg-[#1FA820] md:text-[1.563]">
                  review & report
               </Button>
               <Button className="rounded-full border-[#1FA820] text-sm uppercase text-[#1FA820] hover:bg-[#1FA820] md:text-[1.563]">
                  computing cash
               </Button>
            </div>
         </div>

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
