import React from "react";
import User from "@/models/user";

function UserTable({ users }: { users: User[] }) {
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
                    {users.map((user) => (
                        <tr key={user.id} className="text-justify">
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {user.username}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-center text-gray-700">
                                {user.first_name} {user.middle_name} {user.last_name}
                            </td>
                            <td className="px-4 py-2 text-gray-700">{user.email}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {user.student_id}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {user.major}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {user.updated_at}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                {user.role_id}
                            </td>
                            <td className="px-4 py-2">
                                <button className="text-blue-600 hover:underline">
                                    Edit
                                </button>
                                <button className="text-red-600 hover:underline">
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

export default UserTable;
