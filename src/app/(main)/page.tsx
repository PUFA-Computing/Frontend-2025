import Image from "next/image";
import BGImage from "@/assets/backgroundimg.png";
import bghomepage from "@/assets/bghomepage.jpg";
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
import Logo from "@/assets/anagatalogo.svg";
import CompreciationCards from "./_components/CompreciationCards";
import Loading from "@/components/Loading";
import { fetchNews } from "@/services/api/news";

export const revalidate = 600;
export const dynamic = "force-dynamic";

export default async function Index() {
    const news = await fetchNews();
    return (
        <div className="min-h-screen text-[#353535]">
            <div>
                <Image
                    src={BGImage}
                    alt="PUMA Photo"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="h-auto w-full"
                />
            </div>
            <section
                id="introduction"
                className="container mx-auto -mt-24 sm:-mt-32 md:-mt-48 md:px-[5rem] lg:-mt-64 xl:-mt-96"
            >
                <Image
                    alt="PUFA Photo"
                    className="mx-auto my-12 h-48 rounded-2xl object-cover md:h-96"
                    width={1080}
                    height={720}
                    src={bghomepage}
                />
                {/* <img
               className="h-48 mx-auto my-5 aspect-video md:h-96 rounded-2xl"
               src="../member.jpg"
               alt="PUMA Photo"
            /> */}
                <div className="space-y-6 px-8 text-justify text-base md:px-24 md:text-xl">
                    <p>
                        PUFA Computing stands for President University's Faculty
                        Association of Computing, serving as a dynamic platform
                        for students enrolled in diverse majors such as
                        Information Technology (IT), Information Systems (IS),
                        Visual Communication Design (VCD), and Interior Design
                        (ID). Our organization embodies a vibrant community of
                        aspiring professionals, united by a shared passion for
                        technology, creativity, and innovation.
                    </p>
                    <p>
                        We are committed to fostering a collaborative and
                        inclusive environment where members can thrive
                        academically, professionally, and socially. Through a
                        myriad of activities, workshops, seminars, and
                        networking events, we provide our members with
                        opportunities to enhance their skills, expand their
                        knowledge, and forge meaningful connections within their
                        respective fields.
                    </p>
                    <Link href="/" className="block w-max">
                        <Button>See Details</Button>
                    </Link>
                </div>
            </section>

            {/* programs */}
            <section className="my-[10rem] flex flex-col items-center space-y-8 md:px-[5rem]">
                <div className="border-l-4 border-[#3C99DC] pl-4">
                    <h1 className="text-[1.5rem] font-[600]">Study Programs</h1>
                </div>

                <h1 className="text-center">
                    The Faculty of Computing has four study programs that
                    produce qualified student graduates in their fields.
                </h1>

                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    {StudyProgramData.map((StudyProgram, index) => (
                        <div key={index}>
                            <StudyProgCard {...StudyProgram} />
                        </div>
                    ))}
                </div>
            </section>

            {/* cabinet anagata */}
            <section className="my-[10rem] flex flex-col items-center space-y-8 md:px-[5rem]">
                <div className="border-l-4 border-[#1FA820] pl-4">
                    <h1 className="text-[1.5rem] font-bold">
                        Cabinet 2023/2024
                    </h1>
                </div>

                <div className="flex flex-col items-center gap-12 md:flex-row md:gap-8">
                    <Image
                        alt="ANAGATA logo"
                        className="rounded-lg object-cover shadow-xl"
                        height="256"
                        src={Logo}
                        width="256"
                    />

                    <div className="flex max-w-[20rem] flex-col gap-8 rounded-lg border-2 border-[#1FA820] px-8 py-12 md:max-w-[38rem]">
                        <div className="flex items-center gap-4">
                            <h1 className="text-[1.2rem] font-[600]">
                                ANAGATA CABINET
                            </h1>
                            <hr className="h-[2px] w-[20rem] border-[#1FA820]" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="font-[400]">
                                "One Team, One Vision, One for Computing"
                            </h1>
                            <h1>
                                We are attempting to be a bridge for the
                                Computing Faculty in a more positive way by
                                growing together with us.
                            </h1>
                        </div>
                    </div>
                </div>

                <Link href="/cabinet/anagata">
                    <button className="rounded-lg border-2 border-[#1FA820] px-10 py-2 text-[#1FA820] transition-all duration-300 hover:bg-[#1FA820] hover:text-white">
                        See our Cabinet
                    </button>
                </Link>
            </section>

            {/* event section */}
            <section className="flex select-none flex-col items-center space-y-8 md:space-y-8 md:px-[5rem]">
                <div className="border-l-4 border-[#E50D0D] pl-4">
                    <h1 className="text-[1.5rem] font-[600]">
                        Computing Events
                    </h1>
                </div>

                <h1 className="text-center">
                    Discover the latest updates on events in our faculty.
                </h1>

                <EventSection />

                <Link
                    href={"/events"}
                    className="rounded-lg border-2 border-[#E50D0D] px-10 py-2 text-[#E50D0D] transition-all duration-300 hover:bg-[#E50D0D] hover:text-white"
                >
                    See all Events
                </Link>
            </section>

            {/* news */}
            <section
                id="news"
                className="max-h-xl mx-auto max-w-7xl space-y-12 p-5 text-center md:px-[5rem]"
            >
                {/*Coming Soon*/}
                <h2 className="text-2xl font-bold">
                    <span className="mr-4 border-l-4 border-l-[#FF6F22]"></span>
                    News
                </h2>
                <h3 className="">
                    Stay updated with the latest news and announcements.
                </h3>
                <div className="grid grid-cols-1 gap-8 text-justify md:grid-cols-2">
                    <NewsCardBig news={news}/>
                    <NewsCard news={news}/>
                </div>
                <div className="flex items-center justify-center">
                    <Link href="/" className="block w-max">
                        <Button className="border-[#FF6F22] px-10 py-2 text-[#FF6F22] hover:bg-[#FF6F22] hover:text-white">
                            See all News
                        </Button>
                    </Link>
                </div>
            </section>

            {/* compreciacion */}

            <section
                id="compreciacion"
                className="max-h-xl mx-auto my-32 max-w-7xl space-y-8 p-5 text-center"
            >
                <h2 className="text-2xl font-bold">
                    <span className="mr-4 border-l-4 border-l-[#AF95FF]"></span>
                    Compreciation
                </h2>
                <h3 className="">
                    Appreciation to Computizen’s best projects.
                </h3>
                <Suspense fallback={<Loading />}>
                    <CompreciationCards />
                </Suspense>
                <div className="flex items-center justify-center">
                    <Link href="/projects" className="block w-max">
                        <Button className="border-[#AF95FF] px-10 py-2 text-[#AF95FF] hover:bg-[#AF95FF] hover:text-white">
                            See all items
                        </Button>
                    </Link>
                </div>
            </section>

            {/* store */}
            <section className="my-[10rem] flex flex-col items-center space-y-6 md:space-y-12">
                {/*Coming Soon*/}
                <div className="border-l-4 border-[#BA704F] pl-4">
                    <h1 className="text-[1.5rem] font-[600]">Computing Store</h1>
                </div>

                <h1 className="text-center">
                    Get your hands on exclusive Computing merchandise.
                </h1>

                <Link href="/merch">
                    <button className="rounded-lg border-2 border-[#BA704F] px-10 py-2 text-[#BA704F] transition-all duration-300 hover:bg-[#BA704F] hover:text-white">
                        See all Items
                    </button>
                </Link>
            </section>

            {/* Faq */}
            <section
                id="faq"
                className="max-h-xl mx-auto max-w-7xl space-y-8 p-5  md:px-[5rem]"
            >
                <div className="items-justify container mx-auto flex flex-col rounded-lg border border-black bg-white px-4 py-8 md:p-8">
                    <div>
                        <h2 className="text-2xl font-semibold sm:text-4xl">
                            Frequently Asked Questions
                        </h2>
                    </div>
                    <div className="mb-6 mt-8 space-y-4">
                        {FaqData.map((FaqContent, index) => (
                            <div key={index}>
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
