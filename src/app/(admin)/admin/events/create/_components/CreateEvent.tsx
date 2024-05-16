"use client";
import Event from "@/models/event";
import React, { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import { date, number, undefined } from "zod";
import { createEvent } from "@/services/api/event";

interface EventCreation {
    title: string;
    start_date: string;
    end_date: string;
    organization_id: number;
    description: string;
    max_registration: number;
}

const organizationOptions = [
    { value: 1, label: "PUFA Computing" },
    { value: 2, label: "PUMA Informatics" },
    { value: 3, label: "PUMA Visual Communication Design" },
    { value: 4, label: "PUMA Information System" },
    { value: 5, label: "PUMA Interior Design" },
];

export default function CreateEvent() {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<EventCreation>({
        title: "",
        start_date: Date.toString(),
        end_date: Date.toString(),
        organization_id: 0,
        description: "",
        max_registration: 0,
    });

    const [poster, setPoster] = useState<File | undefined>();
    const [posterName, setPosterName] = useState<string | undefined>();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "max_registration" ? Number(value) : value,
        }));
    };

    const handleSelectChange = (selectedOption: any) => {
        setFormData({
            ...formData,
            organization_id: selectedOption ? selectedOption.value : 0,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPoster(e.target.files[0]);
            setPosterName(e.target.files[0].name);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !formData.title ||
            !formData.start_date ||
            !formData.end_date ||
            !formData.organization_id ||
            !formData.description ||
            !formData.max_registration
        ) {
            setError("Please fill in all fields");
            return;
        }

        const event = {
            title: formData.title,
            start_date: formData.start_date,
            end_date: formData.end_date,
            organization_id: formData.organization_id,
            description: formData.description,
            max_registration: formData.max_registration,
        };

        try {
            const newEvent = await createEvent(event, poster as File);
            Swal.fire({
                icon: "success",
                title: "Event Created",
                text: `The event ${newEvent.title} has been successfully created.`,
                confirmButtonText: "OK",
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to Create Event",
                text: "An error occurred while creating the event. Please try again later.",
                confirmButtonText: "OK",
            });
        }
    };
    return (
        <section>
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label
                                className="block text-sm text-black"
                                htmlFor="eventTitle"
                            >
                                Event Title
                            </label>
                            <input
                                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                placeholder="Event Title"
                                name="title"
                                type="text"
                                id="eventTitle"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label
                                className="block text-sm text-black"
                                htmlFor="max_registration"
                            >
                                Event Max Registration
                            </label>
                            <input
                                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                placeholder="Max Registration"
                                name="max_registration"
                                type="number"
                                id="max_registration"
                                value={formData.max_registration}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="start_date"
                                className="block text-sm text-black"
                            >
                                Start Date
                            </label>
                            <input
                                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                placeholder="Start Date"
                                type="date"
                                id="start_date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="end_date"
                                className="block text-sm text-black"
                            >
                                End Date
                            </label>
                            <input
                                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                                placeholder="End Date"
                                type="date"
                                id="end_date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleInputChange}
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
                                onChange={handleSelectChange}
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label
                                htmlFor="poster"
                                className="block text-sm text-black"
                            >
                                Poster
                            </label>
                            <label
                                htmlFor="poster"
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
                            </label>
                            <input
                                id="poster"
                                type="file"
                                className="hidden"
                                name="poster"
                                onChange={handleFileChange}
                            />
                            {posterName && (
                                <p className="mt-2 text-sm text-black">
                                    Image: {posterName}
                                </p>
                            )}
                        </div>
                    </div>

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
                            value={formData.description}
                            onChange={handleInputChange}
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
