"use client";
import Title from "@/components/admin/Title";
import UserTable from "@/components/admin/UserTable";
import { GetUser } from "@/services/api/user";
import React from "react";
import User from "@/models/user";

export default function UsersList() {
    const [users, setUsers] = React.useState<User[]>([]);

    React.useEffect(() => {
        async function fetchUsers() {
            try {
                const users = await GetUser();
                setUsers(users);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUsers().then((r) => r);
    }, []);

    return (
        <div>
            <Title title="Users" />
            <UserTable users={users} />
        </div>
    );
}
