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

    // Convert eventId to string
    const eventIdAsString = params.eventId.toString();

    // Fetch the existing event data by slug or ID
    const existingEvent = await fetchEventBySlug(eventIdAsString);

    if (!existingEvent) {
        return redirect("/404");
    }

    // Update the event data (you need to provide the eventData as the second argument)
    const updatedEvent = await updateEvent(eventIdAsString, existingEvent);

    if (!updatedEvent) {
        return redirect("/404");
    }

    // Render the updated event details
    return (
        <section>{updatedEvent.slug}</section>
    );
}
