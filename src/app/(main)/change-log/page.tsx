// @ts-nocheck
import { GetChangeLog, ChangelogResponse } from '@/services/api/version';
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ChangelogPageProps {
    log: ChangelogResponse | null;
}

const ChangelogPage: React.FC<ChangelogPageProps> = async () => {
    const log = await GetChangeLog();

    if (!log) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-red-500">Failed to fetch data...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 ">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Changelog</h1>
            <ul className="space-y-8 max-w-none md:max-w-5xl mx-auto">
                {log.changelog.map((entry, index) => (
                    <li
                        key={index}
                        className="border border-gray-200 rounded-lg p-6 bg-gray-50 shadow-md">
                        {Object.entries(entry).map(([version, details]) => (
                            <div key={version} className="mb-6">
                                <h2 className="text-2xl font-bold mb-4 text-gray-700">{version}</h2>
                                <ReactMarkdown
                                    className="prose prose-lg text-gray-600"
                                    components={{
                                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold my-4" {...props} />,
                                        h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold my-3" {...props} />,
                                        p: ({ node, ...props }) => <p className="my-2" {...props} />,
                                        li: ({ node, ...props }) => <li className="list-disc pl-5" {...props} />,
                                    }}
                                >
                                    {details.join('\n')}
                                </ReactMarkdown>
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChangelogPage;
