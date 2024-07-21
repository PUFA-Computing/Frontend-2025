import Image from "next/image";
import Banner from "@/assets/banner/visual-communication-design.svg";
import ListCard from "@/components/major/ListCard";
import LectureCard from "@/components/major/LectureCard";
import VnMSection from "@/components/major/VnMSection";
import { VCDLecture } from "@/lib/data";

export default function StudyProgramPage() {
    // Vision and Mission content
    const visionContent: string[] = [
        `Becoming the leading Visual Communication Design program in Indonesia in 2022, being able to compete globally, to adapt to advancement in computer technology and the new media of visual communication in the preservation of the richness of “Nusantara’s visual culture”.`,
    ];

    const missionContent: string[] = [
        "Building the entrepreneurial and leadership spirit within the Visual and Communication Study Program especially in the field of creativepreneurship.",
        "Delivering outstanding teaching and learning activities in the field of visual communication design which can compete at national and international level.",
        "Conducting excellent research and development in the field of of visual communication design especially to excavate the potential wealth of the visual culture of nusantara.",
        "Conducting community service and empowerment in the field of visual communication design, especially to preserve the richness of “Nusantara’s visual culture”",
    ];

    // List of professions
    const professions: string[] = [
        "Web Designer",
        "Visual Designer",
        "Graphic Designer",
        "Illustrator",
        "Creative Director",
        "Art Director",
    ];

    const deanAndHead = VCDLecture.filter(
        (lecture) =>
            lecture.position === "Dean Faculty of Computing" ||
            lecture.position === "Head of Study Program"
    );

    const otherLecturers = VCDLecture.filter(
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
                    Visual Communication Design (VCD) is a major of design study
                    focused on how to reflect the concept of communication using
                    visual design elements that deliver messages and impressions
                    toward specific purposes. Some of the elements are creative
                    expression, design techniques and media observation. The
                    purpose is to deliver informative, communicative and
                    persuasive messages which effectively affect the user’s
                    behavior.
                </h1>
            </div>

            {/* profession and future career part  */}
            <div className="flex w-full flex-col justify-between gap-8 md:flex-row">
                <div className="space-y-4">
                    <h1 className="font-[600]">Future Field and Career</h1>
                    <ListCard content={professions} />
                </div>

                <VnMSection
                    missionContent={missionContent}
                    visionContent={visionContent}
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
