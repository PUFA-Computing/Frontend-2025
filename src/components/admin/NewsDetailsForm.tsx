import React, { useState } from "react";
import { UserCircleIcon } from "lucide-react";
import Select from "react-select";

export default function NewsDetailsForm({
    onNext,
    formData,
    onDetailsChange,
    organizationOptions,
    selectedOrganization,
    onOrganizationChange,
}: {
    onNext: () => void;
    formData: {
        title: string;
        content: string;
        organization_id: number;
    };
    onDetailsChange: (newsDetails: {
        title: string;
        content: string;
        organization_id: number;
    }) => void;
    organizationOptions: { id: number; name: string }[];
    selectedOrganization: { id: number; name: string };
    onOrganizationChange: (selectedOrganization: {
        id: number;
        name: string;
    }) => void;
}) {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        onDetailsChange({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // You can add form validation here
        onNext();
    };

    return (
        <div className="mx-auto max-w-2xl">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
            >
                <div className="px-4 py-6 sm:p-8">
                    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Title
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleChange(e)}
                                    className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Title of the news"
                                />
                            </div>

                            {/* Select Organization_ID */}
                            <div className="mt-4">
                                <label
                                    htmlFor="organization"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Organization
                                </label>

                                {/*Set Value Select is ID not the name*/}
                                <Select
                                    id="organization"
                                    value={selectedOrganization}
                                    onChange={(selectedOrganization) =>
                                        onOrganizationChange(
                                            selectedOrganization as {
                                                id: number;
                                                name: string;
                                            }
                                        )
                                    }
                                    options={organizationOptions}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) =>
                                        option.id.toString()
                                    }
                                    placeholder="Select organization"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="content"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Content
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="content"
                                    name="content"
                                    rows={4}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                    value={formData.content}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Content of the news
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                    <button
                        type="submit"
                        className="inline-flex items-center gap-x-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-inset ring-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                    >
                        <UserCircleIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                        <span>Next</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
