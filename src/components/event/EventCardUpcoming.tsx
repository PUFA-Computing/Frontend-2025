import React from "react";
import Link from "next/link";
import Event from "@/models/event";
import Image from "next/image";

export default function EventCardUpcoming({ events }: { events: Event[] }) {
    const truncateDescription = (description: string, maxLength: number) => {
        if (description.length <= maxLength) {
            return description;
        }
        return description.substring(0, maxLength) + "...";
    };
    const truncatedTitle = (title: string, maxLength: number) => {
        if (title.length <= maxLength) {
            return title;
        }
        return title.substring(0, maxLength) + "...";
    };

    return (
        // Upcoming Max Events is 2
        <div className="flex scale-90 grid-cols-1 flex-col justify-center gap-12 md:scale-100 md:grid-cols-2 md:flex-row md:gap-8">
            {events.map((event, index) => (
                <div
                    key={index}
                    className="border-animation flex max-w-[35rem] gap-4 rounded-lg border  shadow-lg duration-300 hover:border-transparent"
                >
                    <div className="relative h-[340px] w-[250px] scale-110 overflow-hidden rounded-lg bg-[#E50D0D]">
                        <Image
                            src={event.thumbnail}
                            alt={`${event.title}'s poster`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                            style={{ zIndex: -1 }}
                        />
                    </div>

                    <div className="max-w-[20rem] space-y-8 p-6">
                        <h1 className="text-[1.0rem] font-[600] ">
                            {truncatedTitle(event.title, 58)}
                        </h1>
                        <h1 className="text-[0.8rem] text-[#353535]">
                            {event.start_date.toDateString()}
                        </h1>
                        <p className="text-justify text-[0.8rem] font-[400] text-[#353535]">
                            {truncateDescription(event.description, 150)}{" "}
                        </p>
                        <div className="flex justify-between">
                            <h1 className="font-[600]">{event.organization}</h1>
                            <div className="rounded-2xl border-2 border-[#E50D0D] px-4">
                                <h1 className="text-[#E50D0D]">
                                    {event.status}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
