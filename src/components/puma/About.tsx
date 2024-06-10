import React from "react";

interface AboutProps {
    content: string;
}

function About({ content }: AboutProps) {
    return (
        <section className="flex flex-col items-center justify-center px-4 py-8 sm:py-12 lg:py-16">
            <h1 className="text-center text-[40px] font-[700] text-[#353535] sm:text-[50px]">
                About
            </h1>
            <div className="w-full max-w-7xl">
                <article className="py-6 text-justify text-[18px] font-[600] text-[#353535] sm:py-8 sm:text-[20px] md:py-10 md:text-[22px] lg:text-[25px]">
                    {content}
                </article>
            </div>
        </section>
    );
}

export default About;
