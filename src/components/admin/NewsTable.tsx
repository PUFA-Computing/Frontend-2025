"use client";
import { Fragment, useState } from "react";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import News from "@/models/news";
import WarningModal from "@/components/ui/WarningModal";
import { deleteNews } from "@/services/api/news";
import Swal from "sweetalert2";

const statuses: any = {
    "PUFA Computing": "text-gray-100 bg-black ring-gray-600/20",
    "PUMA IT": "text-black bg-white ring-gray-500/10",
    "PUMA IS": "text-black-500 bg-orange-500 ring-yellow-600/20",
    "PUMA ID": "text-black-500 bg-blue-500 ring-blue-600/20",
    "PUMA VCD": "text-black-500 bg-green-500 ring-green-600/20",
};

function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
}

export default function NewsTable({ news }: { news: News[] }) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);

    const handleDelete = async (id: number) => {
        try {
            await deleteNews(id);

            await Swal.fire({
                icon: "success",
                title: "Success",
                text: "News deleted successfully",
            } as any);
        } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to delete news",
            });
        } finally {
            setDeleteModalOpen(false);
            window.location.reload();
        }
    };

    return (
        <div>
            <ul role="list" className="divide-y divide-gray-100">
                {news.map((news) => (
                    <li
                        key={news.id}
                        className="flex items-center justify-between gap-x-6 py-5"
                    >
                        <div className="min-w-0">
                            <div className="flex items-start gap-x-3">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                    {news.title}
                                </p>
                                <p
                                    className={classNames(
                                        "inline-block rounded-full px-2 py-0.5 text-xs font-semibold",
                                        statuses[news.organization],
                                        "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                                    )}
                                >
                                    {news.organization}
                                </p>
                            </div>
                            <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                <p className="whitespace-nowrap">
                                    Published on{" "}
                                    {new Date(news.publish_date).toDateString()}
                                </p>
                                <svg
                                    viewBox="0 0 2 2"
                                    className="h-0.5 w-0.5 fill-current"
                                >
                                    <circle cx={1} cy={1} r={1} />
                                </svg>
                                <p className="truncate">
                                    Created by {news.author}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-none items-center gap-x-4">
                            <a
                                // Blank new tab
                                href={`../news/${news.slug}`}
                                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                                target={"_blank"}
                            >
                                View News
                                <span className="sr-only">, {news.title}</span>
                            </a>
                            <Menu as="div" className="relative flex-none">
                                <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                    <span className="sr-only">
                                        Open options
                                    </span>
                                    <EllipsisVerticalIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </MenuButton>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                        <MenuItem>
                                            {({ focus }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        focus
                                                            ? "bg-gray-50"
                                                            : "",
                                                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                    )}
                                                >
                                                    Edit
                                                    <span className="sr-only">
                                                        , {news.id}
                                                    </span>
                                                </a>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ focus }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        focus
                                                            ? "bg-gray-50"
                                                            : "",
                                                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                    )}
                                                >
                                                    Move
                                                    <span className="sr-only">
                                                        , {news.id}
                                                    </span>
                                                </a>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ focus }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        focus
                                                            ? "bg-gray-50"
                                                            : "",
                                                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                    )}
                                                    onClick={() => {
                                                        // Set the selected news ID for deletion
                                                        setSelectedNewsId(
                                                            news.id
                                                        );
                                                        // Open the delete modal
                                                        setDeleteModalOpen(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                    <span className="sr-only">
                                                        , {news.id}
                                                    </span>
                                                </a>
                                            )}
                                        </MenuItem>
                                    </MenuItems>
                                </Transition>
                            </Menu>
                        </div>
                    </li>
                ))}
            </ul>

            <WarningModal
                open={deleteModalOpen}
                title="Delete Confirmation"
                message="Are you sure you want to delete this news?"
                primaryActionText="Delete"
                secondaryActionText="Cancel"
                onClose={() => setDeleteModalOpen(false)}
                onPrimaryAction={() => {
                    if (selectedNewsId !== null) {
                        handleDelete(selectedNewsId).then((r) => r);
                    }
                }}
            />
        </div>
    );
}
