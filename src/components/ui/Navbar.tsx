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
import { useState, useEffect } from "react";
import NavbarDropdown from "./NavbarDropdown";
import Logo from "@/assets/PUComSci.png";
import PUMA_IS from "@/assets/logo/PUMA_IS.png";
import PUMA_IT from "@/assets/logo/PUMA_IT.png";
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
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const session = useSession();

    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > lastScrollY && window.scrollY > 100) { // Scrolling down & past 100px
                setVisible(false);
            } else { // Scrolling up
                setVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', controlNavbar);
        
        // Cleanup
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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
        <>
            {/* Profile Menu in Top Right */}
            <div className={`fixed right-4 sm:right-12 top-8 z-50 transition-all duration-500 ${visible ? 'translate-y-0' : '-translate-y-32'}`}>
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className={`rounded-full bg-black/90 p-2.5 transition-all duration-300 hover:scale-105 ${isProfileOpen ? 'bg-white/10' : ''}`}
                    >
                        <svg
                            className="h-6 w-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </button>

                    {/* Profile Dropdown */}
                    <div className={`absolute right-0 mt-3 w-52 rounded-xl bg-black/95 py-2 shadow-xl backdrop-blur-sm transition-all duration-300 ${isProfileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                        {session.status === "authenticated" ? (
                            <>
                                <button
                                    onClick={dashboard}
                                    className="block w-full px-4 py-2.5 text-left text-sm text-white hover:bg-white/10"
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full px-4 py-2.5 text-left text-sm text-white hover:bg-white/10"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth/signin"
                                    className="block px-4 py-2.5 text-sm text-white hover:bg-white/10"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="block px-4 py-2.5 text-sm text-white hover:bg-white/10"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <header className={`fixed left-1/2 top-8 z-40 -translate-x-1/2 transition-all duration-500 ${visible ? 'translate-y-0' : '-translate-y-32'}`}>
                <nav className={`relative flex h-14 items-center justify-center transition-all duration-500 ${isMenuOpen ? 'w-[300px] sm:w-[500px]' : 'w-[300px]'} rounded-full bg-black/90 overflow-visible border border-white/40`}>
                    {/* PUMA Informatics Logo - Left */}
                    <div className={`absolute left-0 z-50 transition-all duration-700 ease-in-out ${isMenuOpen ? 'opacity-0 -translate-x-24 scale-50' : 'opacity-100 translate-x-0 scale-100 animate-fade-in-left'}`}>
                        <Link href="/puma/puma-informatics">
                            <div className="group flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
                                <div className="relative h-[50px] w-[50px] transition-transform duration-500 group-hover:rotate-12">
                                    <Image
                                        alt="PUMA Informatics"
                                        src={PUMA_IT}
                                        width="50"
                                        height="50"
                                        className="pointer-events-none"
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* PUMA IS Logo - Right */}
                    <div className={`absolute right-0 z-50 transition-all duration-700 ease-in-out ${isMenuOpen ? 'opacity-0 translate-x-24 scale-50' : 'opacity-100 translate-x-0 scale-100 animate-fade-in-right'}`}>
                        <Link href="/puma/puma-is">
                            <div className="group flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
                                <div className="relative h-[50px] w-[50px] transition-transform duration-500 group-hover:rotate-12">
                                    <Image
                                        alt="PUMA IS"
                                        src={PUMA_IS}
                                        width="50"
                                        height="50"
                                        className="pointer-events-none"
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Main Logo in center circle */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                        <div 
                            onClick={toggleMenu}
                            className="group flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                        >
                            <div className={`relative transition-transform duration-700 ease-in-out ${!isMenuOpen ? 'rotate-0' : 'rotate-180'}`}>
                                <Image
                                    alt="PU Computing"
                                    src={Logo}
                                    width="44"
                                    height="44"
                                    className="pointer-events-none"
                                    style={{ filter: 'brightness(0)' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Left Navigation Items */}
                    <div className={`pointer-events-none flex items-center space-x-6 sm:space-x-10 pr-12 sm:pr-20 text-white transition-all duration-500 ${!isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100 pointer-events-auto'}`}>
                        <Link href="/" className="group relative text-sm sm:text-[15px] font-medium tracking-wide">
                            <span className="relative inline-block transition-all duration-300 group-hover:text-white group-hover:animate-cyber-glow">
                                Home
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-white/0 via-white to-white/0 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                            </span>
                            <span className="absolute inset-0 w-full h-0.5 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-hover:animate-scanline pointer-events-none"></span>
                        </Link>
                        <Link href="/events" className="group relative text-sm sm:text-[15px] font-medium tracking-wide">
                            <span className="relative inline-block transition-all duration-300 group-hover:text-white group-hover:animate-cyber-glow">
                                Events
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-white/0 via-white to-white/0 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                            </span>
                            <span className="absolute inset-0 w-full h-0.5 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-hover:animate-scanline pointer-events-none"></span>
                        </Link>
                    </div>

                    {/* Right Navigation Items */}
                    <div className={`pointer-events-none flex items-center space-x-6 sm:space-x-10 pl-12 sm:pl-20 text-white transition-all duration-500 ${!isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100 pointer-events-auto'}`}>
                        <Link href="/news" className="group relative text-sm sm:text-[15px] font-medium tracking-wide">
                            <span className="relative inline-block transition-all duration-300 group-hover:text-white group-hover:animate-cyber-glow">
                                News
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-white/0 via-white to-white/0 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                            </span>
                            <span className="absolute inset-0 w-full h-0.5 bg-white/20 transform scale-x-0 group-hover:scale-x-100 group-hover:animate-scanline pointer-events-none"></span>
                        </Link>
                        <div className="relative group">
                            <button className="group relative text-sm sm:text-[15px] font-medium tracking-wide">
                                <span className="relative inline-block transition-all duration-300 group-hover:text-white group-hover:animate-cyber-glow">
                                    Others
                                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-white/0 via-white to-white/0 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                                </span>
                                <svg
                                    className="ml-1 h-2 w-2 sm:h-3 sm:w-3 inline-block transition-transform duration-300 group-hover:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            <div className="absolute right-0 mt-2 opacity-0 invisible w-48 rounded-xl bg-black/95 backdrop-blur-lg border border-white/10 py-2 shadow-xl transform transition-all duration-300 scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100">
                                <div className="py-2">
                                    {NavbarOthers[0].items.map((item) => (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            className="group/item relative block px-4 py-2 text-sm transition-all duration-300 hover:bg-white/5"
                                        >
                                            <span className="relative inline-block transition-all duration-300 text-white/80 group-hover/item:text-white">
                                                {item.title}
                                                <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white to-transparent transform scale-x-0 transition-transform duration-300 group-hover/item:scale-x-100"></span>
                                            </span>
                                            <span className="absolute inset-0 w-full h-0.5 bg-white/20 transform scale-x-0 group-hover/item:scale-x-100 group-hover/item:animate-scanline pointer-events-none"></span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="absolute right-4 rounded p-2 text-white hover:text-gray-300 lg:hidden"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div className={`absolute left-0 right-0 mt-2 rounded-lg bg-black/90 backdrop-blur-sm transform transition-all duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-y-2 opacity-100' : 'translate-y-[-10px] opacity-0 pointer-events-none'}`}>
                    <div className="flex flex-col p-4 text-white">
                        <Link href="/" className="py-2.5 text-sm font-medium hover:text-gray-300 transition-colors border-b border-white/10">
                            Home
                        </Link>
                        <Link href="/events" className="py-2.5 text-sm font-medium hover:text-gray-300 transition-colors border-b border-white/10">
                            Events
                        </Link>
                        <Link href="/news" className="py-2.5 text-sm font-medium hover:text-gray-300 transition-colors border-b border-white/10">
                            News
                        </Link>
                        {NavbarOthers[0].items.map((item, index) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={`py-2.5 text-sm font-medium hover:text-gray-300 transition-colors ${index !== NavbarOthers[0].items.length - 1 ? 'border-b border-white/10' : ''}`}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </header>
        </>
    );
}
                           