import { redirect } from "next/navigation";
import React from "react";
import { fetchEventBySlug } from "@/services/api/event";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import Seperator from "@/components/Seperator";
import RegisterButton from "./_components/RegisterButton";
import { getSessionServer } from "@/lib/auth";

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
    const session = await getSessionServer();
    if (!session) return redirect("/auth/signin");

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
                <div className="mx-auto flex max-w-7xl flex-col border-l-4 border-[#FF6F22] pl-5 ">
                    <h1 className="font-extrabold text-[2rem] text-black">
                        <div className="flex items-center font-[700] text-[#353535]">
                            <Link href="../events" className="hover:underline">
                                Computing Events
                            </Link>
                            <IoIosArrowForward className="ml-2" />
                            {event.organization}
                        </div>
                    </h1>
                    <p className="text-[0.8rem] font-[400]">
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
                    <div className="flex justify-between px-5 py-2 text-[1.5rem] font-[600]">
                        <h1>{event.title}</h1>
                        <div>
                            <p className={registrationColor}>
                                {event.total_registered}{" "}
                                <span className="text-[#353535]">
                                    {" "}
                                    / {event.max_registration}{" "}
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
                    <div className="flex items-center justify-center pb-5 pt-3 ">
                        <RegisterButton
                            eventSlug={event.slug}
                            eventId={event.id}
                            eventTitle={event.title}
                            eventStatus={event.status}
                            userId={session?.user.id}
                            accessToken={session?.user.access_token}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
