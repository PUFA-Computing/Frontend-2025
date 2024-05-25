import Image from "next/image";
import React from "react";

interface BackgroundProps {
    image: string;
    logo: string;
}

function Background({ image, logo }: BackgroundProps) {
    return (
        <div className="relative h-[540px] w-full overflow-hidden hidden md:block">
            <Image
                src={image}
                alt="PUMA background"
                className="h-full w-full object-cover"
                height={1080}
                width={1920}
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] flex items-center justify-center">
                    <Image
                        src={logo}
                        width={1920}
                        height={1080}
                        alt="PUMA Logo"
                        className="w-full h-auto object-contain rounded-full animate-logo"
                    />
                </div>
            </div>
        </div>
    );
}

export default Background;
