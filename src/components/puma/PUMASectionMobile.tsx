import Image from "next/image";
import React from "react";

interface PUMASectionMobileProps {
    logo: string;
    title: string;
    slogan: string;
    cabinet: string;
}

function PUMASectionMobile({ logo, title, slogan, cabinet }: PUMASectionMobileProps) {
    return (
        <section className="flex items-center justify-center py-4 sm:py-6 lg:py-8 md:hidden gap-4 px-2">
            <div className="w-[100px] h-[100px]">
                <Image
                    src={logo}
                    alt={`${title}'s Logo`}
                    width={1080}
                    height={1920}
                />
            </div>
            <div className="mx-auto border-l-[5px] border-[#313131] text-[#353535] text-justify">
                <div className="px-4">
                    <h1 className="font-[800] uppercase text-[24px]">
                        {title}
                    </h1>
                    <h2 className="text-[14px] font-[600] capitalize">
                        {slogan}
                    </h2>
                    <p className="text-[14px] font-[600] uppercase">
                        {cabinet}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default PUMASectionMobile;