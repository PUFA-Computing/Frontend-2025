import CardNormalNewsPage from "@/components/news/CardNormalNewsPage";
import CardSecondaryNewsPage from "@/components/news/CardSecondaryNewsPage";
import Seperator from "@/components/Seperator";
import { SelectSeparator } from "@/components/ui/select";
import React from "react";
import PageHeading from "@/components/PageHeading";
import Image from "next/image";
import { fetchNews } from "@/services/api/news";

export default async function NewsPage() {
    const news = await fetchNews();

    return (
        <div>
            <div
                className="border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700"
                role="alert"
            >
                <p className="font-bold">Under Construction!</p>
                <p>
                    This page is currently under construction. Stay tuned for
                    updates.
                </p>
            </div>
            <PageHeading
                title="Computing News"
                description="The latest news about research, technology, achievements, and campus life."
                borderColor="#FF6F22"
            />

            <section className="flex flex-col space-y-12 px-[2rem] py-[2rem] md:px-[10rem]">
                <h1 className="text-[1.5rem] font-[600]">Latest</h1>
                {/* main big news   */}
                <div className="flex w-full flex-col gap-4 rounded-lg border-2 md:flex-row">
                    <div className="rounded bg-[#000000] md:w-1/2">
                        <Image
                            className="w-full rounded bg-cover bg-center"
                            src="/news/duolingo.png"
                            alt=""
                            width={1080}
                            height={930}
                        />
                    </div>
                    <div className="space-y-10 p-4 md:w-1/2 md:space-y-[5.5rem]">
                        <h1 className="text-[1.5rem] font-[600]">
                            Implementation of Artificial Intelligence in Foreign
                            Language Learning App Duolingo
                        </h1>
                        <h1>
                            In the current area, it is important for us to learn
                            a foreign language which will be useful in the
                            future. Nowadays, learning a foreign language is not
                            as difficult as it was in the previous times.
                        </h1>
                        <div className="flex justify-between">
                            <h1>November 26, 2023</h1>
                            <div className="rounded-xl border border-[#FF6F22] px-2 text-[#FF6F22]">
                                <h1>Informatics</h1>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 2 secondary medium news  */}
                <CardSecondaryNewsPage news={news} />

                <Seperator className="border-[#d0d0d0]" />

                <div className="space-y-12">
                    <h1 className="text-[1.5rem] font-[600]">All News</h1>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <CardNormalNewsPage
                            image="../news/duolingo.png"
                            date="November 26, 2023"
                            major="Informatics"
                            title="Implementation of Artificial Intelligence in Foreign
               Language Learning App Duolingo"
                        />
                        <CardNormalNewsPage
                            image="../news/duolingo.png"
                            date="November 26, 2023"
                            major="Informatics"
                            title="Implementation of Artificial Intelligence in Foreign
               Language Learning App Duolingo"
                        />
                        <CardNormalNewsPage
                            image="../news/duolingo.png"
                            date="November 26, 2023"
                            major="Informatics"
                            title="Implementation of Artificial Intelligence in Foreign
               Language Learning App Duolingo"
                        />
                        <CardNormalNewsPage
                            image="../news/duolingo.png"
                            date="November 26, 2023"
                            major="Informatics"
                            title="Implementation of Artificial Intelligence in Foreign
               Language Learning App Duolingo"
                        />
                        <CardNormalNewsPage
                            image="../news/duolingo.png"
                            date="November 26, 2023"
                            major="Informatics"
                            title="Implementation of Artificial Intelligence in Foreign
               Language Learning App Duolingo"
                        />
                        <CardNormalNewsPage
                            image="../news/duolingo.png"
                            date="November 26, 2023"
                            major="Informatics"
                            title="Implementation of Artificial Intelligence in Foreign
               Language Learning App Duolingo"
                        />
                        <CardNormalNewsPage
                            image="../news/duolingo.png"
                            date="November 26, 2023"
                            major="Informatics"
                            title="Implementation of Artificial Intelligence in Foreign
               Language Learning App Duolingo"
                        />
                        <CardNormalNewsPage
                            image="../news/duolingo.png"
                            date="November 26, 2023"
                            major="Informatics"
                            title="Implementation of Artificial Intelligence in Foreign
               Language Learning App Duolingo"
                        />
                        <CardNormalNewsPage
                            image="../news/duolingo.png"
                            date="November 26, 2023"
                            major="Informatics"
                            title="Implementation of Artificial Intelligence in Foreign
               Language Learning App Duolingo"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
