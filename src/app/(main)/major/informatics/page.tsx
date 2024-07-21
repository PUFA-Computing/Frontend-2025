import Image from "next/image";
import Banner from "@/assets/banner/informatics.svg";
import ListCard from "@/components/major/ListCard";
import LectureCard from "@/components/major/LectureCard";
import { ITLecture } from "@/lib/data";
import VnMSection from "@/components/major/VnMSection";

export default function StudyProgramPage() {
    const visionContent: string[] = [
        "Becoming the center of excellence for informatics higher education and research in Indonesia, able to compete globally, and play an active role in supporting the industry.",
    ];

    const missionContent: string[] = [
        "To perform high-quality education and teaching in informatics that focuses in the field of informatics or other relevant sectors",
        "To carry out research and improvement in science and in the development of science, tools, or technology related to the study of informatics.",
        "To carry out social service and empowerment in the field of informatics or other relevant sectors.",
        "To cooperate with industries, companies, government, and other institutions in the field of informatics or other relevant sectors.",
        "To promote the spirit of entrepreneurship for students focusing on Startup Business related to and supported by information technology.",
    ];

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

    const deanAndHead = ITLecture.filter(
        (lecture) =>
            lecture.position === "Head of Study Program" ||
            lecture.position === "Dean Faculty of Computing"
    );

    const otherLecturers = ITLecture.filter(
        (lecture) =>
            lecture.position !== "Dean Faculty of Computing" &&
            lecture.position !== "Head of Study Program"
    );

    return (
        <>
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
                        Informatics are concerned with issues related to
                        advocating for users and meeting their needs within an
                        organizational and societal context through the
                        selection, creation, application, integration, and
                        administration of computing technologies, including the
                        installation of networks; network administration and
                        security; the design of web pages; the development of
                        multimedia resources; the installation of communication
                        components; the oversight of e-mail systems; and the
                        planning and management of the technology lifecycle by
                        which an organization’s technology is maintained,
                        upgraded, and replaced.
                    </h1>
                </div>
                {/* profession and future career part  */}
                <div className="flex  w-full flex-col justify-between gap-8 md:flex-row">
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
                    <div>
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
                </div>{" "}
            </section>
        </>
    );
}
