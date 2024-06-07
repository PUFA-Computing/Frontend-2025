import React from "react";

interface VisionAndMissionProps {
    visi: string;
    misi: string;
}

function VisionAndMission({ visi, misi }: VisionAndMissionProps) {
    // Memeriksa apakah teks misi memiliki lebih dari satu kalimat dengan titik
    const misiLines = misi.split(/\.\s+/);
    const misiContent = misiLines.length > 1 ? (
        <div className="text-justify text-[20px] font-[600] text-[#313131] md:col-span-2 lg:col-span-2 xl:col-span-2">
            {misiLines.map((line, index) => (
                <div key={index} className="flex items-start">
                    <div style={{ minWidth: "30px" }}>{index + 1}.</div>
                    <div className="ml-2">{line.trim()}{index !== misiLines.length - 1 && '.'}</div>
                </div>
            ))}
        </div>
    ) : (
        <p className="text-justify text-[20px] font-[600] text-[#313131] md:col-span-2 lg:col-span-2 xl:col-span-2">
            {misi}
        </p>
    );

    return (
        <section className="mx-auto w-full max-w-7xl p-4 lg:p-0">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 mb-10 ">
                <h1 className="font-montserrat text-[70px] font-[700] text-[#353535] mb-4">
                    Visi
                </h1>
                <p className="text-justify text-[20px] font-[600] text-[#313131] md:col-span-2 lg:col-span-2 xl:col-span-2">
                    {visi}
                </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                <h1 className="text-[70px] font-[700] text-[#353535] mb-4">
                    Misi
                </h1>
                {misiContent}
            </div>
        </section>
    );
}

export default VisionAndMission;