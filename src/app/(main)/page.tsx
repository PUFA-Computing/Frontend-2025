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
            <div>
                <Suspense fallback={<CircularProgress />}>
                    <Image
                        src={BGImage}
                        alt="PUMA Photo"
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="h-auto w-full"
                    />
                </Suspense>
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
                <div className="md:px-22 space-y-6 px-8 text-justify text-base md:text-xl">
                    <p>
                        PUFA Computer Science stands for President University's
                        Faculty Association of Computer Science, serving as a
                        dynamic platform for students enrolled in majors
                        such as Information Technology (IT) and Information Systems
                        (IS). Our organization embodies a vibrant
                        community of aspiring professionals, united by a shared
                        passion for technology and innovation.
                    </p>
                    <p>
                        We are committed to fostering a collaborative and
                        inclusive environment where members can thrive
                        academically, professionally, and socially. Through a
                        myriad of activities, workshops, seminars, and
                        networking events, we provide our members with
                        opportunities to enhance their skills, expand their
                        knowledge, and forge meaningful connections within their
                        respective fields.
                    </p>
                    <Link href="/" className="block w-max">
                        <Button className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                            See Details
                        </Button>
                    </Link>
                </div>
            </section>

            {/* programs */}
            <section className="my-[10rem] flex flex-col items-center space-y-8 md:px-[5rem]">
                <div className="border-l-4 border-[#FFD700] pl-4">
                    <h1 className="text-[1.5rem] font-[600] text-[#FFD700]">
                        Study Programs
                    </h1>
                </div>

                <h1 className="text-center">
                    The Faculty of Computer Science has four study programs that
                    produce qualified student graduates in their fields.
                </h1>

                <div className="grid grid-cols-1 gap-8 md:gap-12 place-items-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 px-4 md:px-8 lg:px-16 w-full max-w-7xl mx-auto">
                    <Suspense fallback={<CircularProgress />}>
                        {StudyProgramData.map((StudyProgram, index) => (
                            <div key={index}>
                                <StudyProgCard {...StudyProgram} />
                            </div>
                        ))}
                    </Suspense>
                </div>
            </section>

            {/* cabinet forcasion */}
            <section className="my-[10rem] flex flex-col items-center space-y-8 md:px-[5rem]">
                <div className="border-l-4 border-[#FFD700] pl-4">
                    <h1 className="text-[1.5rem] font-bold text-[#FFD700]">
                        Cabinet 2024/2025
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

                    <div className="flex max-w-[20rem] flex-col gap-8 rounded-lg border-2 border-[#FFD700] px-8 py-12 md:max-w-[38rem]">
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
                    <button className="rounded-lg border-2 border-[#FFD700] px-10 py-2 text-[#FFD700] transition-all duration-300 hover:bg-[#FFD700] hover:text-black">
                        See our Cabinet
                    </button>
                </Link>
            </section>

            {/* event section */}
            <section className="my-[10rem] flex select-none flex-col items-center space-y-8 md:space-y-8 md:px-[5rem]">
                <div className="border-l-4 border-[#FFD700] pl-4">
                    <h1 className="text-[1.5rem] font-[600] text-[#FFD700]">
                        Computer Science Events
                    </h1>
                </div>

                <h1 className="text-center">
                    Discover the latest updates on events in our faculty.
                </h1>

                <Suspense fallback={<CircularProgress />}>
                    <EventSection />
                </Suspense>

                <Link
                    href={"/events"}
                    className="rounded-lg border-2 border-[#FFD700] px-10 py-2 text-[#FFD700] transition-all duration-300 hover:bg-[#FFD700] hover:text-black"
                >
                    See all Events
                </Link>
            </section>

            {/* news */}
            <section
                id="news"
                className="max-h-xl mx-auto my-[10rem] max-w-7xl space-y-8 p-5 text-center md:px-[5rem]"
            >
                <h2 className="text-2xl font-bold">
                    <span className="mr-4 border-l-4 border-l-[#FFD700]"></span>
                    News
                </h2>
                <h3 className="">
                    Stay updated with the latest news and announcements.
                </h3>
                <div className="grid grid-cols-1 gap-8 text-justify md:grid-cols-2">
                    <Suspense fallback={<CircularProgress />}>
                        <NewsCardBig news={news} />
                    </Suspense>
                    <Suspense fallback={<CircularProgress />}>
                        <NewsCard news={news} />
                    </Suspense>
                </div>
                <div className="flex items-center justify-center">
                    <Link href="/" className="block w-max">
                        <Button className="border-[#FFD700] px-10 py-2 text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                            See all News
                        </Button>
                    </Link>
                </div>
            </section>

            {/* compreciacion */}

            <section
                id="compreciacion"
                className="max-h-xl mx-auto my-[10rem] max-w-7xl space-y-8 p-5 text-center"
            >
                <h2 className="text-2xl font-bold">
                    <span className="mr-4 border-l-4 border-l-[#FFD700]"></span>
                    Compreciation
                </h2>
                <h3 className="">
                    Appreciation to Computizen's best projects.
                </h3>
                <CompreciationCards />
                <div className="flex items-center justify-center">
                    <Link href="/projects" className="block w-max">
                        <Button className="border-[#FFD700] px-10 py-2 text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                            See all items
                        </Button>
                    </Link>
                </div>
            </section>

            {/* store */}
            <section className="my-[10rem] flex flex-col items-center space-y-6 md:space-y-12">
                <div className="border-l-4 border-[#FFD700] pl-4">
                    <h1 className="text-[1.5rem] font-[600] text-[#FFD700]">
                        Computer Science Store
                    </h1>
                </div>

                <h1 className="text-center">
                    Get your hands on exclusive Computer Science merchandise.
                </h1>

                <Link href="/merch">
                    <button className="rounded-lg border-2 border-[#FFD700] px-10 py-2 text-[#FFD700] transition-all duration-300 hover:bg-[#FFD700] hover:text-black">
                        See all Items
                    </button>
                </Link>
            </section>

            {/* Faq */}
            <section
                id="faq"
                className="max-h-xl mx-auto max-w-7xl space-y-8 p-5  md:px-[5rem]"
            >
                <div className="items-justify container mx-auto flex flex-col rounded-lg border border-[#FFD700] bg-black px-4 py-8 md:p-8">
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