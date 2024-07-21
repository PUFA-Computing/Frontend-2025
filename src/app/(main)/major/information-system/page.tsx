import Image from "next/image";
import Banner from "@/assets/banner/information-system.svg";
import ListCard from "@/components/major/ListCard";
import LectureCard from "@/components/major/LectureCard";
import VnMSection from "@/components/major/VnMSection";
import { ISLecture } from "@/lib/data";

export default function StudyProgramPage() {
    // Vision and Mission content
    const visionContent: string[] = [
        "In the year 2022 to become the center of education and development of science and technology of information systems that excel in Indonesia, able to compete globally, and play an active role in supporting the industry.",
    ];

    const missionContent: string[] = [
        "Organizing education and teaching in the field of science and technology of information systems, especially in enterprise-level, which are of high quality.",
        "Conducting research and development in the field of science and technology of information systems, especially in the level of the enterprise, that supports the needs of the industry with high quality",
        "Carrying out community service and empowerment activities related to the field of information systems, especially at the enterprise level.",
        "Cooperating with industries, companies, government, and other institutions in the field of information systems, especially at the enterprise level.",
    ];

    // List of professions
    const professions: string[] = [
        "CIO (Chief Information Officer)",
        "Database Administrator",
        "System Analyst",
        "Information System Project Manager",
        "Information System Auditor",
        "Network Designer",
    ];

    const deanAndHead = ISLecture.filter(
        (lecture) =>
            lecture.position === "Dean Faculty of Computing" ||
            lecture.position === "Head of Study Program"
    );

    const otherLecturers = ISLecture.filter(
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
                    Information System Study Program has strong connections with
                    information science, computer science, business, and
                    technology as well as with project management. Bachelor in
                    Information Systems cover topics such as: programming,
                    databases, computer network, business process analysis,
                    information system project management, accounting,
                    enterprise resource planning, enterprise system, information
                    system analysis and design, testing and implementation,
                    e-commerce, e-business software technologies, web, and
                    interactive media design.
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
