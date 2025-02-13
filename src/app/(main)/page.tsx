import { useEffect } from "react";
import Image from "next/image";
import BGImage from "@/assets/backgroundimg.svg";
import bghomepage from "@/assets/newbghomepage.jpg";
import Link from "next/link";
import Button from "@/components/Button";
import Faq from "@/components/main/Faq";
import NewsCard from "@/components/news/NewsCard";
import NewsCardBig from "@/components/news/NewsCardBig";
import StudyProgCard from "@/components/main/StudyProgCard";
import CardStore from "@/components/store/CardStore";
import EventSection from "@/components/event/EventSection";
import { Suspense } from "react";
import { FaqData, StudyProgramData } from "@/lib/data";
import Logo from "@/assets/forcasionlogo.png";
import CompreciationCards from "./_components/CompreciationCards";
import { fetchNews } from "@/services/api/news";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const revalidate = 600;
export const dynamic = "force-dynamic";

export default async function Index() {
    const news = await fetchNews();

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div 
                className="relative h-screen"
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={bghomepage}
                        alt="PUFA Background"
                        fill
                        className="object-cover brightness-[0.4]"
                        priority
                    />
                </div>
                
                {/* Content Overlay */}
                <div 
                    className="relative z-10 flex h-full flex-col items-center justify-center text-white"
                >
                    <h1 
                        className="mb-2 text-center text-[120px] font-bold tracking-wider"
                    >
                        PUFA 25.
                    </h1>
                    <p 
                        className="mb-12 text-center text-2xl font-medium tracking-widest"
                    >
                        Be Strong, One Determination.
                    </p>
                    
                    <div 
                        className="mt-4 max-w-4xl px-4 text-center"
                    >
                        <p className="text-lg font-light leading-relaxed tracking-wide">
                            PUFA Computing is a dynamic organization within President University, serving as a platform for students pursuing various
                            computing-related fields like Information Technology, Information Systems, Visual Communication Design, and Interior
                            Design. It fosters a vibrant community where students can connect, collaborate, and explore their passion for technology,
                            creativity, and innovation. PUFA Computing offers opportunities for professional development, networking, and social
                            engagement, making it a valuable resource for students aspiring to excel in the computing industry.
                        </p>
                    </div>
                </div>
            </div>
            
            {/* programs */}
            <section 
                className="my-[10rem] flex flex-col items-center space-y-8 md:px-[5rem] bg-black/50 backdrop-blur-sm"
            >
                <div 
                    className="border-l-4 border-[#FFD700] pl-4"
                >
                    <h1 className="text-[1.5rem] font-[600] text-[#FFD700]">
                        Study Programs
                    </h1>
                </div>

                <h1 
                    className="text-center"
                >
                    The Faculty of Computer Science has four study programs that
                    produce qualified student graduates in their fields.
                </h1>

                <div className="grid grid-cols-1 gap-8 md:gap-12 place-items-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 px-4 md:px-8 lg:px-16 w-full max-w-7xl mx-auto">
                    <Suspense fallback={<CircularProgress />}>
                        {StudyProgramData.map((StudyProgram, index) => (
                            <div 
                                key={index}
                            >
                                <StudyProgCard {...StudyProgram} />
                            </div>
                        ))}
                    </Suspense>
                </div>
            </section>

            {/* cabinet forcasion */}
            <section 
                className="my-[10rem] flex flex-col items-center space-y-8 md:px-[5rem] bg-black/50 backdrop-blur-sm"
            >
                <div 
                    className="border-l-4 border-[#FFD700] pl-4"
                >
                    <h1 className="text-[1.5rem] font-bold text-[#FFD700]">
                        Cabinet 2024/2025
                    </h1>
                </div>

                <div className="flex flex-col items-center gap-12 md:flex-row md:gap-8">
                    <div>
                        <Image
                            alt="ANAGATA logo"
                            className="rounded-lg object-cover shadow-xl"
                            height="256"
                            src={Logo}
                            width="256"
                        />
                    </div>

                    <div 
                        className="flex max-w-[20rem] flex-col gap-8 rounded-lg border-2 border-[#FFD700] px-8 py-12 md:max-w-[38rem]"
                    >
                        <div className="flex items-center gap-4">
                            <h1 className="text-[1.2rem] font-[600]">
                                FORCASION CABINET
                            </h1>
                            <hr className="h-[2px] w-[20rem] border-[#FFD700]" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="font-[400]">
                                "Together We Stand, Together We Succeed"
                            </h1>
                            <h1>
                                To create a united, communicative, and
                                competitive faculty where students from all
                                departments actively participate in academic and
                                non-academic activities and are fully supported
                                in achieving their highest potential.
                            </h1>
                        </div>
                    </div>
                </div>

                <Link href="/cabinet/anagata">
                    <button 
                        className="rounded-lg border-2 border-[#FFD700] px-10 py-2 text-[#FFD700] transition-all duration-300 hover:bg-[#FFD700] hover:text-black"
                    >
                        See our Cabinet
                    </button>
                </Link>
            </section>

            {/* event section */}
            <section 
                className="my-[10rem] flex select-none flex-col items-center space-y-8 md:space-y-8 md:px-[5rem] bg-black/50 backdrop-blur-sm"
            >
                <div 
                    className="border-l-4 border-[#FFD700] pl-4"
                >
                    <h1 className="text-[1.5rem] font-[600] text-[#FFD700]">
                        Computer Science Events
                    </h1>
                </div>

                <h1 
                    className="text-center"
                >
                    Discover the latest updates on events in our faculty.
                </h1>

                <Suspense fallback={<CircularProgress />}>
                    <EventSection />
                </Suspense>

                <Link
                    href={"/events"}
                    className="rounded-lg border-2 border-[#FFD700] px-10 py-2 text-[#FFD700] transition-all duration-300 hover:bg-[#FFD700] hover:text-black"
                >
                    <button >
                        See all Events
                    </button>
                </Link>
            </section>

            {/* news */}
            <section 
                id="news"
                className="max-h-xl mx-auto my-[10rem] max-w-7xl space-y-8 p-5 text-center md:px-[5rem] bg-black/50 backdrop-blur-sm"
            >
                <h2 
                    className="text-2xl font-bold"
                >
                    <span className="mr-4 border-l-4 border-l-[#FFD700]"></span>
                    News
                </h2>
                <h3 >
                    Stay updated with the latest news and announcements.
                </h3>
                <div className="grid grid-cols-1 gap-8 text-justify md:grid-cols-2">
                    <Suspense fallback={<CircularProgress />}>
                        <NewsCardBig 
                            news={news} 
                        />
                    </Suspense>
                    <Suspense fallback={<CircularProgress />}>
                        <NewsCard 
                            news={news} 
                        />
                    </Suspense>
                </div>
                <div className="flex items-center justify-center">
                    <Link href="/" className="block w-max">
                        <Button 
                            className="border-[#FFD700] px-10 py-2 text-[#FFD700] hover:bg-[#FFD700] hover:text-black"
                        >
                            See all News
                        </Button>
                    </Link>
                </div>
            </section>

            {/* compreciacion */}

            <section 
                id="compreciation"
                className="max-h-xl mx-auto my-[10rem] max-w-7xl space-y-8 p-5 text-center bg-black/50 backdrop-blur-sm"
            >
                <h2 
                    className="text-2xl font-bold"
                >
                    <span className="mr-4 border-l-4 border-l-[#FFD700]"></span>
                    Compreciation
                </h2>
                <h3 >
                    Appreciation to Computizen's best projects.
                </h3>
                <CompreciationCards />
                <div className="flex items-center justify-center">
                    <Link href="/projects" className="block w-max">
                        <Button 
                            className="border-[#FFD700] px-10 py-2 text-[#FFD700] hover:bg-[#FFD700] hover:text-black"
                        >
                            See all items
                        </Button>
                    </Link>
                </div>
            </section>

            {/* store */}
            <section 
                className="my-[10rem] flex flex-col items-center space-y-6 md:space-y-12 bg-black/50 backdrop-blur-sm"
            >
                <div 
                    className="border-l-4 border-[#FFD700] pl-4"
                >
                    <h1 className="text-[1.5rem] font-[600] text-[#FFD700]">
                        Computer Science Store
                    </h1>
                </div>

                <h1 
                    className="text-center"
                >
                    Get your hands on exclusive Computer Science merchandise.
                </h1>

                <Link href="/merch">
                    <button 
                        className="rounded-lg border-2 border-[#FFD700] px-10 py-2 text-[#FFD700] transition-all duration-300 hover:bg-[#FFD700] hover:text-black"
                    >
                        See all Items
                    </button>
                </Link>
            </section>

            {/* Faq */}
            <section 
                id="faq"
                className="max-h-xl mx-auto max-w-7xl space-y-8 p-5 md:px-[5rem] bg-black/50 backdrop-blur-sm"
            >
                <div 
                    className="items-justify container mx-auto flex flex-col rounded-lg border border-[#FFD700] bg-black/80 px-4 py-8 md:p-8"
                >
                    <div>
                        <h2 
                            className="text-2xl font-semibold sm:text-4xl"
                        >
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <div className="mb-6 mt-8 space-y-4">
                        {FaqData.map((FaqContent, index) => (
                            <div 
                                key={index}
                            >
                                <Faq {...FaqContent} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* end */}
        </div>
    );
}
             