import React from "react";
import AspirationsList from "@/app/(admin)/admin/aspirations/_components/AspirationsList";
import { fetchAspirations } from "@/services/api/aspiration";

const AspirationsPage = async () => {
    const aspirations = await fetchAspirations();

    return (
        <div>
            <h1>Aspirations List</h1>
            <AspirationsList aspirations={aspirations} />
        </div>
    );
};

export default AspirationsPage;
