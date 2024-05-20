import React from "react";
import Link from "next/link";
import Event from "@/models/event";

export default function EventCardCompleted({ events }: { events: Event[] }) {
    const truncateDescription = (description: string, maxLength: number) => {
        if (description.length <= maxLength) {
            return description;
        }
        return description.substring(0, maxLength) + "...";
    };
    return (
        <div className="grid grid-cols-1 gap-6 md:scale-100 md:grid-cols-3">
            {events.map((event, index) => (
                <div
                    key={index}
                    className="flex max-w-[23rem] flex-col justify-between space-y-4 rounded-lg border border-[#E50D0D] px-6 py-4"
                >
                    <h1 className="h-[3rem] text-[1.2rem] font-[600]">
                        {event.title}
                    </h1>
                    <div className="h-[5rem] text-sm md:text-base">
                        {truncateDescription(event.description, 100)}
                    </div>
                    <div className="flex justify-between">
                        <div className="rounded-2xl border-2 border-[#E50D0D] px-4">
                            <h1 className="text-[0.8rem] text-[#E50D0D]">
                                {event.status}
                            </h1>
                        </div>
                        <Link href={`/events/${event.slug}`}>Read More</Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
