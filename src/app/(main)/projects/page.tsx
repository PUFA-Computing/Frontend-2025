import Link from "next/link";
import Button from "@/components/Button";
import { Metadata } from "next";
import { Suspense } from "react";
import ProjectsCard from "./_components/ProjectsCard";
import { Spinner } from "@/components/ui/Spinner";

export const revalidate = 600;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Projects",
};

export default async function ProjectsPage() {
    return (
        <div>
            {/* // title gray thingy */}
            <section className="bg-[#F2F2F2] p-10">
                <div className="mx-auto flex max-w-7xl flex-col border-l-4 border-[#FF6F22] pl-5 ">
                    <h1 className="text-[35px] font-[700] text-[#353535]">
                        Computing Projects
                    </h1>
                    <p className="text-sm font-[500] text-[#353535]">
                        The latest projects uploaded by computizens
                    </p>
                </div>
            </section>
            {/* // computing projects content */}
            <section className="mx-auto max-w-7xl p-5 py-[3rem] md:p-10">
                <div className="mb-5 flex items-center justify-between">
                    <h1 className="text-[1.2rem] font-black tracking-wide">
                        Latest
                    </h1>
                    <Link href={"/projects/new"}>
                        <Button>New Projects</Button>
                    </Link>{" "}
                </div>
                {/* the big project card */}
                <Suspense fallback={<Spinner />}>
                    <ProjectsCard />
                </Suspense>
            </section>
        </div>
    );
}
