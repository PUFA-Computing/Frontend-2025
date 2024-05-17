import React from "react";

/**
 * EventCardSection component represents a card for displaying information about an event.
 *
 * @component
 * @example
 * // Example usage of EventCardSection component
 * <EventCardSection
 *    title="Tech Symposium 2023"
 *    details="Join us for an exciting symposium on the latest in technology."
 *    status="Upcoming"
 *    participant="John Doe, Jane Smith"
 *    major="Computer Science"
 *    image="tech-symposium-2023.jpg"
 * />
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the event.
 * @param {string} props.details - Details or description of the event.
 * @param {string} props.status - The status of the event (e.g., Upcoming, Ongoing).
 * @param {string} props.participant - Participants or speakers in the event.
 * @param {string} props.major - The major or category of the event.
 * @param {string} props.image - The path to the image representing the event.
 * @returns {JSX.Element} React component
 */

interface EventCardSectionProps {
    title: string;
    details: string;
    status: string;
    participant: string;
    major: string;
    image: string;
}

export default function EventCardSection({
    title,
    details,
    status,
    major,
    participant,
    image,
}: EventCardSectionProps) {
    return (
        <div className="mt-5 inline-flex items-center text-left">
            <div className="relative flex h-[17rem] w-[32rem] rounded-lg shadow-xl">
                <div className="w-[48%]">{/* DO NOT EDIT */}</div>
                <div className="flex w-[52%] flex-col justify-between px-2 py-4">
                    <h1 className="text-[1.4rem] font-bold">{title}</h1>
                    <h2>{participant}</h2>
                    <div className="tex text-[0.8rem] font-light">
                        <p>{details}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-[0.8rem] font-bold">{major}</p>
                        <div className="rounded-2xl border border-[#E50D0D] px-2 text-[0.8rem] text-[#E50D0D]">
                            <p>{status}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute h-[19rem] w-[15rem] rounded-lg shadow-xl">
                <img
                    className="h-full w-full rounded-lg object-cover"
                    src={`../events/${image}`}
                    alt={`${title}'s image`}
                />
            </div>
        </div>
    );
}
