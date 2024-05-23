import React from "react";
import RegisteredEvents from "@/app/(main)/dashboard/events/_components/RegisteredEvents";

export default function Page() {
    return (
        <div className="container mx-auto px-4">
            <div className="mt-6 flex flex-col bg-white">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        {/*Title List of event registered*/}
                        <h1 className="text-center text-2xl font-semibold text-[#353535]">
                            List of Event Registered
                        </h1>
                        <RegisteredEvents />
                    </div>
                </div>
            </div>
        </div>
    );
}
