import React from "react";
import Image from "next/image";
import { developerHistory } from "@/lib/history";

export default function DeveloperHistoryPage() {
    const getOrdinal = (n: number) => {
        const suffixes = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    };

    return (
        <section className="mx-auto my-16 max-w-6xl px-8">
            <h1 className="mb-12 text-center text-4xl font-extrabold text-gray-900 tracking-wide">
                Developer History
            </h1>

            {developerHistory.map((generation, index) => (
                <div key={index} className="my-20">
                    <h2 className="mb-10 text-2xl text-center sm:text-left font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">
                        {getOrdinal(generation.gen)} Generation
                    </h2>
                    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
                        {generation.member.map((member, idx) => (
                            <div
                                key={idx}
                                className="relative bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                <Image
                                    src={member.image}
                                    alt={`${member.name}'s Photo`}
                                    width={720}
                                    height={1280}
                                    className="h-72 w-full rounded-lg object-cover object-center mb-6"
                                />
                                <div className="text-center">
                                    <h3 className="text-xl font-semibold text-gray-900 capitalize">
                                        {member.name}
                                    </h3>
                                    <p className="mt-2 text-sm font-medium text-gray-600 capitalize">
                                        {member.position}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}
