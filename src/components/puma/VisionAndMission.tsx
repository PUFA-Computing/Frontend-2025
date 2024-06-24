import React from "react";
import MissionSection from "./MissionSection";

interface VisionAndMissionProps {
    visi: string;
    misi: string[];
}

function VisionAndMission({ visi, misi }: VisionAndMissionProps) {
    return (
        <section className="mx-auto w-full max-w-7xl p-4 lg:p-0">
            <h1 className="flex justify-center pb-6 text-[32px] font-[700] uppercase sm:text-[40px]">
                VISION AND MISSION
            </h1>
            <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 ">
                <h1 className="font-montserrat mb-4 text-[70px] font-[700] text-[#353535]">
                    Visi
                </h1>
                <p className="text-justify text-[20px] font-[600] text-[#313131] md:col-span-2 lg:col-span-2 xl:col-span-2">
                    {visi}
                </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                <h1 className="mb-4 text-[70px] font-[700] text-[#353535]">
                    Misi
                </h1>
                <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
                    <MissionSection misi={misi} />
                </div>
            </div>
        </section>
    );
}

export default VisionAndMission;
