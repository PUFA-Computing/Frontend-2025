"use client"
import React from "react";
import Event from "@/models/event";
import Swal from "sweetalert2";
import axios from "axios";
import { API_EVENT } from "@/config/config";


function EventTable({ events }: { events: Event[] }) {

    const deleteEvent = async (eventId: number): Promise<void> => {
        try {
            const token = localStorage.getItem('access_token');
    
            if (!token) {
                console.error('Authentication token not found in local storage.');
                return;
            }
    
            await axios.delete(`${API_EVENT}/${eventId}/delete`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error : any) {
            if (error.response && error.response.status === 401) {
                console.error('Authentication error. Please log in again.');
            } else {
                console.error(`Error deleting event with ID ${eventId}`, error);
                throw error;
            }
        }
    };

    const sortedEvents = events.sort((a, b) => a.id - b.id);
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
                    Swal.fire("Deleted!", `${event.title} has been deleted.`, "success");
                    window.location.reload();
                } catch (error) {
                    Swal.fire("Error", `Failed to delete ${event.title}. Please try again later.`, "error");
                }
            }
        });
    };


    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th>
                            <button>dasd</button>
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            ID
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Title
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Description
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Start Date
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            End Date
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Status
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Max Registration
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Organization
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {sortedEvents.map((event) => (
                        <tr key={event.id} className="text-justify">
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {event.id}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                                {event.title}
                            </td>
                            <td className="px-4 py-2 text-gray-700">
                                {truncateDescription(event.description, 50)}{" "}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {event.start_date.toDateString()}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {event.end_date.toDateString()}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {event.status}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                                {event.max_registration}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {event.organization}
                            </td>
                            <td className="flex items-center justify-center gap-4 px-4 py-2">
                                <button
                                    className="inline-block rounded bg-green-400 px-4 py-2 text-xs font-medium text-white"
                                    onClick={() => handleView(event)}
                                >
                                    View
                                </button>
                                <button
                                    className="inline-block rounded bg-yellow-300 px-4 py-2 text-xs font-medium text-white"
                                    // onClick={handleEdit}
                                >
                                    Edit
                                </button>
                                <button
                                    className="inline-block rounded bg-red-500 px-4 py-2 text-xs font-medium text-white"
                                    onClick={() =>handleDelete(event)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EventTable;
