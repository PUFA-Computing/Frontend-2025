import React from 'react'
import Button from "@/components/Button";

interface EventsAndWorkplanProps {
    buttons: string[];
}

export default function EventsAndWorkplan({ buttons }: EventsAndWorkplanProps) {
    return (
        <section>
            <div className="px-4 py-[3rem] md:px-[10rem]">
                <h1 className="text-center font-[700] text-[#353535] md:text-[2.25rem]">
                    Events and Workplan
                </h1>
                <div className="mx-auto grid grid-cols-1 gap-4 py-4 md:grid-cols-3 md:gap-10 md:py-[2rem]">
                    {buttons.map((button, index) => (
                        <Button
                            key={index}
                            className="rounded-full border border-[#1FA820] hover:text-[#FBFBFB] text-sm uppercase text-[#1FA820] hover:bg-[#1FA820] md:text-[1.563]"
                        >
                            {button}
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    )
}
