import Image from 'next/image';
import React from 'react'

interface HeaderProps {
    title: string;
    description: string;
    image: string;
}

export default function Header({ title, description, image }: HeaderProps) {
    return (
        <section>
            <div className="flex flex-col space-y-12 px-4 py-[2rem] md:px-[10rem]">
                {/* text logo nya  */}
                <div className="flex flex-col border-l-4 border-[#1FA820] pl-4 md:pl-8">
                    <h1 className="text-[2rem] font-[900] uppercase tracking-widest md:text-[3rem]">
                        {title}
                    </h1>
                    <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
                        <h1 className="text-[2rem] font-thin uppercase tracking-widest text-stroke-1 text-stroke-black text-stroke-fill-white md:text-[3rem]">
                            Division
                        </h1>
                        <h1 className="text-justify text-[0.8rem] md:max-w-[20rem]">
                            {description}
                        </h1>
                    </div>
                </div>

                {/* gambarnya  */}
                <Image src={image} alt={`${title}'s Image`} width={1080} height={720} className='h-[200px] w-full rounded-lg md:h-[363px] md:w-[645px]' />
                {/* <div className="h-[200px] w-full rounded-lg bg-[#1FA820] md:h-[363px] md:w-[645px]"></div> */}
            </div>
        </section>
    )
}
