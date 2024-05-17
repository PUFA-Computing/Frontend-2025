'use client'
import EventStatusDashboard from "@/components/event/EventStatusDashboard";
import React, { useEffect, useState } from "react";
import { fetchUserEvents } from "@/services/api/user";
import Event from "@/models/event";

export default function RegisteredEvents() {
   const [events, setEvents] = useState<Event[]>([]);

   useEffect(() => {
      const userId = localStorage.getItem("userId")
      if (userId) {
         fetchUserEvents(userId).then((events) => {
            setEvents(events);
         });
      }
   }, []);

   return (
      <div className="overflow-hidden border border-gray-200 rounded-md">
         <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg:transparent">
            <tr className="text-center font-[500] text-[#353535]">
               <th scope="col" className="px-4 py-3.5 ">
                  Events Name
               </th>

               <th scope="col" className="px-12 py-3.5">
                  Organization
               </th>

               <th scope="col" className="py-3.5">
                  Status
               </th>

               <th scope="col" className="py-3.5">
                  Action
               </th>
            </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
               {events.map((event) => (
                  <tr key={event.id}>
                     <td className="whitespace-nowrap px-4 py-3.5 text-center">
                        {event.title}
                     </td>
                     <td className="whitespace-nowrap py-3.5 text-center">
                        {event.organization_id}
                     </td>
                     <td className="whitespace-nowrap py-3.5 text-center">
                        <EventStatusDashboard status={event.status} />
                     </td>
                     <td className="whitespace-nowrap py-3.5 text-center">
                        <button className="text-[#02ABF3] font-normal disabled:text-gray-500 cursor-not-allowed" disabled title="Coming Soon">Edit</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}