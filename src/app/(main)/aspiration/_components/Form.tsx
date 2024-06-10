"use client";

import { CreateAspiration } from "@/services/api/aspiration";
import Swal from "sweetalert2";
import Select from "react-select";
import Aspirations from "@/models/aspiration";
import { GetUserProfile } from "@/services/api/user";
import z from "zod";
import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// zod
const AspirationSchema = z.object({
    subject: z
        .string({ required_error: "Subject is required" })
        .min(3, { message: "Subject must be at least 3 characters long" }),
    organization_id: z
        .number({ required_error: "Organization is required" })
        .min(1, { message: "Choose an organization" }),
    anonymous: z.boolean().optional(),
    closed: z.boolean(),
    message: z
        .string({ required_error: "Message is required" })
        .min(10, { message: "Message must be at least 10 characters long" }),
});

export default function AspirationForm() {
    const formHtml = useRef<HTMLFormElement>(null);
    const [selectedOrganization, setSelectedOrganization] = useState<{
        value: string;
    } | null>(null);
    const [subject, setSubject] = useState<string>("");
    const [anonymous, setAnonymous] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [userName, setUserName] = useState<string>("");
    const [userRole, setUserRole] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const session = useSession();

    useEffect(() => {
        if (!session.data) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }

        if (session.data) {
            fetchUserProfile(
                session.data.user.id as string,
                session.data.user.access_token as string
            ).then((r) => r);
        }
    }, [session.data]);

    async function fetchUserProfile(userID: string, accessToken: string) {
        try {
            const response = await GetUserProfile(userID, accessToken);
            setUserName(`${response.first_name} ${response.last_name}`);
            setUserRole(response.role_id);
        } catch (error) {
            console.error("Error fetching user profile", error);
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        if (!selectedOrganization) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please select an organization.",
            });
            setIsLoading(false);
            return;
        }

        const data = {
            subject,
            organization_id: parseInt(selectedOrganization.value),
            anonymous,
            closed: false,
            message,
        };

        const validationResult = AspirationSchema.safeParse(data);
        if (!validationResult.success) {
            console.error("Validation error:", validationResult.error);
            let errorMessage = "";
            validationResult.error.issues.forEach((issue) => {
                errorMessage += issue.message + ".\n";
            });
            await Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage,
            });
            setIsLoading(false);
            return;
        }

        const aspirationData = validationResult.data as Aspirations;
        if (!session.data) {
            setIsLoading(true);
            return;
        }
        try {
            await CreateAspiration(
                aspirationData,
                session.data.user.access_token
            );
            await Swal.fire({
                title: "Aspiration Sent!",
                text: "Your aspiration has been sent to the organization.",
                icon: "success",
                confirmButtonText: "OK",
            });
            formHtml.current?.reset();
            setSelectedOrganization(null);
            setSubject("");
            setAnonymous(false);
            setMessage("");
            router.refresh();
        } catch (error) {
            console.error("Error creating aspiration", error);
            await Swal.fire({
                title: "Error",
                text: "An error occurred while sending your aspiration.",
                icon: "error",
                confirmButtonText: "OK",
            });
        } finally {
            setIsLoading(false);
        }
    }

    const organizations = [
        { value: "1", label: "PUFA Computing" },
        { value: "2", label: "PUMA Informatics" },
        { value: "3", label: "PUMA Information System" },
        { value: "4", label: "PUMA VCD" },
        { value: "5", label: "PUMA Interior Design" },
    ];

    const isFormValid =
        selectedOrganization && subject.length >= 3 && message.length >= 10;

    if (!isLoggedIn) {
        return (
            <div className="flex flex-col rounded-lg border bg-white px-4 py-4 opacity-90 shadow-lg md:px-8 md:py-8">
                <h1 className=" text-[1.4rem] text-[#656565] md:text-[1.8rem]">
                    Share Your Aspirations for Better Computing
                </h1>
                <hr className="my-8 border" />
                <div>
                    <h1 className="text-[1.3rem] ">Hello, Guest!</h1>
                    <h1 className="text-[1.3rem] font-bold">
                        Please log in to share your aspiration
                    </h1>
                </div>
                <hr className="my-8 border" />

                <button
                    className="flex self-center rounded-lg border-2 border-[#6B7280] px-6 py-2 shadow-sm transition-all duration-300 hover:border-white hover:bg-[#6B7280] hover:text-white md:px-16 md:py-3"
                    onClick={() => {
                        window.location.href = "auth/signin";
                    }}
                >
                    Sign In
                </button>
            </div>
        );
    }

    if (userRole === 8) {
        return (
            <div className="flex flex-col rounded-lg border bg-white px-4 py-4 opacity-90 shadow-lg md:px-8 md:py-8">
                <h1 className=" text-[1.4rem] text-[#656565] md:text-[1.8rem]">
                    Share Your Aspirations for Better Computing
                </h1>
                <hr className="my-8 border" />
                <div>
                    <h1 className="text-[1.3rem] ">Hello, {userName}</h1>
                    <h1 className="text-[1.3rem] font-bold">
                        You are not Faculty of Computing Student and you are not
                        authorized to use this feature
                    </h1>
                </div>
                <hr className="my-8 border" />
            </div>
        );
    }

    return (
        <div className="flex flex-col rounded-lg border bg-white px-4 py-4 opacity-90 shadow-lg md:px-8 md:py-8">
            <h1 className=" text-[1.4rem] text-[#656565] md:text-[1.8rem]">
                Share Your Aspirations for Better Computing
            </h1>
            <hr className="my-8 border" />
            <div>
                <h1 className="text-[1.3rem] ">Hello, {userName}</h1>
                <h1 className="text-[1.3rem] font-bold">
                    Let's fill in this box!
                </h1>
            </div>
            <hr className="my-8 border" />

            <form onSubmit={handleSubmit} ref={formHtml}>
                <div className="mb-6 flex flex-col gap-2">
                    <h1 className="text-[1.1rem] font-bold">To:</h1>
                    <p className="text-[0.9rem]">
                        Select the organization you want to share your
                        aspiration with:
                    </p>
                    <Select
                        value={selectedOrganization}
                        onChange={(selectedOption) =>
                            setSelectedOrganization(selectedOption as any)
                        }
                        options={organizations}
                        className="w-[100%] rounded-lg border-2 p-2"
                    />
                </div>

                <div className="mb-6 flex flex-col gap-2">
                    <h1 className="text-[1.1rem] font-bold">From:</h1>
                    <div className="flex gap-2">
                        <p className="text-[0.9rem]">Share it anonymously</p>
                        <label className="inline-flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                name="anonymous"
                                className="peer sr-only"
                                onChange={(e) => setAnonymous(e.target.checked)}
                            />
                            <div className="peer relative h-6 w-11 scale-90 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300" />
                        </label>
                    </div>

                    {/*User Name*/}
                    <input
                        type="text"
                        name="from"
                        className="w-[100%] rounded-lg border-2 p-2"
                        value={userName}
                        disabled
                    />
                </div>

                <div className="mb-6 flex flex-col gap-2">
                    <h1 className="text-[1.1rem] font-bold">Subject:</h1>
                    <p className="text-[0.9rem]">Your email etc.</p>
                    <input
                        type="text"
                        name="subject"
                        className="w-[100%] rounded-lg border-2 p-2"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>

                <div className="mb-6 flex flex-col gap-2">
                    <h1 className="text-[1.1rem] font-bold">Message:</h1>
                    <p className="text-[0.9rem]">
                        Anything else you want to let us know:
                    </p>
                    <textarea
                        name="message"
                        cols={30}
                        rows={10}
                        className="resize-none rounded-lg border-2 p-2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="flex self-center rounded-lg border-2 border-[#6B7280] px-6 py-2 shadow-sm transition-all duration-300 hover:border-white hover:bg-[#6B7280] hover:text-white md:px-16 md:py-3"
                    disabled={!isFormValid || isLoading}
                >
                    {isLoading ? <Spinner size="sm" /> : "Submit"}
                </button>
            </form>
        </div>
    );
}
