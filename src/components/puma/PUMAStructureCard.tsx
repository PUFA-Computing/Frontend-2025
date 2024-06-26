import React from "react";

interface PUMAStructureCardProps {
    division: string;
    description: string;
    color1?: string;
    color2?: string;
}

export default function PUMAStructureCard({
    division,
    description,
    color1,
    color2,
}: PUMAStructureCardProps) {
    return (
        <div
            className={`rounded-xl bg-white px-4 py-2 shadow-lg duration-300 hover:shadow-xl hover:shadow-${color2}`}
        >
            <div className="flex items-center gap-2">
                <div
                    className={`h-[20px] w-[20px] rounded-full bg-gradient-to-br from-${color1} to-${color2}`}
                ></div>
                <h1 className="py-2 text-[1.2rem] font-[600] uppercase text-[#353535]">
                    {division}
                </h1>
            </div>
            <p className="py-2 text-justify text-[0.9rem] font-light capitalize text-[#6B7280]">
                {description}
            </p>
        </div>
    );
}
