import News from "@/models/news";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CardMainNewsPage({ news }: { news: News[] }) {
    const truncateDescription = (description: string, maxLength: number) => {
        if (description.length <= maxLength) {
            return description;
        }
        return description.substring(0, maxLength) + "...";
    };

    // Remove html
    const createMarkup = (htmlString: string) => {
        return { __html: htmlString.replace(/<[^>]*>?/gm, "") };
    };

    const sortedNews = news.sort((a, b) => {
        return (
            new Date(b.publish_date).getTime() -
            new Date(a.publish_date).getTime()
        );
    });

    const limitedNews = sortedNews.slice(0, 1);

    return (
        <section>
            {limitedNews.map((item, index) => (
                <Link href={`news/${item.slug}`} key={index}>
                    <div className="flex w-full flex-col gap-4 rounded-lg border-2 md:flex-row">
                        <div className="rounded bg-[#000000] md:w-1/2">
                            <Image
                                className="w-full rounded bg-cover bg-center"
                                src={item.thumbnail}
                                height={1080}
                                width={1920}
                                alt={`${item.title}'s image`}
                            />
                        </div>
                        <div className="space-y-10 p-4 md:w-1/2 md:space-y-[5.5rem]">
                            <h1 className="text-[1.5rem] font-[600]">
                                {item.title}
                            </h1>
                            <h1
                                className="text-justify"
                                dangerouslySetInnerHTML={createMarkup(
                                    truncateDescription(item.content, 200)
                                )}
                            />
                            <div className="flex justify-between">
                                <h1>
                                    {new Date(item.publish_date).toDateString()}
                                </h1>
                                <div className="rounded-xl border border-[#FF6F22] px-2 text-center text-sm text-[#FF6F22] md:text-base">
                                    <h1> {item.organization}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </section>
    );
}
