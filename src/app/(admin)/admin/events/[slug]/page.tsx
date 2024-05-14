import { fetchEventBySlug, updateEvent } from "@/services/api/event";
import { redirect } from "next/navigation";
import React from "react";

interface EditEventPage {
    params: { eventId: number  };
}

export default async function page({ params }: EditEventPage) {
    if (!params.eventId || params.eventId < 1) {
        return redirect("/404");
    }
    const editEvent = await updateEvent(params.eventId);

    if (!editEvent) {
        return redirect("/404");
    }

    return (
    <section>{editEvent.slug}</section>
);
}
