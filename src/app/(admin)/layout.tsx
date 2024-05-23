"use client";
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import {
    CalendarIcon,
    BuildingStorefrontIcon,
    DocumentDuplicateIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
    NewspaperIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import PUFALOGO from "@/assets/logo/PUFA_Computing.png";
import { GetUserProfile } from "@/services/api/user";
import { Spinner } from "@/components/ui/Spinner";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentPath = usePathname();

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

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [userName, setUserName] = useState<string>("");
    const [userRole, setUserRole] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const userToken = localStorage.getItem("access_token");
        if (userToken) {
            setIsLoggedIn(true);
            fetchUserProfile().then((r) => r);
            setLoading(false);
        } else {
            setIsLoggedIn(false);
            setLoading(false);
            router.push("/auth/signin");
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await GetUserProfile();
            setUserRole(response.role_id);
            setLoading(false);
            setUserName(`${response.first_name} ${response.last_name}`);
            if (response.role_id === 2 && response.role_id === 8) {
                // Assuming 1 is the admin role
                setLoading(false);
                router.push("/");
            }
        } catch (error) {
            console.error("Error fetching user profile", error);
            setLoading(false);
            router.push("/auth/signin");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner className="text-sky-500">
                    <span className="text-sky-500">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (userRole === 2 || userRole === 8) {
        return router.push("/");
    }

    return (
        <div>
            <Transition show={sidebarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50 lg:hidden"
                    onClose={setSidebarOpen}
                >
                    <TransitionChild
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </TransitionChild>

                    <div className="fixed inset-0 flex">
                        <TransitionChild
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <TransitionChild
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button
                                            type="button"
                                            className="-m-2.5 p-2.5"
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </TransitionChild>
                                {/* Sidebar component, swap this element with another sidebar if you like */}
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                                    <div className="flex h-24 shrink-0 items-center justify-center">
                                        <Image
                                            className="h-16 w-auto"
                                            src={PUFALOGO}
                                            width={200}
                                            height={200}
                                            alt="Your Company"
                                        />
                                    </div>
                                    <Sidebar
                                        navigation={navigation}
                                        teams={teams}
                                    />
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>

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
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
