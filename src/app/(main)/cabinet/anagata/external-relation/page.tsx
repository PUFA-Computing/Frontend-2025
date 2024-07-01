"use client";
import Button from "@/components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import MemberCard from "@/components/cabinet/MemberCard";
import { Pagination } from "swiper/modules";
import { ERImages } from "@/lib/data";
import Header from "@/components/cabinet/Header";
import EventsAndWorkplan from "@/components/cabinet/EventsAndWorkplan";
import BG from "@/assets/coming_soon.jpg"


const members = [
   {
      name: "Dena Dwi Nagita",
      position: "Head of Division",
      image: ERImages.DENA_ER.src,
      instagram: "https://www.instagram.com/dnagitaa/",
      linkedin: "https://www.linkedin.com/in/denadwinagita",
   },
   {
      name: "Dicho Dermawan",
      position: "Vice of Division",
      image: ERImages.DICHO_ER.src,
      instagram: "https://www.instagram.com/dichodermawan_/",
      linkedin: "https://id.linkedin.com/in/dicho-dermawan-b53839286",
   },

   {
      name: "Daffa Athallah Hade",
      position: "Member",
      image: ERImages.DAFFA_ER.src,
      instagram:
         "https://www.instagram.com/daffathd?igsh=ZzNoeGo3Z3h5MmRv&utm_source=qr",
      linkedin: "https://www.linkedin.com/in/daffa-athallah-954425276",
   },
   {
      name: "Nindhita Akmalia Putri",
      position: "Member",
      image: ERImages.NINDHITA_ER.src,
      instagram: "https://www.instagram.com/nindhita.ap/",
      linkedin: "https://id.linkedin.com/in/nindhitaakmalia",
   },
   {
      name: "Reysa Amelia Gehan",
      position: "Member",
      image: ERImages.REYSA_ER.src,
      instagram: "https://www.instagram.com/reysaamlg/",
      linkedin: "https://www.linkedin.com/in/reysa-amelia-gehan-70a038276/",
   },
   {
      name: "Samuel Junio Sambuaga",
      position: "member",
      image: ERImages.SAMUEL_ER.src,
      instagram: "https://www.instagram.com/samuel_js12?igsh=NWxtam51bWVqc203",
      linkedin: "https://www.linkedin.com/in/samuel-junio-sambuaga-a380ba27a/",
   },
];

const buttons = ["COMPUTING CAREER", "SOSIAL PROJECT", "COMPARATIVE STUDY", "EVENT COLLAB"];


export default function page() {
   return (
      <section>
         <Header title="External Relations" description=" Division that focuses on developing interest and burning the arts and sports in the computing sphere." image={BG.src} />

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
                           instagram={member.instagram}
                           linkedin={member.linkedin}
                        />
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         </div>
      </section>
   );
}
