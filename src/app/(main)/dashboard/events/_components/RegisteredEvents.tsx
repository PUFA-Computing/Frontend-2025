"use client";
import EventStatusDashboard from "@/components/event/EventStatusDashboard";
import React, { useEffect, useState } from "react";
import { fetchUserEvents } from "@/services/api/user";
import Event from "@/models/event";
import { Spinner } from "@nextui-org/spinner";
import { useSession } from "next-auth/react";

export default function RegisteredEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { data: session, status } = useSession();

    useEffect(() => {
        async function fetchEvents() {
            if (status === "loading") {
                return;
            }

            if (!session) {
                setIsLoading(false);
                return;
            }

            try {
                const events = await fetchUserEvents(session.user.access_token);
                if (Array.isArray(events)) {
                    setEvents(events);
                } else {
                    console.error("Invalid events data");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchEvents();
    }, [session, status]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner className="text-sky-500">
                    <span className="text-sky-500">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg:transparent">
                    <tr className="text-center font-[500] text-[#353535]">
                        <th scope="col" className="px-4 py-3.5 ">
                            Events Name
                        </th>
                        <th scope="col" className="px-12 py-3.5">
                            Organization
                        </th>
                        <th scope="col" className="py-3.5">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {Array.isArray(events) && events.length > 0 ? (
                        events.map((event) => (
                            <tr key={event.id} className="text-center">
                                <td className="whitespace-nowrap px-4 py-4">
                                    <div className="text-sm font-[400] text-[#353535]">
                                        {event.title}
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-12 py-4">
                                    <div className="text-sm font-[400] text-[#353535]">
                                        {event.organization}
                                    </div>
                                </td>
                                <td className="whitespace-nowrap py-4">
                                    <EventStatusDashboard
                                        status={event.status}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="py-4 text-center">
                                No events found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
