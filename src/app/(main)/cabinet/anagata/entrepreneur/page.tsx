"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import MemberCard from "@/components/cabinet/MemberCard";
import { Pagination } from "swiper/modules";
import { ENTREImages } from "@/lib/cabinet";
import Header from "@/components/cabinet/Header";
import EventsAndWorkplan from "@/components/cabinet/EventsAndWorkplan";
import BG from "@/assets/coming_soon.jpg"


const members = [
   {
      name: "Mohammad Lukyanto",
      position: "Head of Division",
      image: "",
      instagram: "https://www.instagram.com/kikya_lky/",
      linkedin: "https://www.linkedin.com/in/mohammad-lukyanto-28978b292/",
   },
   {
      name: "Gavin Abhinaya",
      position: "Vice of Division",
      image: ENTREImages.GAVIN_ENTRE.src,
      instagram: "https://www.instagram.com/gavin_abhinaya/",
      linkedin: "https://www.linkedin.com/in/gavin-abhinaya-15276524b/",
   },
   {
      name: "Angel Kusuma Ajinata",
      position: "Member",
      image: ENTREImages.ANGEL_ENTRE.src,
      instagram: "https://www.instagram.com/na.taa__/",
      linkedin: "https://www.linkedin.com/in/angel-kusuma-ajinata-86001028b/",
   },
   {
      name: "Belva Tabitha",
      position: "Member",
      image: ENTREImages.BELVA_ENTRE.src,
      instagram: "https://www.instagram.com/zheaazee/",
      linkedin: "https://www.linkedin.com/in/belva-tabitha-b5132028b/",
   },
];

const buttons = ["legislator", "annual event", "review & report", "computing cash"];


export default function page() {
   return (
      <section>
         <Header title="Entreprenuer" description=" is a representative of the highest division consisting of Chairperson, Vice Chairperson, Secretary, and Treasurer." image={BG.src} />
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
