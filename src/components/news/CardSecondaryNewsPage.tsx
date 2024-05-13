import News from "@/models/news";
import Image from "next/image";
import Link from "next/link";

export default function CardSecondaryNewsPage({ news }: { news: News[] }) {
    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {news.map((news) => (
                <Link href={news.slug} key={news.id}>
                    <div className="flex flex-col rounded-lg border-2">
                        <div>
                            <Image
                                className="h-48 w-full rounded bg-center object-cover"
                                src={news.thumbnail}
                                alt={`${news.title}'s image`}
                                width={1080}
                                height={768}
                            />
                        </div>
                        <div className="flex h-[45%] flex-col justify-between space-y-4 px-2 py-2">
                            <div className="flex w-[6rem] justify-center rounded-3xl border border-[#FF6F22] px-2 text-[0.8rem] text-[#FF6F22]">
                                {/* {major} */}
                            </div>
                            <h1 className="text-[1.2rem] font-bold">{news.title}</h1>
                            <p className="text-[0.9rem] font-light">{news.publish_date.getTime()}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
