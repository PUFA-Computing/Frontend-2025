"use client";
import { access } from "fs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Spinner } from "@/components/ui/Spinner";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const userToken = localStorage.getItem("access_token");
        if (userToken) {
            setIsLoggedIn(true);
        } else {
            router.push("/auth/signin");
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640); // Tailwind's `sm` breakpoint is 640px
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        setIsLoading(false);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        setIsMenuOpen(!isMobile);
    }, [isMobile]);

    const LINKS = [
        {
            name: "Profile",
            link: "/dashboard/profile",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M12 4.35418C12.7329 3.52375 13.8053 3 15 3C17.2091 3 19 4.79086 19 7C19 9.20914 17.2091 11 15 11C13.8053 11 12.7329 10.4762 12 9.64582M15 21H3V20C3 16.6863 5.68629 14 9 14C12.3137 14 15 16.6863 15 20V21ZM15 21H21V20C21 16.6863 18.3137 14 15 14C13.9071 14 12.8825 14.2922 12 14.8027M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
                        stroke="#9CA3AF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            name: "Events",
            link: "/dashboard/events",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7H13L11 5H5C3.89543 5 3 5.89543 3 7Z"
                        stroke="#9CA3AF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        // {
        //     name: "News",
        //     link: "/dashboard/news",
        //     icon: (
        //         <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             width="24"
        //             height="24"
        //             viewBox="0 0 24 24"
        //             fill="none"
        //         >
        //             <path
        //                 d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
        //                 stroke="#9CA3AF"
        //                 strokeWidth="2"
        //                 strokeLinecap="round"
        //                 strokeLinejoin="round"
        //             />
        //         </svg>
        //     ),
        // },
        {
            name: "Projects",
            link: "/dashboard/projects",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M20 13V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V13M20 13V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V13M20 13H17.4142C17.149 13 16.8946 13.1054 16.7071 13.2929L14.2929 15.7071C14.1054 15.8946 13.851 16 13.5858 16H10.4142C10.149 16 9.89464 15.8946 9.70711 15.7071L7.29289 13.2929C7.10536 13.1054 6.851 13 6.58579 13H4"
                        stroke="#9CA3AF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            name: "Reports",
            link: "/dashboard/reports",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M9 19V13C9 11.8954 8.10457 11 7 11H5C3.89543 11 3 11.8954 3 13V19C3 20.1046 3.89543 21 5 21H7C8.10457 21 9 20.1046 9 19ZM9 19V9C9 7.89543 9.89543 7 11 7H13C14.1046 7 15 7.89543 15 9V19M9 19C9 20.1046 9.89543 21 11 21H13C14.1046 21 15 20.1046 15 19M15 19V5C15 3.89543 15.8954 3 17 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H17C15.8954 21 15 20.1046 15 19Z"
                        stroke="#9CA3AF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
    ];

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner className="text-sky-500">
                    <span className="text-sky-500">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            {isLoggedIn && (
                <aside
                    className={`fixed bottom-0 left-0 top-0 z-10 mt-[100px] h-screen w-64 min-w-[200px] bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                        isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <div className="flex items-center justify-between p-3">
                        <p className="text-lg font-bold">Dashboard</p>
                    </div>
                    <div className="ml-2 mt-4 space-y-6">
                        {LINKS.map((link, index) => (
                            <Link
                                key={index}
                                className="flex items-center text-[14px]"
                                href={link.link}
                            >
                                {link.icon && (
                                    <span className="mr-2">{link.icon}</span>
                                )}
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </aside>
            )}

            {/* Main content */}
            <main
                className={`flex-1 overflow-x-auto overflow-y-auto p-4 transition-transform duration-300 ease-in-out ${isMenuOpen ? "ml-64" : "ml-0"}`}
            >
                {children}
            </main>

            {/* Toggle button */}
            <button
                className="fixed bottom-4 left-4 z-30 rounded-full bg-sky-500 p-2 text-white shadow-md"
                onClick={toggleMenu}
            >
                {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
        </div>
    );
}
