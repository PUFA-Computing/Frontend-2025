"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import {
    deleteEvent,
    fetchEventBySlug,
    updateEvent,
} from "@/services/api/event";
import Event from "@/models/event";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import Seperator from "@/components/Seperator";
import Image from "next/image";
import ListUserRegistered from "./ListUserRegistered";
import { CircularProgress } from "@/components/ui/CircularProgress";
import Select from "react-select";
import { Spinner } from "@nextui-org/spinner";

const tabs = [
    { name: "Event Details", key: "eventDetails" },
    { name: "List User Registered", key: "listUserRegistered" },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function EventDetails() {
    const pathname = usePathname();
    const router = useRouter();
    // get the slug from the pathname
    const slug = pathname.split("/").pop();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const session = useSession();
    const [newPoster, setNewPoster] = useState<File | null>(null);
    const [activeTab, setActiveTab] = useState<string>(tabs[0].key);

    const organizationOptions = [
        { value: 1, label: "PUFA Computing" },
        { value: 2, label: "PUMA IT" },
        { value: 3, label: "PUMA IS" },
        { value: 4, label: "PUMA ID" },
        { value: 5, label: "PUMA VCD" },
    ];

    useEffect(() => {
        if (slug) {
            setLoading(true);
            const getEvent = async () => {
                try {
                    const fetchedEvent = await fetchEventBySlug(slug as string);
                    setEvent(fetchedEvent);
                } catch (error) {
                    console.error("Error fetching event data:", error);
                } finally {
                    setLoading(false);
                }
            };
            getEvent().then((r) => r);
        }
    }, [slug]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEvent((prevEvent) =>
            prevEvent ? { ...prevEvent, [name]: value } : null
        );
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewPoster(e.target.files[0]);
        }
    };

    const handleSelectChange = (selectedOption: any) => {
        setEvent((prevEvent) =>
            prevEvent
                ? { ...prevEvent, organization_id: selectedOption.value }
                : null
        );
    };

    const handleDelete = async () => {
        if (!session.data) {
            return null;
        }
        if (event) {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Do you really want to delete this event? This action cannot be undone.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
            });

            if (result.isConfirmed) {
                try {
                    setSaving(true);
                    await deleteEvent(event.id, session.data.user.access_token);
                    await Swal.fire({
                        icon: "success",
                        title: "Event Deleted",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    router.push("/admin/events");
                } catch (error) {
                    console.error("Error deleting event:", error);
                    await Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Error deleting event",
                    });
                } finally {
                    setSaving(false);
                }
            }
        }
    };

    const handleSave = async () => {
        if (!session.data) {
            return null;
        }
        if (event) {
            try {
                setSaving(true);
                await updateEvent(
                    event.slug,
                    event,
                    session.data.user.access_token
                );
                await Swal.fire({
                    icon: "success",
                    title: "Event Updated",
                    showConfirmButton: false,
                    timer: 1500,
                });
                router.push("/admin/events");
            } catch (error) {
                console.error("Error updating event:", error);
                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error updating event",
                });
            } finally {
                setSaving(false);
            }
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (!event) {
        return <div>Event not found</div>;
    }

    const selectedOrganization = organizationOptions.find(
        (option) => option.value === event.organization_id
    );

    return (
        <div>
            <div className="px-4 sm:px-4">
                <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                        Select a tab
                    </label>
                    <select
                        id="tabs"
                        name="tabs"
                        className="block w-full rounded-md border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value)}
                    >
                        {tabs.map((tab) => (
                            <option key={tab.key} value={tab.key}>
                                {tab.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <nav
                        className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
                        aria-label="Tabs"
                    >
                        {tabs.map((tab, tabIdx) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={classNames(
                                    tab.key === activeTab
                                        ? "text-gray-900"
                                        : "text-gray-500 hover:text-gray-700",
                                    tabIdx === 0 ? "rounded-l-lg" : "",
                                    tabIdx === tabs.length - 1
                                        ? "rounded-r-lg"
                                        : "",
                                    "group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                                )}
                                aria-current={
                                    tab.key === activeTab ? "page" : undefined
                                }
                            >
                                <span>{tab.name}</span>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        tab.key === activeTab
                                            ? "bg-sky-500"
                                            : "bg-transparent",
                                        "absolute inset-x-0 bottom-0 h-0.5"
                                    )}
                                />
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {activeTab === "eventDetails" && (
                <div>
                    {/*Warning alert this update events on maintenance*/}
                    <div
                        className="m-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-100 p-4 px-4 py-3 text-yellow-700 shadow-md"
                        role="alert"
                    >
                        <p className="font-bold">Warning</p>
                        <p>
                            This page is currently under maintenance. Please be
                            patients for the updates.
                        </p>
                    </div>

                    {/*Button Delete Event*/}
                    <div className="flex justify-end px-4">
                        <Button
                            onClick={handleDelete}
                            className="border-[#FF0000] bg-[#FF0000] px-8 py-2 text-white hover:bg-white hover:text-[#FF0000]"
                        >
                            Delete Event
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-5 p-4 lg:grid-cols-2">
                        <div>
                            <div className="rounded-lg border border-[#CBCBCB] bg-white shadow-lg">
                                <div className="mt-2 px-6 py-3">
                                    <p className="text-[16px] font-[500]">
                                        Event Details
                                    </p>
                                </div>
                                <Seperator className="border-gray-100" />
                                <div className="mt-2 space-y-6 px-6 py-10 pb-6">
                                    <div>
                                        <Input
                                            htmlFor="title"
                                            label="Title"
                                            type="text"
                                            name="title"
                                            value={event.title}
                                            placeholder={event.title}
                                            onChange={handleInputChange}
                                            disabled
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <Input
                                            htmlFor="description"
                                            label="Description"
                                            type="text"
                                            value={event.description}
                                            placeholder={event.description}
                                            onChange={handleInputChange}
                                            disabled
                                        />
                                        <div>
                                            <label
                                                htmlFor="organization"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Organization
                                            </label>
                                            <Select
                                                id="organization"
                                                name="organization"
                                                value={selectedOrganization}
                                                onChange={handleSelectChange}
                                                options={organizationOptions}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                                                isDisabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Input
                                            htmlFor="start_date"
                                            label="Start Date"
                                            type="date"
                                            name="start_date"
                                            value={
                                                new Date(event.start_date)
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                            onChange={handleInputChange}
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            htmlFor="end_date"
                                            label="End Date"
                                            type="date"
                                            name="end_date"
                                            value={
                                                new Date(event.end_date)
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                            onChange={handleInputChange}
                                            disabled
                                        />
                                    </div>
                                    <div className="mt-16 flex justify-end space-x-2 py-5">
                                        <Button
                                            onClick={handleSave}
                                            className="border-[#02ABF3] bg-[#02ABF3] px-8 py-2 text-white hover:bg-white hover:text-[#02ABF3] disabled:cursor-not-allowed"
                                            disabled={true}
                                            aria-disabled={true}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                className="rounded-lg border border-[#CBCBCB] bg-white shadow-lg"
                                style={{ height: "fit-content" }}
                            >
                                <div className="mt-2 px-6 py-3">
                                    <p className="text-[16px] font-[500]">
                                        Poster Event
                                    </p>
                                </div>
                                <Seperator className="border-gray-100" />
                                <div className="p-6">
                                    <div className="mb-4">
                                        <div className="flex justify-center">
                                            <Image
                                                src={
                                                    event.thumbnail ||
                                                    "https://sg.pufacomputing.live/Assets/male.jpeg"
                                                }
                                                alt={`${event.title} Poster`}
                                                className="h-72  w-56 rounded-lg"
                                                width={480}
                                                height={240}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-[#353535]">
                                        <label
                                            htmlFor="dropzone-file"
                                            className="mx-auto mt-2 flex w-full max-w-xl cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-gray-400 dark:border-gray-700"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-8 w-8 text-gray-500 dark:text-gray-400"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                                />
                                            </svg>

                                            <h2 className="mt-1 font-medium tracking-wide">
                                                Add Profile Picture
                                            </h2>

                                            <p className="mt-2 text-xs tracking-wide ">
                                                Upload or drag & drop your file
                                                SVG, PNG, or JPG.{" "}
                                            </p>

                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                className="hidden"
                                                onChange={handleFileChange}
                                                disabled
                                            />
                                        </label>
                                    </div>
                                    <div className="mt-16 flex justify-end space-x-2 py-5">
                                        <Button
                                            onClick={handleSave}
                                            className="border-[#02ABF3] bg-[#02ABF3] px-8 py-2 text-white hover:bg-white hover:text-[#02ABF3] disabled:cursor-not-allowed"
                                            disabled={true}
                                            aria-disabled={true}
                                        >
                                            {saving ? (
                                                <Spinner size="sm" />
                                            ) : (
                                                "Save"
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "listUserRegistered" && (
                <ListUserRegistered eventId={event.id} />
            )}
        </div>
    );
}
