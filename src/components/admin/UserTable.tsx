import React from "react";
import User from "@/models/user";

function UserTable({
    users,
    onEditClick,
    onViewVerification,
}: {
    users: User[];
    onEditClick: (user: User) => void;
    onViewVerification: (verificationInfo: any) => void;
}) {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Users
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their
                        name, title, email and role.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-pink-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <div className="flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                                />
                            </svg>
                            <span className="ml-2">Add User</span>
                        </div>
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Information
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Student ID Verified
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Role
                                    </th>
                                    <th
                                        scope="col"
                                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                            <div className="flex items-center">
                                                <div className="h-11 w-11 flex-shrink-0">
                                                    <img
                                                        className="h-11 w-11 rounded-full"
                                                        src={
                                                            user.profile_picture
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-900">
                                                        {user.first_name}{" "}
                                                        {user.last_name}
                                                    </div>
                                                    <div className="mt-1 text-gray-500">
                                                        {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            <div className="text-gray-900">
                                                {user.student_id}
                                            </div>
                                            <div className="mt-1 text-gray-500">
                                                {user.major}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            {user.student_id_verified ? (
                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                    Verified
                                                </span>
                                            ) : user.student_id_verification ? (
                                                // Badge for pending verification and indicator new on right top of the button
                                                <button
                                                    onClick={() =>
                                                        onViewVerification({
                                                            student_id_verification:
                                                                user.student_id_verification,
                                                        })
                                                    }
                                                    className="relative inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"
                                                >
                                                    Pending Verification
                                                    <span className="absolute right-0 top-0 flex h-3 w-2">
                                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-600 opacity-75"></span>
                                                        <span className="relative inline-flex h-3 w-3 rounded-full bg-yellow-500"></span>
                                                    </span>
                                                </button>
                                            ) : (
                                                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                                    Not Verified
                                                </span>
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                            {user.role_id === 1 ? (
                                                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-black to-yellow-600 px-2.5 py-0.5 text-xs font-medium text-white">
                                                    Admin
                                                </span>
                                            ) : user.role_id === 2 ? (
                                                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-black to-blue-600 px-2.5 py-0.5 text-xs font-medium text-white">
                                                    Computizen
                                                </span>
                                            ) : user.role_id === 3 ? (
                                                <span className="inline-flex items-center rounded-full bg-black px-2.5 py-0.5 text-xs font-medium text-white">
                                                    PUFA Computing
                                                </span>
                                            ) : user.role_id === 4 ? (
                                                <span className="inline-flex items-center rounded-full border border-gray-300 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                    PUMA IT
                                                </span>
                                            ) : user.role_id === 5 ? (
                                                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-600 to-sky-600 px-2.5 py-0.5 text-xs font-medium text-white">
                                                    PUMA IS
                                                </span>
                                            ) : user.role_id === 6 ? (
                                                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-black to-red-600 px-2.5 py-0.5 text-xs font-medium text-white">
                                                    PUMA ID
                                                </span>
                                            ) : user.role_id === 7 ? (
                                                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-yellow-500 px-2.5 py-0.5 text-xs font-medium text-white">
                                                    PUMA VCD
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-black to-pink-500 px-2.5 py-0.5 text-xs font-medium text-white">
                                                    Guest
                                                </span>
                                            )}
                                        </td>
                                        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <button
                                                onClick={() =>
                                                    onEditClick(user)
                                                }
                                                className="text-pink-600 hover:text-pink-900"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="h-6 w-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                    />
                                                </svg>

                                                <span className="sr-only">
                                                    , {user.id}
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserTable;
