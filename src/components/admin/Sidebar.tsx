"use client";
import {
	CalendarIcon,
	BuildingStorefrontIcon,
	DocumentDuplicateIcon,
	HomeIcon,
	UsersIcon,
	NewspaperIcon,
    EnvelopeIcon
} from "@heroicons/react/24/outline";
import React from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Team {
    name: string;
    href: string;
    initial: string;
}

interface SidebarProps {
    teams: Team[];
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

const Sidebar = ({ teams }: SidebarProps) => {
    const currentPath = usePathname();
    const navigation = [
        {
            name: "Dashboard",
            href: "/admin",
            icon: HomeIcon,
        },
        {
            name: "Events",
            href: "/admin/events",
            icon: CalendarIcon,
        },
        {
            name: "News",
            href: "/admin/news",
            icon: NewspaperIcon,
        },
        {
            name: "Users",
            href: "/admin/users",
            icon: UsersIcon,
        },
        {
            name: "Aspirations",
            href: "/admin/aspirations",
            icon: DocumentDuplicateIcon,
        },
        {
            name: "Merch",
            href: "/admin/merch",
            icon: BuildingStorefrontIcon,
        },
        {
            name: "Email",
            href: "/admin/email",
            icon: EnvelopeIcon,
        },
    ];
    return (
        <nav className="flex flex-1 flex-col overflow-hidden">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                    <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={classNames(
                                        currentPath === item.href
                                            ? "bg-gray-800 text-white"
                                            : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                    )}
                                >
                                    <item.icon
                                        className="h-6 w-6 shrink-0"
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <li>
                    <div className="text-xs font-semibold leading-6 text-gray-400">
                        Your teams
                    </div>
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                            <li key={team.name}>
                                <a
                                    href={team.href}
                                    className={classNames(
                                        currentPath === team.href
                                            ? "bg-gray-800 text-white"
                                            : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                    )}
                                >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                        {team.initial}
                                    </span>
                                    <span className="truncate">
                                        {team.name}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </li>
                <li className="mt-auto">
                    <Link
                        href="/admin/settings"
                        className={classNames(
                            usePathname() === "/admin/settings"
                                ? "bg-gray-800 text-white"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                        )}
                    >
                        <Cog6ToothIcon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                        />
                        Settings
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
