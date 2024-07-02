import Image from "next/image";
import React from "react";

interface LogoSectionProps {
    image: string;
    title: string;
    description: string;
}

export default function LogoSection({
    image,
    title,
    description,
}: LogoSectionProps) {
    return (
        <section className="mx-auto max-w-7xl pb-16 text-[#353535] px-4 sm:px-6 lg:px-8">
            <h1 className="flex justify-center text-[32px] sm:text-[40px] font-[700] uppercase py-6">
                logo philosophy
            </h1>
             <div className="flex flex-col lg:flex-row text-[24px] sm:text-[30px] font-[700] gap-4 py-6">
                <Image
                    src={image}
                    alt={`${title}'s logo`}
                    height={1080}
                    width={1920}
                    className="h-[200px] sm:h-[250px] w-[200px] sm:w-[250px] rounded-lg bg-black mx-auto lg:mx-0"
                />
                <div className="flex flex-col items-center lg:items-start">
                    <h1 className="inline-block rounded-lg border-2 border-[#353535] p-1 text-[24px] sm:text-[30px]">
                        {title}
                    </h1>
                    <p className="font-[600] text-[16px] sm:text-[20px] text-justify mt-2 sm:mt-4">
                        {description}
                    </p>
                </div>
            </div>
        </section>
    );
}
