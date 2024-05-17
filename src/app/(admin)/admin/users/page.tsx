"use client"
import Title from "@/components/admin/Title";
import UserTable from "@/components/admin/UserTable";
import { GetUser } from "@/services/api/user";
import React from "react";
import User from "@/models/user";

export default function Page() {
    const [users, setUsers] = React.useState<User[]>([]);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const usersData = await GetUser();
                if (usersData) {
                    setUsers(usersData);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <Title title="Users" />
            <UserTable users={users} />
        </div>
    );
}
