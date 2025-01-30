import React from "react";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { Version } from "@/models/version";

export default function Footer({ version }: { version: Version }) {
    return (
        <footer className="mx-auto max-w-7xl bg-white pt-8">
            <div className="container mx-auto px-6 py-12">
                <hr className="my-4 border-gray-200 dark:border-gray-700" />
                <div className="md:-mx-3 md:flex md:items-center md:justify-between">
                    <div className="md:mx-3 xl:text-sm dark:text-white">
                        <div className="text-sm font-semibold tracking-widest text-[#0C8CE9]">
                            SUBSCRIBE TO OUR NEWSLETTER
                        </div>
                        <div className="mt-2 text-sm font-normal tracking-widest text-[#6B7280]">
                            The latest news, information, and updates, sent to
                            your inbox directly.
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col justify-center space-y-3 md:ml-auto md:flex-row md:space-y-0">
                        <input
                            id="email"
                            type="text"
                            className="cursor-not-allowed rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 disabled:opacity-50"
                            placeholder="Email Address"
                            disabled
                            title="This feature is not available yet"
                        />
                        <button
                            disabled
                            title="This feature is not available yet"
                            className="bg-clip- disabled w-full transform cursor-not-allowed rounded-lg border border-sky-500 from-blue-600 to-blue-400 px-6 py-2.5 text-sm font-medium tracking-wider text-sky-500 transition-colors duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-300 hover:text-white focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-80 disabled:opacity-60 md:mx-4 md:w-auto"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="md:-mx-3 md:flex md:items-center md:justify-between">
                    <div className="md:mx-3 xl:text-sm dark:text-white">
                        <div className="text-sm font-normal tracking-widest text-[#9CA3AF]">
                            © {new Date().getFullYear()} PUMA Computer Science. All
                            rights reserved.
                            <br />
                            Made by Research & Technology PUFA Computer Science
                        </div>
                        {/*Version Info*/}
                            <div className="mt-2 justify-center text-sm font-normal tracking-widest text-[#9CA3AF]">
                                App Version: <Link href="/change-log" className="border-blue-600 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent hover:border-b-2 hover:border-b-blue-600">Latest Version</Link>
                            </div>

                               
                    </div>

                    <div className="mt-6 flex flex-row items-center justify-center space-x-4 md:ml-auto md:flex-row md:space-y-0">
                        <Link href="https://www.linkedin.com/company/pumacomputing/">
                            <FaLinkedin
                                size={25}
                                className="text-[#DADADA] transition-colors duration-300 hover:text-gray-500"
                            />
                        </Link>
                        <Link href="https://www.instagram.com/pufacomputing">
                            <FaInstagram
                                size={25}
                                className="text-[#DADADA] transition-colors duration-300 hover:text-gray-500"
                            />
                        </Link>
                        <Link href="https://github.com/PUFA-Computing">
                            <FaGithub
                                size={25}
                                className="text-[#DADADA] transition-colors duration-300 hover:text-gray-500"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
