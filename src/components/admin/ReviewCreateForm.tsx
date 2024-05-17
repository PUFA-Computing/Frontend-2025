import React from "react";

export default function ReviewCreateForm({
    onPrevious,
}: {
    onPrevious: () => void;
}) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to API)
        alert("News created successfully!");
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mt-4">
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                    Create
                </button>
                <button
                    type="button"
                    onClick={onPrevious}
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-400"
                >
                    Previous
                </button>
            </div>
        </form>
    );
}
