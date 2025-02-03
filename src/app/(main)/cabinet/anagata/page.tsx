import Image from "next/image";
import React from "react";
import Logo from "@/assets/forcasionlogo.png";
import CardWithImage from "@/components/CardWithImage";
import Link from "next/link";
import TimelineComponent from "@/components/cabinet/TimelineComponent";
import MobileViewPhilosophy from "@/components/cabinet/MobileViewPhilosophy";

export default function Page() {
   return (
      <div className="min-h-screen bg-black text-white">
         {/* Hero Section */}
         <section className="relative h-[60vh] w-full bg-gradient-to-b from-black via-black/95 to-black/90">
            <div className="absolute inset-0">
               <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/20 via-black/50 to-black"></div>
            </div>
            <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4">
               <Image
                  src={Logo}
                  alt="Forcasion Logo"
                  width={220}
                  height={220}
                  className="mb-8 rounded-full border-4 border-[#FFD700] shadow-lg shadow-[#FFD700]/20 transition-transform duration-300 hover:scale-105"
               />
               <h1 className="mb-4 text-5xl font-bold text-[#FFD700] tracking-wide text-center">
                  FORCASION CABINET
               </h1>
               <p className="mb-6 text-2xl italic text-[#FFD700]/90 font-light text-center">
                  "Together We Stand, Together We Succeed"
               </p>
            </div>
         </section>

         {/* Vision & Mission */}
         <section className="bg-black/90 py-20">
            <div className="container mx-auto px-4 max-w-7xl">
               <h2 className="text-4xl md:text-5xl font-bold text-center text-[#FFD700] tracking-wider mb-16">
                  Our Vision & Mission
               </h2>
               <div className="grid gap-10 md:grid-cols-2">
                  <div className="rounded-xl border-2 border-[#FFD700] bg-black/50 p-10 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#FFD700]/10">
                     <h2 className="mb-8 text-3xl font-bold text-[#FFD700] tracking-wide text-center">
                        Vision
                     </h2>
                     <div className="space-y-6">
                        <p className="text-lg leading-relaxed text-white/90 text-center">
                           To create a united, communicative, and
                           competitive faculty where students from all
                           departments actively participate in academic and
                           non-academic activities and are fully supported
                           in achieving their highest potential.
                        </p>
                        <div className="flex justify-center gap-4 pt-4">
                           <span className="inline-flex items-center rounded-full bg-[#FFD700]/10 px-4 py-2 text-sm font-medium text-[#FFD700]">United</span>
                           <span className="inline-flex items-center rounded-full bg-[#FFD700]/10 px-4 py-2 text-sm font-medium text-[#FFD700]">Communicative</span>
                           <span className="inline-flex items-center rounded-full bg-[#FFD700]/10 px-4 py-2 text-sm font-medium text-[#FFD700]">Competitive</span>
                        </div>
                     </div>
                  </div>
                  <div className="rounded-xl border-2 border-[#FFD700] bg-black/50 p-10 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#FFD700]/10">
                     <h2 className="mb-8 text-3xl font-bold text-[#FFD700] tracking-wide text-center">
                        Mission
                     </h2>
                     <div className="space-y-6">
                        <div className="flex items-start space-x-4 group">
                           <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700] text-black font-bold transition-transform group-hover:scale-110">S</span>
                           <div>
                              <h3 className="font-semibold text-[#FFD700] mb-1">Solidify</h3>
                              <p className="text-white/90">Enhance Solidarity and Cohesion Across Departments</p>
                           </div>
                        </div>
                        <div className="flex items-start space-x-4 group">
                           <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700] text-black font-bold transition-transform group-hover:scale-110">C</span>
                           <div>
                              <h3 className="font-semibold text-[#FFD700] mb-1">Communicate</h3>
                              <p className="text-white/90">Improve Effective Communication</p>
                           </div>
                        </div>
                        <div className="flex items-start space-x-4 group">
                           <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700] text-black font-bold transition-transform group-hover:scale-110">O</span>
                           <div>
                              <h3 className="font-semibold text-[#FFD700] mb-1">Organize</h3>
                              <p className="text-white/90">Encourage Participation in Academic and Non-Academic Activities</p>
                           </div>
                        </div>
                        <div className="flex items-start space-x-4 group">
                           <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700] text-black font-bold transition-transform group-hover:scale-110">P</span>
                           <div>
                              <h3 className="font-semibold text-[#FFD700] mb-1">Participate</h3>
                              <p className="text-white/90">Provide Support and Motivation to Students</p>
                           </div>
                        </div>
                        <div className="flex items-start space-x-4 group">
                           <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700] text-black font-bold transition-transform group-hover:scale-110">E</span>
                           <div>
                              <h3 className="font-semibold text-[#FFD700] mb-1">Encourage</h3>
                              <p className="text-white/90">Foster Student Participation and Support Activities</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* division  */}
         <section className="flex flex-col items-center bg-black">
            <h1 className="flex justify-center p-8 text-2xl font-[600] text-[#FFD700] md:p-20 md:text-4xl lg:text-5xl">
               DIVISION
            </h1>

            
            <div className="hidden md:block">
               <div className="flex items-center justify-center gap-12 pb-20">
                  <div className="flex flex-col gap-14 text-right">
                     <Link
                        href="anagata/board-of-director"
                        className="rounded-xl p-2 duration-300 hover:scale-110 hover:shadow-xl"
                     >
                        <div className="flex items-center justify-end gap-2">
                           <h1 className="text-[1.2rem] font-[600] text-[#FFD700]">
                              Board of Director
                           </h1>
                           <div className="h-[20px] w-[20px] rounded-full bg-gradient-to-br from-orange-200 to-orange-400"></div>
                        </div>
                        <p className="capitalize text-[0.9rem] font-light text-[white]">
                           is a representative of the highest division
                           consisting of <br />
                           Chairperson, Vice Chairperson, Secretary and
                           Treasurer.
                        </p>
                     </Link>

                     <Link
                        href="anagata/external-relation"
                        className="relative right-10 rounded-xl p-2 duration-300 hover:scale-110 hover:shadow-xl"
                     >
                        <div className="flex items-center justify-end gap-2">
                           <h1 className="text-[1.2rem] font-[600] text-[#FFD700]">
                              External Relations
                           </h1>
                           <div className="h-[20px] w-[20px] rounded-full bg-gradient-to-br from-green-200 to-green-600"></div>
                        </div>
                        <p className="capitalize text-[0.9rem] font-light text-[white]">
                           This division organize activities or events related
                           <br />
                           to parties outside the campus.
                        </p>
                     </Link>

                     <Link
                        href="anagata/internal-relation"
                        className="relative right-20 rounded-xl p-2 duration-300 hover:scale-110 hover:shadow-xl"
                     >
                        <div className="flex items-center justify-end gap-2">
                           <h1 className="text-[1.2rem] font-[600] text-[#FFD700]">
                              Internal Relations
                           </h1>
                           <div className="h-[20px] w-[20px] rounded-full bg-gradient-to-br from-orange-200 to-orange-400"></div>
                        </div>
                        <p className="capitalize text-[0.9rem] font-light text-[white]">
                           This division has the main task of strengthening the
                           <br />
                           relationship between students and students, students
                           and <br /> lecturers, students and alumni and PUMA -
                           PUFA
                        </p>
                     </Link>

                     <Link
                        href="anagata/art-and-sport"
                        className="relative right-10 rounded-xl p-2 duration-300 hover:scale-110 hover:shadow-xl"
                     >
                        <div className="flex items-center justify-end gap-2">
                           <h1 className="text-[1.2rem] font-[600] text-[#FFD700]">
                              Art and Sport
                           </h1>
                           <div className="h-[20px] w-[20px] rounded-full bg-gradient-to-br from-green-200 to-green-600"></div>
                        </div>
                        <p className="capitalize text-[0.9rem] font-light text-[white]">
                           Division that focuses on developing interest and
                           burning <br /> the arts and sports in the computing
                           sphere.
                        </p>
                     </Link>

                     <Link
                        href="anagata/communication-and-multimedia"
                        className="rounded-xl p-2 duration-300 hover:scale-110 hover:shadow-xl"
                     >
                        <div className="flex items-center justify-end gap-2">
                           <h1 className="text-[1.2rem] font-[600] text-[#FFD700]">
                              Communication and Multimedia
                           </h1>
                           <div className="h-[20px] w-[20px] rounded-full bg-gradient-to-br from-orange-200 to-orange-400"></div>
                        </div>
                        <p className="capitalize text-[0.9rem] font-light text-[white]">
                           Com: Division that handles PUFA Computing social media
                           such <br /> as Instagram, LinkedIn, LINE OA, and
                           youtube. <br/> <br/>
                           Mul: Responsible to in charge of creating and editing{" "}
                           <br />
                           templates content to be posted on social media PUFA{" "}
                        </p>
                     </Link>
                  </div>

                  <Image
                     src="/logo/PUFA_Computing.png"
                     alt="Logo PUFA Computing"
                     width={1920}
                     height={1080}
                     className="h-[250px] w-[250px] rounded-3xl duration-300 hover:scale-110 hover:shadow-xl"
                  />

                  <div className="flex flex-col gap-14 text-left">
                     <Link
                        href="anagata/research-and-technology"
                        className="rounded-xl p-2 duration-300 hover:scale-110 hover:shadow-xl"
                     >
                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                           <h1 className="text-[1.2rem] font-[600] text-[#FFD700]">
                              Research and Technology
                           </h1>
                           <div className="h-[20px] w-[20px] rounded-full bg-gradient-to-br from-orange-200 to-orange-400"></div>
                        </div>
                        <p className="capitalize text-[0.9rem] font-light text-[white]">
                           division in charge of developing creative ideas and
                           sharing <br /> knowledge and sharing knowledge in the
                           field of technology.
                        </p>
                     </Link>

                     <Link
                        href="anagata/student-development-and-competition"
                        className="relative left-10 rounded-xl p-2 duration-300 hover:scale-110 hover:shadow-xl"
                     >
                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                           <h1 className="text-[1.2rem] font-[600] text-[#FFD700]">
                              Student Development and Competition
                           </h1>
                           <div className="h-[20px] w-[20px] rounded-full bg-gradient-to-br from-green-200 to-green-600"></div>
                        </div>
                        <p className="capitalize text-[0.9rem] font-light text-[white]">
                           is a representative of the highest division
                           consisting of <br />
                           Chairperson, Vice Chairperson, Secretary and
                           Treasurer.
                        </p>
                     </Link>

                     <Link
                        href="anagata/student-welfare-advocacy"
                        className="relative left-20 rounded-xl p-2 duration-300 hover:scale-110 hover:shadow-xl"
                     >
                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                           <h1 className="text-[1.2rem] font-[600] text-[#FFD700]">
                              Student Welfare Advocacy
                           </h1>
                           <div className="h-[20px] w-[20px] rounded-full bg-gradient-to-br from-orange-200 to-orange-400"></div>
                        </div>
                        <p className="capitalize text-[0.9rem] font-light text-[white]">
                           Responsible for accommodating aspirations and <br />
                           suggestions, as well as assisting and defending
                           problems <br /> experienced by Computizens.
                        </p>
                     </Link>
                     <Link
                        href="anagata/entrepreneur"
                        className="relative left-10 rounded-xl p-2 duration-300 hover:scale-110 hover:shadow-xl"
                     >
                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                           <h1 className="text-[1.2rem] font-[600] text-[#FFD700]">
                              Entrepreneurship
                           </h1>
                           <div className="h-[20px] w-[20px] rounded-full bg-gradient-to-br from-green-200 to-green-600"></div>
                        </div>
                        <p className="capitalize text-[0.9rem] font-light text-[white]">
                           this division aims to develop computizens interests
                           and <br />
                           talents in entrepreneurship and business.
                        </p>
                     </Link>
                     {/* <Link
                        href="anagata/communication-and-multimedia"
                        className="rounded-xl p-2 duration-300 hover:scale-110 hover:shadow-xl"
                     >
                        <div className="flex flex-row-reverse items-center justify-end gap-2">
                           <h1 className="text-[1.2rem] font-[600] text-[#FFD700]">
                              Multimedia
                           </h1>
                           <div className="h-[20px] w-[20px] rounded-full bg-gradient-to-br from-orange-200 to-orange-400"></div>
                        </div>
                        <p className="capitalize text-[0.9rem] font-light text-[white]">
                           Responsible to in charge of creating and editing{" "}
                           <br />
                           templates content to be posted on social media PUFA{" "}
                           <br />
                           Computing.
                        </p>
                     </Link> */}
                  </div>
               </div>
            </div>
         </section>

         {/* timeline section  */}
         <section className="bg-black">
            <h1 className="flex justify-center p-8 text-2xl font-[600] text-[#FFD700] md:p-20 md:text-4xl lg:text-5xl">
               TIMELINE
            </h1>
            <div className="bg-black text-white">
               <div className="container mx-auto  flex flex-col items-start  md:flex-row">
                  <div className="sticky mt-2 flex w-full flex-col px-8 md:top-36 md:mt-12 lg:w-1/3">
                     <p className="tracking-loose ml-2 uppercase text-yellow-300">
                        Event Timeline
                     </p>
                     <p className="mb-2 text-3xl leading-normal md:text-4xl md:leading-relaxed">
                        Working Process of Fest
                     </p>
                     <p className="mb-4 text-sm text-gray-50 md:text-base">
                        Here’s your guide to the tech fest 2021 process. Go
                        through all the steps to know the exact process of the
                        fest.
                     </p>
                     <Link
                        href="/events"
                        className="mr-auto rounded border border-yellow-300 bg-transparent px-4 py-2 text-yellow-300 shadow hover:border-transparent hover:bg-yellow-300 hover:text-white hover:shadow-lg"
                     >
                        Explore Now
                     </Link>
                  </div>
                  <div className="sticky ml-0 md:ml-12 lg:w-2/3">
                     <div className="container mx-auto h-full w-full">
                        <div className="wrap relative h-full overflow-hidden p-10">
                           <div
                              className="border-2-2 border-yellow-555 absolute h-full border"
                              style={{
                                 right: "50%",
                                 border: "2px solid #FFC100",
                                 borderRadius: "1%",
                              }}
                           ></div>

                           {/* Left Border */}
                           <div
                              className="border-2-2 border-yellow-555 absolute h-full border"
                              style={{
                                 left: "50%",
                                 border: "2px solid #FFC100",
                                 borderRadius: "1%",
                              }}
                           ></div>
                           <div className="left-timeline mb-8 flex w-full flex-row-reverse items-center justify-between">
                              <div className="order-1 w-5/12"></div>
                              <div className="order-1 w-5/12 px-1 py-4 text-right">
                                 <p className="mb-3 text-base text-yellow-300">
                                    November 2023
                                 </p>
                                 <h4 className="mb-3 text-lg font-[600] text-[white] md:text-2xl">
                                    Compbraints
                                 </h4>
                                 <p className="text-sm leading-snug text-gray-50 text-opacity-100 md:text-base">
                                    Pick your favourite event(s) and register in
                                    that event by filling the form corresponding
                                    to that event. Its that easy :
                                 </p>
                              </div>
                           </div>
                           <div className="right-timeline mb-8 flex w-full items-center justify-between">
                              <div className="order-1 w-5/12"></div>
                              <div className="order-1  w-5/12 px-1 py-4 text-left">
                                 <p className="mb-3 text-base text-yellow-300">
                                    December 2023
                                 </p>
                                 <h4 className="mb-3 text-lg font-[600] text-[white] md:text-2xl">
                                    Compshadow I Welcoming
                                 </h4>
                                 <p className="text-sm leading-snug text-gray-50 text-opacity-100 md:text-base">
                                    Participate online. The links for your
                                    registered events will be sent to you via
                                    email and whatsapp groups. Use those links
                                    and show your talent.
                                 </p>
                              </div>
                           </div>
                           <div className="left-timeline mb-8 flex w-full flex-row-reverse items-center justify-between">
                              <div className="order-1 w-5/12"></div>
                              <div className="order-1 w-5/12 px-1 py-4 text-right">
                                 <p className="mb-3 text-base text-yellow-300">
                                    {" "}
                                    February 2024
                                 </p>
                                 <h4 className="mb-3 text-lg font-[600] text-[white] md:text-2xl">
                                    CSGO
                                 </h4>
                                 <p className="text-sm leading-snug text-gray-50 text-opacity-100 md:text-base">
                                    The ultimate genius will be revealed by our
                                    judging panel on 10th May, 2021 and the
                                    resukts will be announced on the whatsapp
                                    groups and will be mailed to you.
                                 </p>
                              </div>
                           </div>

                           <div className="right-timeline mb-8 flex w-full items-center justify-between">
                              <div className="order-1 w-5/12"></div>

                              <div className="order-1  w-5/12 px-1 py-4">
                                 <p className="mb-3 text-base text-yellow-300">
                                    March 2024
                                 </p>
                                 <ul className="list-disc">
                                    <li className="mb-3 text-left  text-lg font-[600] text-[white] md:text-2xl">
                                       Social Project
                                    </li>
                                    <li className="mb-3 text-left  text-lg font-[600] text-[white] md:text-2xl">
                                       Compstud
                                    </li>
                                 </ul>
                                 <p className="text-sm leading-snug text-gray-50 text-opacity-100 md:text-base">
                                    The winners will be contacted by our team
                                    for their addresses and the winning goodies
                                    will be sent at their addresses.
                                 </p>
                              </div>
                           </div>
                        </div>
                        <img
                           className="mx-auto -mt-36 md:-mt-36"
                           src="https://user-images.githubusercontent.com/54521023/116968861-ef21a000-acd2-11eb-95ac-a34b5b490265.png"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}