"use client"
import React from "react";
import Event from "@/models/event";
import Swal from "sweetalert2";

function EventTable({ events }: { events: Event[] }) {
    const sortedEvents = events.sort((a, b) => a.id - b.id);
    const truncateDescription = (description: string, maxLength: number) => {
        if (description.length <= maxLength) {
            return description;
        }
        return description.substring(0, maxLength) + "...";
    };

    const handleView = (event: Event) => {
        Swal.fire({
            title: "View Product",
            html: `
                <b>ID:</b> ${event.id}<br>
                <b>Title:</b> ${event.title}<br>
                <b>Description:</b> ${event.description}<br>
                <b>Start Date:</b> ${event.start_date.toDateString()}<br>
                <b>End Date:</b> ${event.end_date.toDateString()}<br>
                <b>Status:</b> ${event.status}<br>
                <b>Max Registration:</b> ${event.max_registration}<br>
                <b>Organization:</b> ${event.organization}<br>
            `,
            icon: "info",
            confirmButtonText: "Close",
        });
    };

    // const handleEdit = (event: Event) => {
    //     // edit logic
    //     Swal.fire({
    //       title: "Edit Product",
    //       html: `
    //       <b>Id:</b> ${id}<br>
    //       <b>Name:</b> ${name}<br>
    //       <b>Name:</b> ${problem}<br>
    //         <b>Price:</b> ${price}<br>
    //       `,
    //       icon: "warning",
    //       confirmButtonText: "Close",
    //     });
    //   };
    
      const handleDelete = (event : Event) => {
        Swal.fire({
          title: "Delete Product",
          text: `Are you sure you want to delete ${event.title}?`,
          icon: "error",
          showCancelButton: true,
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Deleted!", `${event.title} has been deleted.`, "success");
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
