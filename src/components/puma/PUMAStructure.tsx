import React from "react";
import PUMAStructureCard from "./PUMAStructureCard";

interface PUMAStructureProps {
  divisions: {
    division: string;
    description: string;
  }[];
  color1?: string;
  color2?: string;
}

export default function PUMAStructure({ divisions,color1,color2 }: PUMAStructureProps) {
  return (
    <section className="mx-auto max-w-7xl pb-16">
      <h1 className="flex justify-center py-6 text-[40px] font-[700] text-[#353535]">
        DIVISION
      </h1>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 px-4 md:px-0">
        {divisions.map((division, index) => (
          <PUMAStructureCard
            key={index}
            division={division.division}
            description={division.description}
            color1={color1}
            color2={color2}
          />
        ))}
      </div>
    </section>
  );
}
