import EventCardPage from "@/components/event/EventCardPage";
import { fetchEvents } from "@/services/api/event";
import LogoOrganizationEventPage from "@/components/event/LogoOrganizationEventPage";
import PosterCardEventPage from "@/components/event/PosterCardEventPage";
import { Metadata } from "next";
import EventCardPageMobile from "@/components/event/EventCardMobile";

export const metadata: Metadata = {
   title: "PUFA Computing Events",
};
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function EventsPage() {
   const events = await fetchEvents();

   if (!events) return <div>Failed to fetch data...</div>;

   // Filter events related to PUFA Computing
   const pufaComputingEvents = events.filter(event => event.organization === "PUFA Computing");

   // Upcoming events sorted by end date
   const upcomingEvents = pufaComputingEvents
      .filter((event) => event.end_date.getTime() >= Date.now())
      .sort((a, b) => a.end_date.getTime() - b.end_date.getTime())
      .slice(0, 2);

   // All event sorted by end date exclude the first 2 upcoming events
   const allEvents = pufaComputingEvents
      .sort((a, b) => a.end_date.getTime() - b.end_date.getTime())
      .slice(2);

   return (
      <div>
         {/* title */}
         <section className="flex items-center bg-[#F2F2F2] px-[5rem] py-[2rem] md:px-[10rem]">
            <div className="border-l-4 border-[#E50D0D] pl-8">
               <h1 className="text-[2rem] font-[600]">Computer Science Events</h1>
               <h1 className="text-[0.8rem]">
                  Discover the latest updates on events in our faculty.
               </h1>
            </div>
         </section>

         {/* event highlights */}
         <section className="mx-auto max-w-7xl p-10">
            <h1 className="mb-5 text-[1.2rem] font-bold">Highlights</h1>

            {/* card section */}
            <div className="hidden md:block">
               <EventCardPage events={upcomingEvents} />
            </div>
            <div className="block md:hidden">
               <EventCardPageMobile events={upcomingEvents} />
            </div>
         </section>

         {/* all events section*/}
         <PosterCardEventPage events={allEvents} />

         <section className="mx-auto max-w-7xl">
            <div className="flex justify-between border-t-2 border-gray-100 py-2 text-gray-400">
               <div>
                  <button>Previous</button>
               </div>
               <div className="flex gap-8">
                  <button className="w-[1.5rem] border-t-2 border-[#3C99DC] text-[#3C99DC]">
                     1
                  </button>
                  <button>2</button>
                  <button>...</button>
                  <button>10</button>
               </div>
               <div>
                  <button>Next</button>
               </div>
            </div>
         </section>
      </div>
   );
}
