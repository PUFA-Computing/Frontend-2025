import PageHeading from "@/components/PageHeading";
import NewsCard from "@/components/news/NewsCard";
import { fetchNews, fetchNewsBySlug } from "@/services/api/news";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { CircularProgress } from "@/components/ui/CircularProgress";

interface NewsDetailsPageProps {
    params: { slug: string };
}

export default async function NewsDetailsPage({
    params,
}: NewsDetailsPageProps) {
    if (!params.slug || params.slug.length < 1) {
        return redirect("/404");
    }
    const news = await fetchNewsBySlug(params.slug);
    const moreNews = await fetchNews();

    if (!news) {
        return redirect("/404");
    }

    const createMarkup = (htmlString: string) => {
        return { __html: htmlString };
    };

    return (
        <section>
            <PageHeading
                title="Computing News"
                description="The latest news about research, technology, achievements, and campus life."
                borderColor="black"
            />
            <div className="mx-auto grid max-w-7xl">
                <div className="flex items-center justify-center py-2">
                    <Image
                        className="h-[575px] w-[1103px] rounded-[15px] shadow"
                        src={news.thumbnail}
                        height={1080}
                        width={1920}
                        alt={`${news.title}'s Photo`}
                    />
                </div>

                <div className="flex items-center justify-center py-2">
                    <Suspense fallback={<CircularProgress />}>
                        <div className="w-[1103px]">
                            <h1 className="text-[1.875rem] font-[600] leading-normal text-[#2F2F2F]">
                                {news.title}
                            </h1>
                            <div className="flex flex-col py-2 text-[0.938rem] font-[500] text-[#2F2F2F]">
                                <p>
                                    {news.author}{" "}
                                    <span className="font-black"> | </span>From:{" "}
                                    {news.organization}
                                </p>
                                <p>{news.publish_date.toDateString()}</p>
                            </div>

                            <div className="py-8 text-justify text-[1.25rem] font-[500] text-[#2F2F2F]">
                                {/* Display Quill content as HTML */}
                                <article
                                    className="prose lg:prose-xl"
                                    dangerouslySetInnerHTML={createMarkup(
                                        news.content
                                    )}
                                />
                            </div>
                        </div>
                    </Suspense>
                </div>
                <div className="flex items-center justify-center py-2">
                    <div className="w-[1103px]">
                        <h1 className="py-2 text-[1.25rem] font-[500] text-[#2F2F2F]">
                            More Computing News
                        </h1>
                        <Suspense fallback={<CircularProgress />}>
                            <NewsCard news={moreNews} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </section>
    );
}
