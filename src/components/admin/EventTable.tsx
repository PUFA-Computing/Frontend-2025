import React from "react";

function EventTable() {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Username
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Name
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Email
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Student ID
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Major
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Update At
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Role
                        </th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    <tr className="text-center">
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            John Doe
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            24/05/1995
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            Web Developer
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            $120,000
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                            <button className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                                View
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default EventTable;
