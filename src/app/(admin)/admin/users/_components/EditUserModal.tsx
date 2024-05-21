import React, { useState } from "react";
import User from "@/models/user";
import { adminUpdateUser } from "@/services/api/user";
import Swal from "sweetalert2";

function EditUserModal({ user, onClose }: { user: User; onClose: () => void }) {
    const [role, setRole] = useState(user.role_id);
    const [status, setStatus] = useState(user.student_id_verified);

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(Number(event.target.value));
    };

    const handleStatusChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setStatus(event.target.value === "true");
    };

    const handleSave = async () => {
        try {
            await adminUpdateUser(user.id, role, status);

            await Swal.fire({
                icon: "success",
                title: "User updated successfully",
                showConfirmButton: false,
            });

            onClose();
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "Error updating user",
                showConfirmButton: false,
            });

            console.error("Error updating user", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-white p-4 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">
                    Edit User {user.username}
                </h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Role
                    </label>
                    <select
                        value={role}
                        onChange={handleRoleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="1">Admin</option>
                        <option value="2">Computizen</option>
                        <option value="3">PUFA Computing</option>
                        <option value="4">PUMA IT</option>
                        <option value="5">PUMA IS</option>
                        <option value="6">PUMA ID</option>
                        <option value="7">PUMA VCD</option>
                        <option value="8">Guest</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Student ID Verified
                    </label>
                    <select
                        value={status ? "true" : "false"}
                        onChange={handleStatusChange}
                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="true">Verified</option>
                        <option value="false">Not Verified</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            handleSave().then((r) => r);
                        }}
                        className="rounded bg-pink-600 px-4 py-2 text-white hover:bg-pink-800"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditUserModal;
