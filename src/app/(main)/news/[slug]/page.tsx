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
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div className="col-span-1 lg:col-span-2">
                    <div className="w-full h-64 md:h-96 lg:h-550 relative">
                            <Image
                                className="rounded-lg shadow-lg object-fit"
                                src={news.thumbnail}
                                layout="fill"
                                alt={`${news.title}'s Photo`}
                            />
                        </div>
                    </div>

                    <div className="col-span-1 py-2 lg:col-span-2">
                        <h1 className="mb-4 text-3xl font-semibold leading-tight text-gray-800 lg:text-4xl">
                            {news.title}
                        </h1>
                        <div className="mb-4 flex flex-col text-sm text-gray-600 lg:text-base">
                            <p>
                                {news.author}{" "}
                                <span className="font-semibold"> | </span>From:{" "}
                                {news.organization}
                            </p>
                            <p>{new Date(news.publish_date).toDateString()}</p>
                        </div>

                        <div className="text-justify text-base text-gray-700 lg:text-lg">
                            {/* Display Quill content as HTML */}
                            <article
                                className="prose lg:prose-xl lg:max-w-none"
                                dangerouslySetInnerHTML={createMarkup(
                                    news.content
                                )}
                            />
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-2">
                        <h1 className="mb-4 text-xl font-semibold text-gray-800 lg:text-2xl">
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
