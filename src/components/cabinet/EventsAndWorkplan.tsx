import React from 'react'
import Button from "@/components/Button";

interface EventsAndWorkplanProps {
    buttons: string[];
}

export default function EventsAndWorkplan({ buttons }: EventsAndWorkplanProps) {
    return (
        <section>
            <div className="px-4 py-[3rem] md:px-[10rem] bg-black">
                <h1 className="text-center font-[700] text-black md:text-[2.25rem]">
                    Events and Workplan
                </h1>
                <div className="mx-auto grid grid-cols-1 gap-4 py-4 md:grid-cols-3 md:gap-10 md:py-[2rem]">
                    {buttons.map((button, index) => (
                        <Button
                            key={index}
                            className="rounded-full border border-[#FFD700] text-sm uppercase text-[#FFD700] hover:bg-[#FFD700] hover:text-black md:text-[1.563]"
                        >
                            {button}
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    )
}
