import Image from "next/image";
import Event from "@/models/event";
import React from "react";
import Link from "next/link";
import NoData from "@/components/ui/NoData";

export default function EventCardPage({ events }: { events: Event[] }) {
    const calculateDaysLeft = (endDate: Date) => {
        const today = new Date();
        const differenceInTime = endDate.getTime() - today.getTime();
        return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    };

    const truncateDescription = (description: string, maxLength: number) => {
        if (description.length <= maxLength) {
            return description;
        }
        return description.substring(0, maxLength) + "...";
    };

    if (events.length === 0) {
        return (
            <NoData
                title={"No Upcoming Events"}
                message={
                    "There are currently no upcoming events available. Please check back later."
                }
            />
        );
    }

    return (
        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
            {events.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`}>
                    <div className="flex cursor-pointer gap-4 rounded-[15px] border-[0.5px] border-[#E50D0D] md:gap-8">
                        <div className="relative h-[16rem] w-[40rem]">
                            <Image
                                src={event.thumbnail}
                                className="h-[340px] w-[300px] scale-110 overflow-hidden rounded-lg border-[0.5px] border-[#E50D0D]"
                                alt={`${event.title}'s poster`}
                                layout="fixed"
                                width={1920}
                                height={1080}
                            />
                        </div>
                        <div className="flex flex-col justify-between space-y-4 p-2 md:p-4">
                            <div className="flex items-center justify-between">
                                <p className="ml-0.5 text-lg font-bold">
                                    {event.title}
                                </p>
                                <span className="inline-block rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 px-3 py-1 text-xs font-semibold text-white shadow-md">
                                    {calculateDaysLeft(event.end_date)} Days
                                    Left
                                </span>
                            </div>
                            <p className="font-[600] text-[#353535]">
                                {`${event.start_date.toLocaleDateString(
                                    "id-ID",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )} - ${event.end_date.toLocaleDateString(
                                    "id-ID",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}`}
                            </p>
                            <p className="text-justify text-sm md:text-base">
                                {truncateDescription(event.description, 150)}
                            </p>
                            <div className="flex justify-between">
                                <p className="text-[16px] font-bold ">
                                    {event.organization}
                                </p>
                                <div>
                                    {/*Animation Border*/}
                                    <button className="rounded-[10px] border border-[#E50D0D] px-2">
                                        {event.status}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
