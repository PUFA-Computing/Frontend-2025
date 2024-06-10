import Link from "next/link";
import Event from "@/models/event";
import NoData from "@/components/ui/NoData";
import React from "react";
import Image from "next/image";

/**
 * PosterCardEventPage component represents a card with a poster image linked to a specific page.
 *
 * @component
 * @example
 * // Example usage of PosterCardEventPage component
 * <PosterCardEventPage
 *    link="/events/event-details"
 *    image="/path/to/poster.jpg"
 *    alt="Event Poster"
 * />
 *
 * @param {Object} props - The component props.
 * @param {string} props.link - The link to navigate to when the poster is clicked.
 * @param {string} props.image - The path to the poster image.
 * @param {string} props.alt - The alternative text for the poster image.
 * @returns {JSX.Element} React component
 */

interface PosterCardEventPageProps {
   slug: string;
   image: string;
   alt: string;
}

export default function PosterCardEventPage({ events }: { events: Event[] }) {
    if (events.length === 0) {
        return (
            <NoData
                title={"No Events Available"}
                message={"There are currently no upcoming events available. Please check back later."} />
        );
    }

   return (
      <section className="mx-auto max-w-7xl px-10 py-[5rem]">
         <h1 className="mb-[3rem] text-[1.2rem] font-bold">All Events</h1>
         <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {events.map((event) => (
               <Link href={`events/${event.slug}`} className="block w-full">
                  <div className="rounded-xl transition duration-300 hover:scale-105 hover:shadow-md">
                     <Image
                     height={1080}
                     width={1920}
                        className="h-[400px] w-full rounded-xl bg-center object-cover"
                        src={event.thumbnail}
                        alt={event.title}
                     />
                  </div>
               </Link>
            ))}
         </div>
      </section>
);
}
