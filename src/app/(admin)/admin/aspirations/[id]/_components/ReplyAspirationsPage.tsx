import React, { Fragment, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import {
    FaceFrownIcon,
    FaceSmileIcon,
    FireIcon,
    HandThumbUpIcon,
    HeartIcon,
    PaperClipIcon,
    XMarkIcon,
} from "@heroicons/react/20/solid";
import {
    Label,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition,
} from "@headlessui/react";
import Aspirations from "@/models/aspiration";
import { AdminReplyAspiration } from "@/services/api/aspiration";
import { useSession } from "next-auth/react";

const moods = [
    {
        name: "Excited",
        value: "excited",
        icon: FireIcon,
        iconColor: "text-white",
        bgColor: "bg-red-500",
    },
    {
        name: "Loved",
        value: "loved",
        icon: HeartIcon,
        iconColor: "text-white",
        bgColor: "bg-pink-400",
    },
    {
        name: "Happy",
        value: "happy",
        icon: FaceSmileIcon,
        iconColor: "text-white",
        bgColor: "bg-green-400",
    },
    {
        name: "Sad",
        value: "sad",
        icon: FaceFrownIcon,
        iconColor: "text-white",
        bgColor: "bg-yellow-400",
    },
    {
        name: "Thumbsy",
        value: "thumbsy",
        icon: HandThumbUpIcon,
        iconColor: "text-white",
        bgColor: "bg-blue-500",
    },
    {
        name: "I feel nothing",
        value: null,
        icon: XMarkIcon,
        iconColor: "text-gray-400",
        bgColor: "bg-transparent",
    },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function ReplyAspirationsPage({
    aspiration,
}: {
    aspiration: Aspirations;
}) {
    const [selected, setSelected] = useState(moods[5]);

    const date = new Date(aspiration.created_at);
    const updateDate = new Date(aspiration.updated_at);

    const [commentText, setCommentText] = useState("");
    const session = useSession();

    const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!session.data) return;

        try {
            await AdminReplyAspiration(
                aspiration.id,
                commentText,
                session.data.user.access_token
            );

            setCommentText("");
            window.location.reload();
        } catch (error) {
            console.error("Error creating aspiration", error);
        }
    };

    return (
        <>
            {/*Title*/}
            <div className="mb-9 flex items-center justify-between pl-11">
                <h1 className="text-2xl font-semibold text-gray-900">
                    {aspiration.subject}
                </h1>
                <span
                    className={classNames(
                        aspiration.closed
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800",
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                    )}
                >
                    {aspiration.closed ? (
                        <>
                            <CheckCircleIcon
                                className="mr-1.5 h-4 w-4"
                                aria-hidden="true"
                            />
                            Closed
                        </>
                    ) : (
                        "Open"
                    )}
                </span>
            </div>
            <div className="relative flex gap-x-4">
                <img
                    src={aspiration.author.profile_picture}
                    alt=""
                    className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                />
                <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                    <div className="flex justify-between gap-x-4">
                        <div className="py-0.5 text-xs leading-5 text-gray-500">
                            <span className="font-medium text-gray-900">
                                {aspiration.author.name}
                            </span>{" "}
                            aspirations
                        </div>
                        <time
                            dateTime={date.toDateString()}
                            className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                        >
                            {date.toDateString()}
                        </time>
                    </div>
                    <p className="text-sm leading-6 text-gray-500">
                        {aspiration.message}
                    </p>
                </div>
            </div>

            {/*Admin Reply*/}
            {aspiration.admin_reply && (
                <div className="mt-6 flex gap-x-4">
                    <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                        <div className="flex justify-between gap-x-4">
                            <div className="py-0.5 text-right text-xs leading-5 text-gray-500">
                                <span className="font-medium text-gray-900">
                                    Admin
                                </span>{" "}
                                reply
                            </div>
                            <time
                                dateTime={updateDate.toDateString()}
                                className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                            >
                                {updateDate.toDateString()}
                            </time>
                        </div>
                        <p className="text-sm leading-6 text-gray-500">
                            {aspiration.admin_reply}
                        </p>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                        className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                    />
                </div>
            )}

            {/* New comment form */}
            {/*If there is admin reply comment section is closed and give statement aspirations closed*/}
            {!aspiration.admin_reply && (
                <div className="mt-6 flex gap-x-3">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                        className="h-6 w-6 flex-none rounded-full bg-gray-50"
                    />
                    <form
                        onSubmit={handleCommentSubmit}
                        className="relative flex-auto"
                    >
                        <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                            <label htmlFor="comment" className="sr-only">
                                Add your comment
                            </label>
                            <textarea
                                rows={2}
                                name="comment"
                                id="comment"
                                className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Add your comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                            <div className="flex items-center space-x-5"></div>
                            <button
                                type="submit"
                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Comment
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {aspiration.admin_reply && (
                <div className="mt-6 text-center text-gray-500">
                    Aspirations closed
                </div>
            )}
        </>
    );
}
