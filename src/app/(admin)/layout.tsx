
import {
    CalendarIcon,
    BuildingStorefrontIcon,
    DocumentDuplicateIcon,
    HomeIcon,
    UsersIcon,
    NewspaperIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { usePathname, redirect } from "next/navigation";
import Image from "next/image";
import PUFALOGO from "@/assets/logo/PUFA_Computing.png";
import { getSessionServer } from "@/lib/auth";
import { DashobardContextProvider } from "@/context/DashboardContext";
import LayoutClientDashboard from "./_components/LayoutClient";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentPath = usePathname();
	 const session = await getSessionServer();

    const navigation = [
        {
            name: "Dashboard",
            href: "/admin",
            icon: HomeIcon,
            current: currentPath === "/admin",
        },
        {
            name: "Events",
            href: "/admin/events",
            icon: CalendarIcon,
            current: currentPath === "/admin/events",
        },
        {
            name: "News",
            href: "/admin/news",
            icon: NewspaperIcon,
            current: currentPath === "/admin/news",
        },
        {
            name: "Users",
            href: "/admin/users",
            icon: UsersIcon,
            current: currentPath === "/admin/users",
        },
        {
            name: "Aspirations",
            href: "/admin/aspirations",
            icon: DocumentDuplicateIcon,
            current: currentPath === "/admin/aspirations",
        },
        {
            name: "Merch",
            href: "/admin/merch",
            icon: BuildingStorefrontIcon,
            current: currentPath === "/admin/merch",
        },
    ];
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
        { name: "Your profile", href: "#" },
        { name: "Sign out", href: "#" },
    ];


	 if(session?.user.role_id === 2 || session?.user.role_id === 8) {
		 return redirect('/')
	 }

    return (
		<DashobardContextProvider>
        <div>

				<LayoutClientDashboard navigation={navigation} teams={teams} />

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

                    <Sidebar navigation={navigation} teams={teams} />
                </div>
            </div>

            {/*Content*/}
            <div className="lg:pl-72">
                <Header
                    userNavigation={userNavigation}
                />

                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </div>
		  </DashobardContextProvider>
    );
}
