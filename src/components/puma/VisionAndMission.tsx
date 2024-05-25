import React from "react";

interface VisionAndMissionProps {
    visi: string;
    misi: string;
}

function VisionAndMission({ visi, misi }: VisionAndMissionProps) {
    // Memeriksa apakah teks misi memiliki lebih dari satu kalimat dengan titik
    const misiLines = misi.split(/\.\s+/);
    const misiContent = misiLines.length > 1 ? (
        <div className="text-justify text-[20px] font-[600] text-[#313131] col-span-2">
            {misiLines.map((line, index) => (
                <div key={index} className="flex items-start">
                    <div style={{ minWidth: "30px" }}>{index + 1}.</div>
                    <div className="ml-2">{line.trim()}{index !== misiLines.length - 1 && '.'}</div>
                </div>
            ))}
        </div>
    ) : (
        <p className="text-justify text-[20px] font-[600] text-[#313131] col-span-2">
            {misi}
        </p>
    );

    return (
        <section className="mx-auto w-full max-w-7xl">
            <div className="grid grid-cols-3 gap-6 mb-10">
                <h1 className="font-montserrat text-[70px] font-[700] text-[#353535] col-span-1 mb-4">
                    Visi
                </h1>
                <p className="text-justify text-[20px] font-[600] text-[#313131] col-span-2">
                    {visi}
                </p>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <h1 className="text-[70px] font-[700] text-[#353535] col-span-1 mb-4">
                    Misi
                </h1>
                {misiContent}
            </div>
        </section>
    );
}

export default VisionAndMission;
