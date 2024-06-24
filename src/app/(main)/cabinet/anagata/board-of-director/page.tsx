"use client";
import Button from "@/components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import MemberCard from "@/components/cabinet/MemberCard";
import { Pagination } from "swiper/modules";
import { BODImages } from "@/lib/cabinet";
import Header from "@/components/cabinet/Header";
import BG from "@/assets/coming_soon.jpg"
import EventsAndWorkplan from "@/components/cabinet/EventsAndWorkplan";

const members = [
   {
      name: "Aura Shafarina Salsabila",
      position: "Chairperson",
      image: BODImages.AURA_BOD.src,
      instagram: "https://www.instagram.com/aura.shasal/",
      linkedin: "",
   },
   {
      name: "Bintang Wira Gemilang",
      position: "Vice Chairperson 1",
      image: BODImages.BINTANG_BOD.src,
      instagram: "https://www.instagram.com/bin____tang/",
      linkedin: "https://www.linkedin.com/in/bintang-wira-gemilang/",
   },

   {
      name: "Zioneza Auxiliadora Lou Jeronimo Martins",
      position: "Vice Chairperson 2",
      image: BODImages.ZIONEZA_BOD.src,
      instagram: "https://www.instagram.com/zioneza.jm/",
      linkedin:
         "https://www.linkedin.com/in/zioneza-auxiliadora-lou-jeronimo-martins-b23ab9281/",
   },
   {
      name: "Irene Putri Sihite",
      position: "Secretary 1",
      image: BODImages.IRENE_BOD.src,
      instagram: "https://www.instagram.com/irnesht/",
      linkedin: "https://www.linkedin.com/in/irene-putri-sihite-0a45a8258/",
   },
   {
      name: "Gita Olfa Hidayah",
      position: "Secretary 2",
      image: BODImages.GITA_BOD.src,
      instagram: "https://www.instagram.com/gitaaolfaa_/",
      linkedin: "https://www.linkedin.com/in/gita-olfa-hidayah-1ba01328b/",
   },
   {
      name: "Gabriela Imanuel Setiawan",
      position: "Secretary 3",
      image: BODImages.GABRIELA_BOD.src,
      instagram: "https://www.instagram.com/gabrielaimanuels/",
      linkedin:
         "https://www.linkedin.com/in/gabriela-imanuel-setiawan-9191b2283/",
   },
   {
      name: "Alexandra Verencia Poluakan",
      position: "Treasure 1",
      image: BODImages.ALEX_BOD.src,
      instagram: "https://www.instagram.com/alexandraverencia/",
      linkedin: "https://www.linkedin.com/in/alexandra-verencia/",
   },
   {
      name: "Dian Vania Jessicha Rondonuwu",
      position: "Treasure 2",
      image: BODImages.DIAN_BOD.src,
      instagram: "",
      linkedin: "",
   },
   {
      name: "Dinda Ayu Maulina",
      position: "Treasure 3",
      image: BODImages.DINDA_BOD.src,
      instagram: "https://www.instagram.com/dindaaalina/",
      linkedin: "https://www.linkedin.com/in/dinda-ayu-maulina-20328926a/",
   },
];

const buttons = ["legislator", "annual event", "review & report", "computing cash"];

export default function page() {
   return (
      <section>
         <Header title="Board of Director" description="is a representative of the highest division consisting of Chairperson, Vice Chairperson, Secretary, and Treasurer." image={BG.src} />

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
