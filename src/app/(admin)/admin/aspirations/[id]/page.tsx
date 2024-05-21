"use client";
import { GetAspirationById } from "@/services/api/aspiration";
import { useParams } from "next/navigation";
import ReplyAspirationsPage from "@/app/(admin)/admin/aspirations/[id]/_components/ReplyAspirationsPage";
import { useEffect, useState } from "react";

export default function ReplyPage() {
    const params = useParams<{ id: string }>();
    console.log(params.id);
    const id = parseInt(params.id, 10);
    console.log(id);

    const [aspiration, setAspiration] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetAspirationById(id)
            .then((data) => {
                setAspiration(data.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;

    if (!aspiration) return <div>Aspiration not found</div>;

    return (
        <section>
            <ReplyAspirationsPage aspiration={aspiration} />
        </section>
    );
}
