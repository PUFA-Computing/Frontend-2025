import CardNormalNewsPage from "@/components/news/CardNormalNewsPage";
import CardSecondaryNewsPage from "@/components/news/CardSecondaryNewsPage";
import Seperator from "@/components/Seperator";
import { SelectSeparator } from "@/components/ui/select";
import React, { Suspense } from "react";
import PageHeading from "@/components/PageHeading";
import Image from "next/image";
import { fetchNews } from "@/services/api/news";
import CardMainNewsPage from "@/components/news/CardMainNewsPage";
import { CircularProgress } from "@/components/ui/CircularProgress";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function NewsPage() {
    const news = await fetchNews();

    return (
        <div>
            {/*<div*/}
            {/*    className="border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700"*/}
            {/*    role="alert"*/}
            {/*>*/}
            {/*    <p className="font-bold">Under Construction!</p>*/}
            {/*    <p>*/}
            {/*        This page is currently under construction. Stay tuned for*/}
            {/*        updates.*/}
            {/*    </p>*/}
            {/*</div>*/}
            <PageHeading
                title="Computing News"
                description="The latest news about research, technology, achievements, and campus life."
                borderColor="#FF6F22"
            />

            <section className="flex flex-col space-y-12 px-[2rem] py-[2rem] md:px-[10rem]">
                <h1 className="text-[1.5rem] font-[600]">Latest</h1>
                {/* main big news   */}
                <Suspense fallback={<CircularProgress />}>
                    <CardMainNewsPage news={news} />
                </Suspense>
                {/* 2 secondary medium news  */}
                <Suspense fallback={<CircularProgress />}>
                    <CardSecondaryNewsPage news={news} />
                </Suspense>

                <Seperator className="border-[#d0d0d0]" />

                <div className="space-y-12">
                    <h1 className="text-[1.5rem] font-[600]">All News</h1>
                    <Suspense fallback={<CircularProgress />}>
                        <CardNormalNewsPage news={news} />
                    </Suspense>
                </div>
            </section>
        </div>
    );
}
