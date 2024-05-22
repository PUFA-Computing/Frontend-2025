import React from "react";
import { UserCircleIcon } from "lucide-react";
import Select from "react-select";
// import ReactQuill from "react-quill";
import Editor from "@/components/rich-text/editor";

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

    const handleContentChange = (content: string) => {
        onDetailsChange({
            ...formData,
            content,
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
                        <div className="col-span-full">
                            <div className="mt-4">
                                <label
                                    htmlFor="organization"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Organization
                                </label>

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
                            {/*Information for users*/}
                            <div className="mt-3 text-sm leading-6 text-gray-600">
                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    Select the organization for which the news
                                    is intended
                                </p>
                            </div>

                            <div className="mt-16">
                                <label
                                    htmlFor="title"
                                    className="mt-6 block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Title
                                </label>

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
                        </div>

                        <div className="col-span-full mt-8">
                            <label
                                htmlFor="content"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Content
                            </label>

                            <Editor
                                content={formData.content}
                                placeholder={"Content of the news"}
                                onChange={handleContentChange}
                            />

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
