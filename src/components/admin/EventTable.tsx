"use client";
import React from "react";
import Event from "@/models/event";
import Swal from "sweetalert2";
import axios from "axios";
import { API_EVENT } from "@/config/config";
import { createEvent } from "@/services/api/event";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

function EventTable({ events }: { events: Event[] }) {
    const deleteEvent = async (eventId: number): Promise<void> => {
        try {
            const token = localStorage.getItem("access_token");

            if (!token) {
                console.error(
                    "Authentication token not found in local storage."
                );
                return;
            }

            await axios.delete(`${API_EVENT}/${eventId}/delete`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                console.error("Authentication error. Please log in again.");
            } else {
                console.error(`Error deleting event with ID ${eventId}`, error);
                throw error;
            }
        }
    };

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

    const handleView = (event: Event) => {
        Swal.fire({
            title: "View Event",
            html: `
                <b>ID:</b> ${event.id}<br>
                <b>Title:</b> ${event.title}<br>
                <b>Description:</b> ${event.description}<br>
            `,
            icon: "info",
            confirmButtonText: "Close",
        });
    };

    const handleDelete = (event: Event) => {
        Swal.fire({
            title: "Delete Event",
            text: `Are you sure you want to delete ${event.title}?`,
            icon: "error",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteEvent(event.id);
                    Swal.fire(
                        "Deleted!",
                        `${event.title} has been deleted.`,
                        "success"
                    );
                    window.location.reload();
                } catch (error) {
                    Swal.fire(
                        "Error",
                        `Failed to delete ${event.title}. Please try again later.`,
                        "error"
                    );
                }
            }
        });
    };

    const handleCreate = (event: Event) => {
        Swal.fire({
            title: "Delete Event",
            text: `Are you sure you want to delete ${event.title}?`,
            icon: "error",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteEvent(event.id);
                    Swal.fire(
                        "Deleted!",
                        `${event.title} has been deleted.`,
                        "success"
                    );
                    window.location.reload();
                } catch (error) {
                    Swal.fire(
                        "Error",
                        `Failed to delete ${event.title}. Please try again later.`,
                        "error"
                    );
                }
            }
        });
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
