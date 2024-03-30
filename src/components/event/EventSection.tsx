import { fetchEvents } from "@/services/api/event";
import Link from "next/link";
import Button from "@/components/Button";
import EventCardUpcoming from "@/components/event/EventCardUpcoming";
import EventCardCompleted from "@/components/event/EventCardCompleted";
import EventCardMobile from "./EventCardMobile";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function EventSection() {
    const events = await fetchEvents();

    if (!events) return <div>Failed to fetch data...</div>;

    const today: Date = new Date();

    // 2 Highlighted Closest Events either upcoming or open
    const upcomingEvents = events
        .filter((event) => new Date(event.end_date) >= today)
        .sort(
            (a, b) =>
                new Date(a.end_date).getTime() - new Date(b.end_date).getTime()
        )
        .slice(0, 2);

    const completedEvents = events
        .filter((event) => new Date(event.end_date) < today)
        // Mengambil tiga acara yang paling baru berakhir
        .sort(
            (a, b) =>
                new Date(b.end_date).getTime() - new Date(a.end_date).getTime()
        )
        .slice(0, 3);

    return (
        <div>
            <div className="hidden md:block">
                <EventCardUpcoming events={upcomingEvents} />
            </div>
            <div className="block px-[1rem] md:hidden">
                <EventCardMobile events={upcomingEvents} />
            </div>
            <div className="mt-16">
                <EventCardCompleted events={completedEvents} />
            </div>
        </div>
    );
}
