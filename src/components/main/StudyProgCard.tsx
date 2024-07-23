import Link from "next/link";
import Button from "@/components/Button";
import { StudyProgramDataProps } from "@/lib/common.type";

export default function StudyProgCard({
    title,
    article,
    link,
}: StudyProgramDataProps) {
    return (
        <div className="max-w-[16rem] translate-y-0 transform select-none rounded-xl border border-[#3C99DC] bg-white p-3 text-center shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:bg-gradient-to-t hover:from-sky-50 hover:via-sky-300/10 hover:to-white">
            <p className="text-2xl md:text-base">{title}</p>
            <hr className="mx-auto mb-12 mt-4 w-16 border border-[#3C99DC]" />
            <p className="my-16 hidden h-[8rem] md:block">{article}</p>
            <Link href={link || "/"}>
                <Button className="mx-auto my-4 w-max text-[#3C99DC]">
                    See Details
                </Button>
            </Link>
        </div>
    );
}
