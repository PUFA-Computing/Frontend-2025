import Link from "next/link";
import Button from "@/components/Button";
import { StudyProgramDataProps } from "@/lib/common.type";

export default function StudyProgCard({
    title,
    article,
    link,
}: StudyProgramDataProps) {
    return (
        <div className="max-w-[18rem] translate-y-0 transform select-none rounded-xl border-2 border-[#FFD700]/50 bg-[#1E1E1E] p-5 text-center shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#FFD700] hover:bg-gradient-to-b hover:from-[#1E1E1E] hover:to-[#2D2D2D] hover:shadow-2xl hover:shadow-[#FFD700]/20">
            <p className="text-2xl font-semibold text-white md:text-base">{title}</p>
            <hr className="mx-auto mb-12 mt-4 w-24 border border-[#FFD700]/50 transition-all duration-300 group-hover:border-[#FFD700]" />
            <p className="my-16 hidden h-[8rem] text-gray-300 transition-colors duration-300 hover:text-white md:block">
                {article}
            </p>
            <Link href={link || "/"}>
                <Button className="mx-auto my-4 w-max border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black">
                    See Details
                </Button>
            </Link>
        </div>
    );
}