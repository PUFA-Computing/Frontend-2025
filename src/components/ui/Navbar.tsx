/**
 * Navbar Component
 *
 * The Navbar component represents the navigation bar of the website, including links, dropdowns, and user authentication options.
 *
 * @component
 * @example
 * // Usage of the Navbar component in another React component or page
 * import Navbar from 'path/to/Navbar';
 * // Render the component
 * <Navbar />;
 */
"use client";

import Link from "next/link";
import { useState } from "react";
import NavbarDropdown from "./NavbarDropdown";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

/**
 * Navbar Component
 *
 * @returns {JSX.Element} - React element representing the Navbar.
 */
export default function Navbar() {
    // State for mobile menu and user authentication
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const session = useSession();

    // Navigation links for PUMA and Others sections
    const NavbarOthers = [
        {
            title: "Others",
            items: [
                {
                    title: "Aspirations",
                    href: "/aspiration",
                },
                {
                    title: "Merch",
                    href: "/merch",
                },
                {
                    title: "Our Partners",
                    href: "/partners",
                },
                {
                    title: "Projects",
                    href: "/projects",
                },
                {
                    title: "History",
                    href: "/history",
                },
                {
                    title: "Change Log",
                    href: "/change-log",
                },
            ],
        },
    ];

    const NavbarPuma = [
        {
            title: "PUMA",
            items: [
                {
                    title: "PUMA Informatics",
                    href: "/puma/puma-informatics",
                },
                {
                    title: "PUMA IS",
                    href: "/puma/puma-is",
                },
            ],
        },
    ];

    /**
     * Handle Logout
     *
     * Function to handle user logout.
     */
    const handleLogout = () => {
        signOut();
    };

    const dashboard = () => {
        window.location.href = "/dashboard";
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-24 items-center justify-between">
                    <div className="flex items-center gap-12 lg:divide-x-2 lg:divide-black">
                        <Link href="/">
                            <Image
                                alt="PU Computing"
                                src={Logo}
                                width="130"
                                height="80"
                            />
                        </Link>
                        <div className="hidden px-7 font-bold lg:block">
                            <div className="flex flex-col items-center">
                                <div className="flex-grow text-sm font-normal tracking-widest">
                                    President University
                                    <p
                                        className="text-sm font-normal"
                                        style={{ letterSpacing: "0.11em" }}
                                    >
                                        Faculty Association
                                    </p>
                                    <div
                                        className="text-center text-[19px] font-[700]"
                                        style={{ letterSpacing: "0.33em" }}
                                    >
                                        Computer Science
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="block lg:hidden">
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>

                    {isMobileMenuOpen && (
                        <div className="absolute left-0 right-0 top-24 bg-white shadow-md lg:hidden">
                            <nav aria-label="Global" className="p-4">
                                <ul className="text-md flex flex-col items-center gap-6 font-medium text-black">
                                    <li>
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li>
                                        <Link href="/events">Events</Link>
                                    </li>
                                    <li>
                                        <Link href="/news">News</Link>
                                    </li>
                                    <NavbarDropdown
                                        title="PUMA"
                                        items={NavbarPuma[0].items}
                                    />
                                    <NavbarDropdown
                                        title="Others"
                                        items={NavbarOthers[0].items}
                                    />
                                    <div>
                                        {session.status == "authenticated" ? (
                                            <>
                                                <button
                                                    onClick={dashboard} // Change onClick to dashboard function
                                                    className="mr-3 rounded-md border-2 border-[#0C8CE9] bg-white px-2 py-2.5 text-sm font-medium text-black duration-300 hover:bg-[#0C8CE9] hover:text-white md:px-5"
                                                >
                                                    Dashboard
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="mr-3 rounded-md border-2 border-[#0C8CE9] bg-white px-2 py-2.5 text-sm font-medium text-black duration-300 hover:bg-[#0C8CE9] hover:text-white md:px-5"
                                                >
                                                    Logout
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="mb-5">
                                                    <Link
                                                        className="my-6 mr-3 rounded-md bg-white px-2 py-2.5 font-medium text-black md:px-5"
                                                        href="/auth/signin"
                                                    >
                                                        Log in
                                                    </Link>
                                                </div>
                                                <Link
                                                    className="rounded-md bg-white px-2 py-2.5 font-medium text-black"
                                                    href="/auth/signup"
                                                >
                                                    Sign up
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </ul>
                            </nav>
                        </div>
                    )}

                    <div className="hidden lg:flex lg:items-center lg:gap-6">
                        <ul className="text-md flex flex-row items-center gap-6 font-medium text-black">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/events">Events</Link>
                            </li>
                            <li>
                                <Link href="/news">News</Link>
                            </li>
                            {NavbarPuma.map((item) => (
                                <NavbarDropdown
                                    title={item.title}
                                    items={item.items}
                                    key={item.title}
                                />
                            ))}
                            {NavbarOthers.map((item) => (
                                <NavbarDropdown
                                    title={item.title}
                                    items={item.items}
                                    key={item.title}
                                />
                            ))}
                            <li className="flex">
                                {session.status == "authenticated" ? (
                                    <>
                                        <button
                                            onClick={dashboard} // Change onClick to dashboard function
                                            className="mr-3 rounded-md border-2 border-[#0C8CE9] bg-white px-2 py-2.5 text-sm font-medium text-black duration-300 hover:bg-[#0C8CE9] hover:text-white md:px-5"
                                        >
                                            Dashboard
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="mr-3 rounded-md border-2 border-[#0C8CE9] bg-white px-2 py-2.5 text-sm font-medium text-black duration-300 hover:bg-[#0C8CE9] hover:text-white md:px-5"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {/*Animate the LogIn if hover appear from the right to left*/}
                                        <Link
                                            className="mr-3 rounded-md bg-white px-2 py-2.5 text-sm font-medium text-[#02ABF3] duration-300 hover:bg-[#02ABF3] hover:text-white md:px-5"
                                            href="/auth/signin"
                                        >
                                            Log in
                                        </Link>

                                        {/*Animat the SignUp if hover rounded border disappear from the right to left*/}
                                        <Link
                                            className={`rounded-md border-[1px] border-[#02ABF3] px-5 py-2.5 text-sm font-medium text-[#02ABF3] duration-300 hover:bg-[#02ABF3] hover:text-white`}
                                            href="/auth/signup"
                                        >
                                            Sign up
                                        </Link>
                                    </>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/*/!*Alpha Version Tag*!/*/}
            {/*<div className="bg-[#FF6F22] py-1 text-center text-sm text-white">*/}
            {/*    <span className="font-bold">Warning:</span> This is the version*/}
            {/*    Alpha 0.6.2, your data will be deleted on 27-04-2024*/}
            {/*</div>*/}
        </header>
    );
}
