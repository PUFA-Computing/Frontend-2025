import Title from "@/components/admin/Title";
import UserTable from "@/components/admin/UserTable";
import { GetUser } from "@/services/api/user";

export default async function page() {
    const users = await GetUser();
   

    if (!users) return <div>failed to fetch data</div>;

    return (
        <div>
            <Title title="User Table" />
            <UserTable />
        </div>
    );
}
