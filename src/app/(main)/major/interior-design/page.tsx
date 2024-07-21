import Image from "next/image";
import Banner from "@/assets/banner/interior-design.svg";
import React from "react";
import ListCard from "@/components/major/ListCard";
import LectureCard from "@/components/major/LectureCard";
import VnMSection from "@/components/major/VnMSection";
import { IDLecture } from "@/lib/data";

export default function StudyProgramPage() {
    // Vision and Mission content
    const visionContent: string[] = [
        "Becoming the leading Visual Communication Design program in Indonesia in 2022, being able to compete globally, to adapt to advancement in computer technology and the new media of visual communication in the preservation of the richness of 'Nusantara’s Visual culture'.",
    ];

    const missionContent: string[] = [
        "To perform high-quality education and teaching in informatics that focuses in the field of informatics or other relevant sectors",
        "To carry out research and improvement in science and in the development of science, tools, or technology related to the study of informatics.",
        "To carry out social service and empowerment in the field of informatics or other relevant sectors.",
        "To cooperate with industries, companies, government, and other institutions in the field of informatics or other relevant sectors.",
        "To promote the spirit of entrepreneurship for students focusing on Startup Business related to and supported by information technology.",
    ];

    // List of professions
    const professions: string[] = [
        "Professional IT",
        "Professional Programmer",
        "Database Engineer",
        "Network and Security Specialist",
        "Multimedia Designer and Animator",
        "IT Manager",
        "Technopreneur",
        "Researcher and Scientist",
    ];

    const deanAndHead = IDLecture.filter(
        (lecture) =>
            lecture.position === "Dean Faculty of Computing" ||
            lecture.position === "Head of Study Program"
    );

    const otherLecturers = IDLecture.filter(
        (lecture) =>
            lecture.position !== "Dean Faculty of Computing" &&
            lecture.position !== "Head of Study Program"
    );

    return (
        <section className="flex flex-col items-center space-y-12 p-6 md:px-[10rem]">
            <Image
                width={1280}
                height={500}
                src={Banner}
                alt={""}
                className="rounded-lg bg-blue-400"
            />

            {/* study program description */}
            <div className="space-y-8">
                <h1 className="font-[600]">About Study Program</h1>

                <h1 className="text-justify leading-7">
                    The Interior Design Study Program aims to educate students
                    to create a positive influence through both the creative
                    process and the engineering process. On how to produce
                    technical design in a space based on the principles of
                    robustness, usability, and beauty. The scope of learning
                    interior design science covers the scale of a single simple
                    building to a high-complexity building. President
                    University's Interior Design Study Program is designed to
                    instill the values of global competitiveness,
                    interdisciplinary thinking, entrepreneurial spirit, and to
                    also impart information technology skills in its students.
                </h1>
            </div>

            {/* profession and future career part  */}
            <div className="flex w-full flex-col justify-between gap-8 md:flex-row">
                <div className="space-y-4">
                    <h1 className="font-[600]">Future Field and Career</h1>
                    <ListCard content={professions} />
                </div>

                <VnMSection
                    visionContent={visionContent}
                    missionContent={missionContent}
                />
            </div>

            {/* big lecturers */}
            <div className="flex flex-col gap-8">
                <h1 className="font-[600]">Lecturers</h1>
                <div className="">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        {deanAndHead.map((lecture, index) => (
                            <LectureCard
                                key={index}
                                image={lecture.image.src}
                                name={lecture.name}
                                position={lecture.position}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
                {otherLecturers.map((lecture, index) => (
                    <LectureCard
                        key={index}
                        image={lecture.image.src}
                        name={lecture.name}
                        position={lecture.position}
                    />
                ))}
            </div>
        </section>
    );
}
