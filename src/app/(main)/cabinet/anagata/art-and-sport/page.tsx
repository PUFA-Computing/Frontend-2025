"use client";
import Button from "@/components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import MemberCard from "@/components/cabinet/MemberCard";
import { Pagination } from "swiper/modules";
import { ANSImages } from "@/lib/cabinet";
import Header from "@/components/cabinet/Header";
import BG from "@/assets/coming_soon.jpg"
import EventsAndWorkplan from "@/components/cabinet/EventsAndWorkplan";

const members = [
   {
      name: "Marizky Afri Legoarto",
      position: "Head of Division",
      image: ANSImages.MARIZKY_ANS.src,
      instagram: "https://www.instagram.com/marizkyarfi_/",
      linkedin: "",
   },
   {
      name: "Indah Novianti Setyoningrum",
      position: "Vice of Division",
      image: ANSImages.INDAH_ANS.src,
      instagram: "https://www.instagram.com/innovsn_/",
      linkedin:
         "https://www.linkedin.com/in/indah-novianti-setyoningrum-66793a289/",
   },
   {
      name: "George Elver Andrew Tamba",
      position: "Member",
      image: ANSImages.GEORGE_ANS.src,
      instagram: "",
      linkedin: "",
   },
   {
      name: "Bimasena Yudhaprawira",
      position: "Member",
      image: ANSImages.BIMASENA_ANS.src,
      instagram: "",
      linkedin: "https://www.linkedin.com/in/bimasena-yudhaprawira-488719273/",
   },
   {
      name: "Najla Rifa Nur Asjad",
      position: "Member",
      image: ANSImages.NAJLA_ANS.src,
      instagram: "",
      linkedin: "https://www.linkedin.com/in/najlasjad/",
   },
];
const buttons = ["CSGO", "SOPU PREP", "COMPHEALTH", "COMPUTING SOUND"];


export default function page() {
   return (
      <section>
         <Header title=" Art and Sport" description=" Division that focuses on developing interest and burning the arts and sports in the computing sphere." image={BG.src} />

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
