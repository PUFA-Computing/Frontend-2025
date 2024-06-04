import AdminEventDetails from "@/app/(admin)/admin/events/[slug]/_components/AdminEventDetails";
import Title from "@/components/admin/Title";

export default async function AdminEventDetailsPage() {
    return (
        <div>
            <Title title="Event Details" />
            <AdminEventDetails />
        </div>
    );
}
