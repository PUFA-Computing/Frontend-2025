import Image from "next/image";
import ListCard from "@/components/major/ListCard";
import LectureCard from "@/components/major/LectureCard";
import VnMSection from "@/components/major/VnMSection";
import { majorPage } from "@/lib/page";
import { redirect } from "next/navigation";


interface StudyProgramPageProps {
    params: { slug: string };
}
export default function StudyProgramPage({ params }: StudyProgramPageProps) {
    const { slug } = params;

    const programData = majorPage.find((program) => program.slug === slug);

    if (!programData) {
        if (typeof window !== 'undefined') {
           redirect("/404")
        }
        return null;
    }

    const {
        image,
        vision,
        mission,
        profession,
        description,
        lecturers,
    } = programData;

    const deanAndHead = lecturers.filter(
        (lecture) =>
            lecture.position === "Head of Study Program" ||
            lecture.position === "Dean Faculty of Computing"
    );

    const otherLecturers = lecturers.filter(
        (lecture) =>
            lecture.position !== "Dean Faculty of Computing" &&
            lecture.position !== "Head of Study Program"
    );

    return (
        <section className="flex flex-col items-center space-y-12 p-6 md:px-[10rem]">
            <Image
                width={1280}
                height={500}
                src={image}
                alt={programData.name}
                className="rounded-lg bg-blue-400"
            />
            {/* study program description */}
            <div className="space-y-8">
                <h1 className="font-[600]">About Study Program</h1>
                <h1 className="text-justify leading-7">{description}</h1>
            </div>
            {/* profession and future career part  */}
            <div className="flex w-full flex-col justify-between gap-8 md:flex-row">
                <div className="space-y-4">
                    <h1 className="font-[600]">Future Field and Career</h1>
                    <ListCard content={profession} />
                </div>
                <VnMSection missionContent={mission} visionContent={vision} />
            </div>
            {/* big lecturers */}
            <div className="flex flex-col gap-8">
                <h1 className="font-[600]">Lecturers</h1>
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
