import Image from "next/image";
import React from "react";

interface BackgroundProps {
    image: string;
    logo: string;
}

function Background({ image, logo }: BackgroundProps) {
    return (
        <div className="relative hidden h-[600px] w-full overflow-hidden md:block">
            <div className="absolute -top-[60px] left-0 right-0 rotate-180 z-10">
                <svg className="w-full h-92" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#FBFBFB" d="M0,160L120,138.7C240,117,480,75,720,74.7C960,75,1200,117,1320,138.7L1440,160L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,310Z"></path>
                </svg>      
            </div>
            <Image
                src={image}
                alt="PUMA background"
                className="h-full w-full object-cover"
                height={1080}
                width={1920}
            />
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            <div className="absolute top-[340px] left-0 right-0 z-10">
                <svg className="w-full h-92" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#FBFBFB" d="M0,160L120,138.7C240,117,480,75,720,74.7C960,75,1200,117,1320,138.7L1440,160L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,310Z"></path>
                </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="flex h-[300px] w-[300px] items-center justify-center">
                    <Image
                        src={logo}
                        width={1920}
                        height={1080}
                        alt="PUMA Logo"
                        className="h-auto w-full rounded-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
}

export default Background;
