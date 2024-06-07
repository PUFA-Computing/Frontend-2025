import React from "react";

interface AboutProps {
    content: string;
}

function About({ content }: AboutProps) {
    return (
        <section className="flex flex-col items-center justify-center px-4 py-8 sm:py-12 lg:py-16">
            <h1 className="text-[40px] sm:text-[50px] font-[700] text-[#353535] text-center">About</h1>
            <div className="max-w-7xl w-full">
                <article className="py-6 sm:py-8 md:py-10 text-justify text-[18px] sm:text-[20px] md:text-[22px] lg:text-[25px] font-[600] text-[#376853]">
                    {content}
                </article>
            </div>
        </section>
    );
}

export default About;
