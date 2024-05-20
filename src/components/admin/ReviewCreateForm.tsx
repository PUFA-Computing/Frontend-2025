import React from "react";
import Select from "react-select";

export default function ReviewCreateForm({
    onPrevious,
    onSubmit,
    formData,
    thumbnail,
    selectedOrganization,
}: {
    onPrevious: () => void;
    onSubmit: (e: React.FormEvent) => void;
    formData: {
        title: string;
        content: string;
        publish_date: Date;
        organization_id: number;
    };
    thumbnail: File | null;
    selectedOrganization: { id: number; name: string };
}) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(e);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                >
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={formData.title}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mt-4">
                <label
                    htmlFor="organization_id"
                    className="block text-sm font-medium text-gray-700"
                >
                    Organization
                </label>
                <Select
                    value={selectedOrganization}
                    options={[
                        { id: 1, name: "PUFA Computing" },
                        { id: 2, name: "PUMA IT" },
                        { id: 3, name: "PUMA IS" },
                        { id: 4, name: "PUMA ID" },
                        { id: 5, name: "PUMA VCD" },
                    ]}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id.toString()}
                    onChange={(selectedOption) => console.log(selectedOption)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    isDisabled
                />
            </div>
            <div className="mt-4">
                <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                >
                    Content
                </label>
                <textarea
                    id="content"
                    rows={4}
                    value={formData.content}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mt-4">
                <label
                    htmlFor="published_date"
                    className="block text-sm font-medium text-gray-700"
                >
                    Published Date
                </label>
                <input
                    type="date"
                    id="published_date"
                    value={formData.publish_date.toISOString().split("T")[0]}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mt-4">
                <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium text-gray-700"
                >
                    Thumbnail
                </label>
                <input
                    type="text"
                    id="thumbnail"
                    value={thumbnail?.name || "No file uploaded"}
                    readOnly
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <button
                    type="button"
                    onClick={onPrevious}
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-400"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                    Create
                </button>
            </div>
        </form>
    );
}
