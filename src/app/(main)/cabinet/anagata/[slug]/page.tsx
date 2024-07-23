import { divisionPage } from "@/lib/page";
import { redirect } from "next/navigation";
import React from "react";
import SwiperCard from "./_components/SwiperCard";
import EventsAndWorkplan from "@/components/cabinet/EventsAndWorkplan";
import Header from "@/components/cabinet/Header";

interface CabinetProps {
    params: { slug: string };
}

export default function page({ params }: CabinetProps) {
    const { slug } = params;

    const divisionData = divisionPage.find((divisions) => divisions.slug === slug);
    if (!divisionData) {
        if (typeof window !== 'undefined') {
            redirect("/404")
        }
        return null;
    }

    const { division, description, button, banner, member } = divisionData;

    return (
        <section>
            <Header
                title={division}
                description={description}
                image={banner.src}
            />
            <EventsAndWorkplan buttons={button} />
            {/* member */}
            <SwiperCard members={member} />
        </section>
    );
}
