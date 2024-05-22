import News from "@/models/news";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CardNormalNewsPage({ news }: { news: News[] }) {
   const sortedNews = news.sort((a, b) => {
      return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
  });

  const limitedNews = sortedNews.slice(3);
    return (
        <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {limitedNews.map((item, index) => (
                <Link href={`news/${item.slug}`} key={index}>
                    <div className="flex flex-col rounded-lg border-2 duration-300 hover:scale-110 hover:shadow-xl">
                        <div>
                            <Image
                                className="h-full w-full bg-center object-cover"
                                src={item.thumbnail}
                                height={1080}
                                width={1920}
                                alt={`${item.title}'s image`}
                            />
                        </div>
                        <div className="flex h-[40%] flex-col justify-between px-4 py-2">
                            <div className="flex w-[8rem] justify-center rounded-3xl border border-[#FF6F22] px-2 text-[0.8rem] text-[#FF6F22]">
                                {item.organization}
                            </div>
                            <h1 className="font-bold">{item.title}</h1>
                            <p className="text-[0.8rem]">{new Date(item.publish_date).toDateString()}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </section>
    );
}
