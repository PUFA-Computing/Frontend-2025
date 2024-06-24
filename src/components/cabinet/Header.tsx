import Image from "next/image";
import React from "react";
import DOTTED from "@/assets/background/Path.png"

interface HeaderProps {
    title: string;
    description: string;
    image: string;
}

export default function Header({ title, description, image }: HeaderProps) {
    return (
        <section>
            <div className="flex flex-col space-y-12 bg-[#E5E7EB] px-4 py-[2rem] md:px-[10rem]">
                {/* text logo nya  */}
                <div className="flex flex-col border-l-4 border-[#1FA820] pl-4 md:pl-8">
                    <h1 className="text-[2rem] font-[900] uppercase tracking-widest md:text-[3rem]">
                        {title}
                    </h1>
                    <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
                        <h1 className="font-thin text-[2rem] uppercase tracking-widest text-stroke-1 text-stroke-black text-stroke-fill-white md:text-[3rem]">
                            Division
                        </h1>
                        <h1 className="text-justify text-[0.8rem] md:max-w-[20rem]">
                            {description}
                        </h1>
                    </div>
                </div>
                {/* gambarnya  */}
                <div className="relative py-5">
                    <Image
                        src={image}
                        alt={`${title}'s Image`}
                        width={1080}
                        height={720}
                        className="relative h-[200px] w-full rounded-lg md:h-[363px] md:w-[645px] z-30"
                    />

                    <Image
                        src={DOTTED}
                        alt="Dotted"
                        height={1080}
                        width={1920}
                        className="hidden md:block absolute top-[67px] left-[325px] z-10 h-[350px] w-[350px]"
                    />
                </div>


            </div>
        </section>
    );
}
