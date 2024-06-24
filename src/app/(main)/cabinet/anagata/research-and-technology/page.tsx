"use client";
import Button from "@/components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import MemberCard from "@/components/cabinet/MemberCard";
import { Pagination } from "swiper/modules";
import { RNTImages } from "@/lib/cabinet";
import Header from "@/components/cabinet/Header";
import EventsAndWorkplan from "@/components/cabinet/EventsAndWorkplan";
import BG from "@/assets/coming_soon.jpg"


const members = [
   {
      name: "Muhammad Ilham Pratama",
      position: "Head of Division",
      image: RNTImages.ILHAM_RNT.src,
      instagram: "http://Instagram.com/ilhamajha15",
      linkedin: "http://linkedin.com/in/muhammadilhampratama0809",
   },
   {
      name: "Devita Annisa",
      position: "Vice of Division",
      image: RNTImages.DEVITA_RNT.src,
      instagram: "https://www.instagram.com/devitaann_",
      linkedin: "https://www.linkedin.com/in/devita-annisa",
   },

   {
      name: "Muhammad Aldi Apriansyah",
      position: "Research",
      image: RNTImages.ALDI_RNT.src,
      instagram: "https://www.instagram.com/aldiaprnsyh._/",
      linkedin: "linkedin.com",
   },
   {
      name: "Adelia Zhafira Puspasari",
      position: "Research",
      image: RNTImages.ADELIA_RNT.src,
      instagram: "https://www.instagram.com/adeliazzh/",
      linkedin:
         "https://www.linkedin.com/in/adelia-zhafira-puspasari-55a26428b/",
   },
   {
      name: "Alden Sayidina Radjab",
      position: "Web Development",
      image: RNTImages.ALDEN_RNT.src,
      instagram: "https://www.instagram.com/aldensydnr/",
      linkedin: "https://www.linkedin.com/in/aldensayidina/",
   },
   {
      name: "Rafael Josh Isaac",
      position: "Web Development",
      image: RNTImages.JOSH_RNT.src,
      instagram: "instagram.com",
      linkedin: "linkedin.com",
   },
   {
      name: "Yudhistira Fauzy Achmadarel",
      position: "Web Development",
      image: RNTImages.YUDHISTIRA_RNT.src,
      instagram: "https://www.instagram.com/yueluels/",
      linkedin: "https://www.linkedin.com/in/yudhistira-fauzy-achmadarel/",
   },
   {
      name: "Irfan Saifullah AL Fakih",
      position: "Web Development",
      image: "/member/rnt/irfan-saf.jpg",
      instagram: RNTImages.IRFAN_RNT.src,
      linkedin: "https://www.linkedin.com/in/irfansaf/",
   },
   {
      name: "Muhammad Alief Firmanda",
      position: "Web Development",
      image: RNTImages.ALIEF_RNT.src,
      instagram: "https://www.instagram.com/alieffirmanda/",
      linkedin: "https://www.linkedin.com/in/muhammad-alief-firmanda/",
   },
];

const buttons = ["COMINFO", "MINI ARTICLE", "FUNFACT", "COMPUTING CAREER","COMPSPHERE", "WEB DEVELOPMENT"];


export default function page() {
   return (
      <section>
         <Header title="Research and Development" description=" Division that focuses on developing interest and burning the arts and sports in the computing sphere." image={BG.src} />

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
