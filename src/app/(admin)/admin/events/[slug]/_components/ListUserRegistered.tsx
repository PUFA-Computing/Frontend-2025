import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import User from "@/models/user";
import { fetchUsersRegistered } from "@/services/api/event";
import Image from "next/image";
import { CircularProgress } from "@/components/ui/CircularProgress";

interface ListUserRegisteredProps {
    eventId: number;
}

export default function ListUserRegistered({
    eventId,
}: ListUserRegisteredProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const session = useSession();

    useEffect(() => {
        const getUsers = async () => {
            if (!session.data) {
                return;
            }
            try {
                const fetchedUsers = await fetchUsersRegistered(
                    eventId,
                    session.data.user.access_token
                );
                setUsers(fetchedUsers);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        };
        getUsers().then((r) => r);
    }, [eventId, session.data]);

    if (loading) {
        return <CircularProgress />;
    }

    // If there are no users registered for the event, display a message
    if (!users) {
        return <div className="px-4 py-6 sm:px-4 ">No users registered.</div>;
    }

    return (
        <div className="px-4 py-6 sm:px-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                    >
                        <div className="flex-shrink-0">
                            <Image
                                src={
                                    user.profile_picture ||
                                    "https://sg.pufacomputing.live/Assets/male.jpegg"
                                }
                                alt={`${user.first_name} Avatar`}
                                className="h-12 w-12 rounded-full"
                                width={48}
                                height={48}
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="focus:outline-none">
                                <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                />
                                <p className="text-sm font-medium text-gray-900">
                                    {user.first_name} {user.last_name}
                                    {user.major && (
                                        <span className="text-gray-500">
                                            {" "}
                                            -{" "}
                                            {user.major.charAt(0).toUpperCase()}
                                            {user.major.slice(1)} {user.year}
                                        </span>
                                    )}
                                </p>
                                <p className="truncate text-sm text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                            {user.additional_notes && (
                                <div className="mt-1 text-sm text-gray-500">
                                    <span className="font-medium">
                                        Additional Notes:
                                    </span>{" "}
                                    {user.additional_notes}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
