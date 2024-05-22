import Title from "@/components/admin/Title";
import React from "react";
import NewsTable from "@/components/admin/NewsTable";
import Link from "next/link";
import { fetchNews } from "@/services/api/news";

export default async function AdminNewsPage() {
    const news = await fetchNews();
    if (!news) return <div>Failed to fetch data...</div>;

    return (
        <div>
            <Title title="News Page"/>
            {/*Button Create and table*/}
            <div className="flex justify-end mb-4">
                <Link href="/admin/news/create">
                    <button
                        type="button"
                        className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                    >
                        Create News
                    </button>
                </Link>
            </div>

            <NewsTable news={news} />
        </div>
    );
};
