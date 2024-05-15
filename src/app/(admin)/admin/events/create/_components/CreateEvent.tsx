"use client";
import Event from "@/models/event";
import React, { useState } from "react";
import Select from "react-select";
import Swal from 'sweetalert2';

const organizationOptions = [
    { value: "1", label: "PUFA Computing" },
    { value: "2", label: "PUMA Informatics" },
    { value: "3", label: "PUMA Visual Communication Design" },
    { value: "4", label: "PUMA Information System" },
    { value: "5", label: "PUMA Interior Design" },
];

export default function CreateEvent() {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [error, setError] = useState("");

    const createEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const startDate = formData.get("startDate");
        const endDate = formData.get("endDate");
        const title = formData.get("title") as string;
        const organization = formData.get("organization");
        const description = formData.get("description") as string;
        // const thumbnail = formData.get("poster");
    
        try {
            const event: any = {
                title: title as string,
                description: formData.get(description) as string,
                start_date: new Date(startDate as string),
                end_date: new Date(endDate as string),
                organization_id: parseInt(organization as string),
                id: "",
                user_id: "",
                status: "",
                slug: title
                    .toLowerCase()
                    .replace(/ /g, "-")
                    .replace(/[^a-z0-9]/g, ""),
                thumbnail: "",
                created_at: new Date,
                updated_at: new Date,
                organization: "",
                author: "",
                max_registration: 4
            };
            const response = await createEvent(event);
            Swal.fire({
                icon: 'success',
                title: 'Event Created Successfully',
                text: 'Your event has been created successfully.'
            });
            console.log("Api response: ", response);
        } catch (error : any) {
            Swal.fire({
                icon: 'error',
                title: 'Error Creating Event',
                text: 'An error occurred while creating the event. Please check the details below:',
                footer: error.message
            });
            return error;
        }
    };

    return (
        <section>
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                <form onSubmit={(e) => createEvent(e)} className="space-y-4">
                    <div>
                        <label className="sr-only" htmlFor="eventTitle">
                            Event Title
                        </label>
                        <input
                            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                            placeholder="Event Title"
                            name="title"
                            type="text"
                            id="eventTitle"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="file"
                                className="block text-sm text-black"
                            >
                                Start Date
                            </label>
                            <input
                                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                placeholder="Start Date"
                                type="date"
                                id="startDate"
                                name="startDate"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="file"
                                className="block text-sm text-black"
                            >
                                End Date
                            </label>
                            <input
                                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                placeholder="End Date"
                                type="date"
                                id="endDate"
                                name="endDate"
                            />
                        </div>
                        <div>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isClearable={isClearable}
                                isSearchable={isSearchable}
                                name="organization"
                                options={organizationOptions}
                            />
                        </div>
                    </div>

                    {/* <div>
                        <div className="">
                            <label
                                htmlFor="file"
                                className="block text-sm text-black"
                            >
                                Poster
                            </label>
                            <label
                                htmlFor="dropzone-file"
                                className="mx-auto mt-2 flex w-full max-w-lg cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-5 text-center dark:border-gray-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-8 w-8 text-black"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                </svg>

                                <h2 className="mt-1 font-medium tracking-wide text-black">
                                    Poster File
                                </h2>

                                <p className="mt-2 text-xs tracking-wide text-black">
                                    Upload or drag & drop your file SVG, PNG,
                                    JPG or GIF.
                                </p>

                                <input
                                    id="poster"
                                    type="file"
                                    className="hidden"
                                    name="poster"
                                />
                            </label>
                        </div>
                    </div> */}

                    <div>
                        <label className="sr-only" htmlFor="description">
                            Event Description
                        </label>

                        <textarea
                            className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                            placeholder="Event Description"
                            rows={8}
                            id="description"
                            name="description"
                        ></textarea>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                        >
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
