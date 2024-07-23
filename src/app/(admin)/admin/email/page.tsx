import Button from "@/components/Button";
import React from "react";
import EmailBlastList from "./_components/EmailBlastList";
import { fetchAspirations } from "@/services/api/aspiration";

export default async function page() {
    const aspirations = await fetchAspirations();

    return (
        <section>
            <div>
                <Button className="border-[#02ABF3] bg-[#02ABF3] px-8 py-2 text-white hover:bg-white border hover:text-[#02ABF3]">
                    Create New Email Blast
                </Button>
            </div>

            <div className="py-4">
            <EmailBlastList aspirations={aspirations}/>
            </div>
        </section>
    );
}
