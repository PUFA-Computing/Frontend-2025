import React from "react";

interface PUMAStructureCardProps {
  division: string;
  description: string;
}

export default function PUMAStructureCard({
  division,
  description,
}: PUMAStructureCardProps) {
  return (
    <div className="rounded-xl px-4 py-2 shadow-lg bg-white">
      <div className="flex items-center gap-2">
        <div className="h-[20px] w-[20px] rounded-full bg-gradient-to-br from-[#FFFFFF] to-[#353535]"></div>
        <h1 className="text-[1.2rem] font-[600] text-[#353535] uppercase py-2">
          {division}
        </h1>
      </div>
      <p className="text-[0.9rem] font-light capitalize text-[#6B7280] text-justify py-2">
        {description}
      </p>
    </div>
  );
}
