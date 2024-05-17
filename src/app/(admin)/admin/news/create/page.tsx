import React from 'react';
import CreateNewsTabs from "@/app/(admin)/admin/news/create/_components/TabComponent";

export default function CreateNewsPage() {
    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Create News</h1>
            <CreateNewsTabs />
        </div>
    );
}
