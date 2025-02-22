import { redirect } from "next/navigation";
import React from "react";
import { fetchEventBySlug } from "@/services/api/event";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import Seperator from "@/components/Seperator";
import RegisterButton from "./_components/RegisterButton";

const description = (description: string) => {
    const lines = description.split("\n");
    return lines.map((line, index) => (
        <React.Fragment key={index}>
            {line}
            {index !== lines.length - 1 && <br />}
        </React.Fragment>
    ));
};

interface EventPageProps {
    params: { slug: string };
}

export default async function EventDetailsPage({ params }: EventPageProps) {
    if (!params.slug || params.slug.length < 1) {
        return redirect("/404");
    }
    const event = await fetchEventBySlug(params.slug);

    if (!event) {
        return redirect("/404");
    }

    const registrationPercentage =
        (event.total_registered / event.max_registration) * 100;

    let registrationColor = "text-green-500";
    if (registrationPercentage >= 80) {
        registrationColor = "text-red-500";
    } else if (registrationPercentage >= 50) {
        registrationColor = "text-yellow-500";
    }

    return (
        <div>
            <section className="bg-[#F2F2F2] p-10">
                <div className="mx-auto flex max-w-7xl flex-col border-l-4 border-[#FF6F22] pl-5">
                    <h1 className="font-extrabold text-2xl text-black md:text-3xl lg:text-4xl">
                        <div className="flex items-center font-bold text-[#353535]">
                            <Link href="../events" className="hover:underline">
                                Computing Events
                            </Link>
                            <IoIosArrowForward className="ml-2" />
                            {event.organization}
                        </div>
                    </h1>
                    <p className="text-xs font-normal md:text-sm lg:text-base">
                        The latest news about research, technology,
                        achievements, and campus life.
                    </p>
                </div>
            </section>

            <div className="mx-auto grid max-w-7xl items-start gap-6 py-6 md:grid-cols-2 lg:gap-12">
                <div className="w-full px-2 md:w-auto">
                    <div className="w-full scale-100 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
                        <Image
                            alt={`${event.title}'s poster`}
                            layout="responsive"
                            className="h-64 object-contain"
                            height={1080}
                            width={1920}
                            src={event.thumbnail}
                        />
                    </div>
                </div>

                {/* card details event  */}
                <div className="max-h-4xl w-full rounded-lg border border-[#CBCBCB] text-[#353535] md:w-auto">
                    <div className="flex flex-col items-center justify-between rounded-lg bg-white px-5 py-4 text-lg font-semibold md:flex-row md:text-xl lg:text-2xl">
                        <h1 className="text-center md:text-left">
                            {event.title}
                        </h1>
                        <div className="mt-2 md:mt-0">
                            <p
                                className={`${registrationColor} text-center md:text-right`}
                            >
                                {event.total_registered}
                                <span className="text-gray-800">
                                    {" "}
                                    / {event.max_registration}
                                </span>
                            </p>
                        </div>
                    </div>
                    <Seperator className="border-[#CBCBCB]" />
                    {/*Overflow for scroll if long*/}
                    <div className="max-h-[39rem] overflow-y-auto px-5 py-2">
                        <p className="px-5 py-2 text-justify text-[0.938rem] font-[400]">
                            {description(event.description)}
                        </p>
                    </div>
                    <Seperator className="border-[#CBCBCB]" />
                    <div className="flex items-center justify-center">
                        <RegisterButton
                            eventSlug={event.slug}
                            eventId={event.id}
                            eventTitle={event.title}
                            eventStatus={event.status}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
