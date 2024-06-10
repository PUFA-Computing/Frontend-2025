import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { redirect } from "next/navigation";
import Image from "next/image";
import PUFALOGO from "@/assets/logo/PUFA_Computing.png";
import { getSessionServer } from "@/lib/auth";
import { AdminDashboardContextProvider } from "@/context/AdminDashboardContext";
import LayoutClientDashboard from "./_components/LayoutClient";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSessionServer();
    if (!session) return redirect("/auth/signin");

    const teams = [
        {
            id: 1,
            name: "PUFA Computing",
            href: "#",
            initial: "PUFA",
            current: false,
        },
        {
            id: 2,
            name: "PUMA Informatics",
            href: "#",
            initial: "PUMA",
            current: false,
        },
        {
            id: 3,
            name: "PUMA Information System",
            href: "#",
            initial: "PUMA",
            current: false,
        },
        {
            id: 4,
            name: "PUMA Visual Communication Design",
            href: "#",
            initial: "PUMA",
            current: false,
        },
        {
            id: 5,
            name: "PUMA Interior Design",
            href: "#",
            initial: "PUMA",
            current: false,
        },
    ];
    const userNavigation = [
        { name: "Your profile", href: "/../dashboard/profile" },
    ];

    if (session?.user.role_id === 2 || session?.user.role_id === 8) {
        return redirect("/");
    }

    return (
        <AdminDashboardContextProvider>
            <div>
                <LayoutClientDashboard teams={teams} />

                {/* Sidebar Desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                        <div className="flex h-24 shrink-0 items-center justify-center">
                            <Image
                                className="h-16 w-auto"
                                src={PUFALOGO}
                                width={200}
                                height={200}
                                alt="Your Company"
                            />
                        </div>

                        <Sidebar teams={teams} />
                    </div>
                </div>

                {/*Content*/}
                <div className="lg:pl-72">
                    <Header userNavigation={userNavigation} />

                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                    </main>
                </div>
            </div>
        </AdminDashboardContextProvider>
    );
}
