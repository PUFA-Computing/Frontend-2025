import EventTable from "@/components/admin/EventTable";
import Title from "@/components/admin/Title";
import { fetchEvents } from "@/services/api/event";
import Link from "next/link";
import Button from "@/components/Button";

export default async function AdminEventsPage() {
    const events = await fetchEvents();

    if (!events) return <div>Failed to fetch data...</div>;
    return (
        <div>
            <Title title="Event Table" />
            <div className="flex justify-end mb-4">
                {/*Create Event*/}
                <Link href="/admin/events/create">
                    <Button>Create Event</Button>
                </Link>
            </div>
            <EventTable events={events} />
        </div>
    );
}
