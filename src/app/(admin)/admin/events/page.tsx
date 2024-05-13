import EventTable from "@/components/admin/EventTable";
import Title from "@/components/admin/Title";
import { fetchEvents } from "@/services/api/event";

export default async function page() {
    const events = await fetchEvents();

    if (!events) return <div>Failed to fetch data...</div>;
    return (
        <div>
            <Title title="Event Table" />
            <EventTable  events={events}/>
        </div>
    );
}
