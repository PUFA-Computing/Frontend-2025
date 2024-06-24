"use client";
import Button from "@/components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import MemberCard from "@/components/cabinet/MemberCard";
import { Pagination } from "swiper/modules";
import { ERImages } from "@/lib/cabinet";

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

export default function page() {
   return (
      <section>
         <div className="flex flex-col space-y-12 px-4 py-[2rem] md:px-[10rem]">
            {/* text logo nya  */}
            <div className="flex flex-col border-l-4 border-[#1FA820] pl-4 md:pl-8">
               <h1 className="text-[2rem] font-[800] uppercase tracking-widest md:text-[3rem]">
                  External Relations
               </h1>
               <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
                  <h1 className="text-[3rem] uppercase tracking-widest text-stroke-1 text-stroke-black text-stroke-fill-white md:text-[3rem]">
                     Division
                  </h1>
                  <h1 className="text-justify text-[0.8rem] md:max-w-[20rem]">
                     This division organize activities or events related to
                     parties outside the campus.
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
                  Computing Career
               </Button>
               <Button className="rounded-full border-[#1FA820] text-sm uppercase text-[#1FA820] hover:bg-[#1FA820] md:text-[1.563]">
                  Social Project
               </Button>
               <Button className="rounded-full border-[#1FA820] text-sm uppercase text-[#1FA820] hover:bg-[#1FA820] md:text-[1.563]">
                  Comparative Study
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
