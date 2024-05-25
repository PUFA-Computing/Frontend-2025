import React from "react";

interface PUMASectionProps {
    title: string;
    slogan: string;
    cabinet: string;
}

function PUMASection({ title, slogan, cabinet }: PUMASectionProps) {
    return (
        <section className="hidden md:flex items-center justify-center py-4 sm:py-6 lg:py-8">
            <div className="mx-auto border-l-[5px] border-[#313131] text-[#353535]">
                <div className="px-4">
                    <h1 className="text-[40px] sm:text-[50px] md:text-[60px] font-[800] uppercase">
                        {title}
                    </h1>
                    <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-[600] capitalize">
                        {slogan}
                    </h2>
                    <p className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-[600] uppercase">
                        {cabinet}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default PUMASection;
