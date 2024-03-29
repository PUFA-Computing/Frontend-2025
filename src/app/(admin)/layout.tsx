'use client';
import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment, useState} from "react";
import {
    CalendarIcon, BuildingStorefrontIcon,
    DocumentDuplicateIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
    NewspaperIcon
} from "@heroicons/react/24/outline";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

const navigation = [
    {name: 'Dashboard', href: '#', icon: HomeIcon, current: true},
    {name: 'Events', href: '#', icon: CalendarIcon, current: false},
    {name: 'News', href: '#', icon: NewspaperIcon, current: false},
    {name: 'Users', href: '#', icon: UsersIcon, current: false},
    {name: 'Aspirations', href: '#', icon: DocumentDuplicateIcon, current: false},
    {name: 'Merch', href: '#', icon: BuildingStorefrontIcon, current: false},
]
const teams = [
    {id: 1, name: 'PUFA Computing', href: '#', initial: 'PUFA', current: false},
    {id: 2, name: 'PUMA Informatics', href: '#', initial: 'PUMA', current: false},
    {id: 3, name: 'PUMA Information System', href: '#', initial: 'PUMA', current: false},
    {id: 4, name: 'PUMA Visual Communication Design', href: '#', initial: 'PUMA', current: false},
    {id: 5, name: 'PUMA Interior Design', href: '#', initial: 'PUMA', current: false},

]
const userNavigation = [
    {name: 'Your profile', href: '#'},
    {name: 'Sign out', href: '#'},
]

export default async function AdminLayout({
                                              children,
                                          }: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div>
            {/*Sidebar Mobile*/}
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80"/>
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button type="button" className="-m-2.5 p-2.5"
                                                onClick={() => setSidebarOpen(false)}>
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
                                        </button>
                                    </div>
                                </Transition.Child>
                                {/* Sidebar component, swap this element with another sidebar if you like */}
                                <div
                                    className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <Sidebar navigation={navigation} teams={teams}/>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Sidebar Desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Your Company"
                        />
                    </div>

                    <Sidebar navigation={navigation} teams={teams}/>
                </div>
            </div>

            {/*Content*/}
            <div className="lg:pl-72">
                <Header userNavigation={userNavigation}/>

                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
