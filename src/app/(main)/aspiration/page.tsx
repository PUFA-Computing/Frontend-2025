import AspirationCard from "@/components/aspiration/AspirationCard";
import { CiSearch } from "react-icons/ci";
import React from "react";
import AspirationForm from "./_components/Form";
import AspirationsCards from "./_components/Aspirations";
import { Metadata } from "next";

export const revalidate = 600;
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
   title: "Aspirations",
   description:
      "A place for computizens to share their aspirations, ideas, and suggestions with us.",
};

export default function page() {
   return (
      <div>
         {/* // title */}
         <section className="bg-[#F2F2F2] p-6 md:p-10">
            <div className="mx-auto flex max-w-7xl flex-col border-l-4 border-[#E50D0D] pl-2 md:pl-5">
               <h1 className="text-[1.5rem] font-[700] text-[#353535] md:text-[2rem]">
                  Aspirations
               </h1>
               <p className="text-[0.8rem] font-[400] md:text-[0.9rem] ">
                  A place for computizens to share their aspirations, ideas, and
                  suggestions with us.
               </p>
            </div>
         </section>

         {/* aspirations box  */}
         <section
            className="bg-cover bg-center bg-repeat px-4 py-8 md:px-[10rem] md:py-16"
            style={{ backgroundImage: `url('/doodle.svg')` }}
         >
            <AspirationForm />

            <h1 className="mt-20 text-center text-[35px] font-[700] text-[#353535]">
               Aspirations Library
            </h1>
         </section>

         {/* aspirations library */}
         <section className="mb-6 flex flex-col items-center md:mb-10 ">
            <input
               type="text"
               className="absolute w-[60%] translate-y-[-30px] rounded-lg border-2 border-gray-300 p-4 duration-300 hover:scale-110"
               placeholder="Search Aspirations"
            />
            <div className="flex w-full flex-col items-center justify-center rounded-t-3xl border-2 p-8 shadow-lg md:px-16 md:py-16">
               <AspirationsCards />
            </div>
         </section>
      </div>
   );
}
