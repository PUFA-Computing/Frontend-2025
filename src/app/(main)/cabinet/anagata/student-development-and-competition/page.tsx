"use client";
import Button from "@/components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import MemberCard from "@/components/cabinet/MemberCard";
import { Pagination } from "swiper/modules";
import { SDCImages } from "@/lib/cabinet";
import Header from "@/components/cabinet/Header";
import EventsAndWorkplan from "@/components/cabinet/EventsAndWorkplan";
import BG from "@/assets/coming_soon.jpg"


const members = [
   {
      name: "Muhammad Yusuf",
      position: "Head of Division",
      image: SDCImages.YUSUF_SDC.src,
      instagram: "http://Instagram.com/muhayuf",
      linkedin: "http://linkedin.com/in/muhayuf",
   },
   {
      name: "Bilqis Nabila Mukhtar",
      position: "Vice of Division",
      image: SDCImages.BILQIS_SDC.src,
      instagram: "http://instagram.com/bilqiss.n",
   },

   {
      name: "Muhammad Arrizky Adhita Azizi",
      position: "Member",
      image: SDCImages.ARRIZKY_SDC.src,
      instagram: "https://instagram.com/arrizkyadhita.a",
      linkedin:
         "https://www.linkedin.com/in/muhammad-firman-hidayat-786561286?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
   },
   {
      name: "Violetta Scarlet Adeline Roeroe",
      position: "Member",
      image: SDCImages.SCARLET_SDC.src,
      instagram: "http://instagram.com/violettaroeroe",
      linkedin: "http://linkedin.com/in/violettascarlet",
   },
   {
      name: "Muhammad Firman Hidayat",
      position: "Member",
      image: SDCImages.FIRMAN_SDC.src,
      instagram: "https://www.instagram.com/frmaanhdyt__",
      linkedin:
         "https://www.linkedin.com/in/muhammad-firman-hidayat-786561286?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
   },
];

const buttons = ["COMPCRUSADER", "COMPSPHERE", "PROJECT APPRECIATION", "COMPUTING NIGHT"];


export default function page() {
   return (
      <section>
         <Header title="Student Development Center" description=" Division that focuses on developing interest and burning the arts and sports in the computing sphere." image={BG.src} />

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
