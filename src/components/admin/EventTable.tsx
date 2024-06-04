"use client";
import React from "react";
import Event from "@/models/event";
import Swal from "sweetalert2";
import axios from "axios";
import { API_EVENT } from "@/config/config";
import { createEvent } from "@/services/api/event";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

function EventTable({ events }: { events: Event[] }) {
    // Sort events by Alphanumeric order
    const sortedEvents = events.sort((a, b) => {
        return a.title.localeCompare(b.title);
    });

    const truncateDescription = (description: string, maxLength: number) => {
        if (description.length <= maxLength) {
            return description;
        }
        return description.substring(0, maxLength) + "...";
    };

    return (
        <ul role="list" className="divide-y divide-gray-100">
            {sortedEvents.map((event) => (
                <li key={event.id} className="relative py-5 hover:bg-gray-50">
                    <div className="mx-auto flex max-w-7xl justify-between gap-x-6 px-4 sm:px-6 lg:px-8">
                        <div className="flex gap-x-4">
                            <img
                                className="h-20 w-12 rounded-lg object-cover"
                                src={event.thumbnail}
                                alt=""
                            />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                    <a href={`./events/${event.slug}`}>
                                        <span className="absolute inset-x-0 -top-px bottom-0" />
                                        {event.title}
                                    </a>
                                </p>
                                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                    <a
                                        href={`mailto:${event.author}`}
                                        className="relative truncate hover:underline"
                                    >
                                        {event.organization}
                                    </a>
                                </p>
                                {/* Description */}
                                <p className="mt-1 truncate text-sm text-gray-500">
                                    {truncateDescription(
                                        event.description,
                                        100
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                {/* Event status if Upcoming, Ongoing, or Ended */}
                                {event.status === "Open" ? (
                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                        Upcoming
                                    </span>
                                ) : event.status === "Upcoming" ? (
                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                        Open
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                        Closed
                                    </span>
                                )}

                                {/*Start Date and End Date*/}
                                <div className="mt-1 flex text-xs leading-5 text-gray-500">
                                    <span className="relative truncate">
                                        {new Date(
                                            event.start_date
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                        {" - "}
                                        {new Date(
                                            event.end_date
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>

                            <ChevronRightIcon
                                className="h-5 w-5 flex-none text-gray-400"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default EventTable;
