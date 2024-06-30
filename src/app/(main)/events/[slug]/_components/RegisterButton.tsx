"use client";
import Button from "@/components/Button";
import { API_EVENT } from "@/config/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { totalRegisteredUsers } from "@/services/api/event";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUserEvents } from "@/services/api/user";

interface RegisterButtonProps {
    eventId: number;
    eventTitle: string;
    eventSlug: string;
    eventStatus: string;
}

export default function RegisterButton({
    eventId,
    eventTitle,
    eventSlug,
    eventStatus,
}: RegisterButtonProps) {
    const [registerDisabled, setRegisterDisabled] = useState(false);
    const [buttonRegisterText, setButtonRegisterText] = useState("Loading...");
    const [additionalNotes, setAdditionalNotes] = useState("");
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        const userEvents = async () => {
            if (status === "loading") {
                setButtonRegisterText("Loading...");
                return;
            }

            if (!session) {
                setButtonRegisterText("Login to Register");
                setRegisterDisabled(true);
                return;
            }

            try {
                const userEvents = await fetchUserEvents(
                    session.user.access_token
                );

                if (
                    userEvents.some(
                        (event: { slug: string }) => event.slug === eventSlug
                    )
                ) {
                    setRegisterDisabled(true);
                    setButtonRegisterText("Registered");
                    return;
                }

                const totalParticipants = await totalRegisteredUsers(eventId);

                if (eventStatus !== "Open") {
                    setButtonRegisterText("Registration Closed");
                    setRegisterDisabled(true);
                } else {
                    setButtonRegisterText("Register");
                    setRegisterDisabled(false);
                }
            } catch (error) {
                console.log(error);
                await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Can't fetch user's events, please try again later",
                });
            }
        };

        userEvents();
    }, [status, session]);

    const handleRegister = async () => {
        console.log("Additional Notes:", additionalNotes);
        if (eventStatus !== "Open") {
            await Swal.fire({
                icon: "error",
                title: "Registration failed",
                text: "Event registration is closed.",
            });
            setButtonRegisterText("Registration Closed");
            setRegisterDisabled(true);
            return;
        }

        if (buttonRegisterText.toLowerCase().includes("login")) {
            router.push("/auth/signin");
            return;
        }

        if (!additionalNotes) {
            await Swal.fire({
                icon: "warning",
                title: "Additional Notes Required",
                text: "Please provide additional notes to register for the event.",
            });
            return;
        }

        try {
            Swal.fire({
                title: "Register for Event",
                text: `Are you sure you want to register for ${eventTitle}?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const accessToken = session?.user.access_token;
                        const response = await axios.post(
                            `${API_EVENT}/${eventId}/register`,
                            {
                                additional_notes: additionalNotes,
                            },
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${accessToken}`,
                                },
                            }
                        );

                        if (response.status === 200) {
                            Swal.fire({
                                icon: "success",
                                title: "Registered successfully!",
                                text: "Redirecting to dashboard...",
                                showConfirmButton: false,
                                timer: 2000,
                            }).then(() => {
                                router.push("/dashboard/events");
                            });
                        } else {
                            await Swal.fire({
                                icon: "error",
                                title: "Registration failed",
                                text: "There was an error while registering for the event.",
                            });
                        }
                    } catch (error: any) {
                        console.error("Error registering for event:", error);
                        if (
                            error.response?.status === 500 &&
                            error.response.data?.message?.includes(
                                "Request failed with status code 500"
                            )
                        ) {
                            Swal.fire({
                                icon: "error",
                                title: "Registration failed",
                                text: "Maximum registration limit reached for this event.",
                            });
                        } else {
                            await Swal.fire({
                                icon: "error",
                                title: "Registration failed",
                                text: `There was an error while registering for the event ${eventTitle}.`,
                            });
                        }
                    }
                }
            });
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <div className="flex w-full flex-col items-center space-y-4 rounded-lg bg-white p-4 shadow-md">
            {!registerDisabled && (
                <textarea
                    placeholder="Additional Notes"
                    className="w-5/6 rounded-lg border-[#353535] bg-white px-4 py-2 text-[#353535] focus:border-y-gray-800 focus:outline-none"
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                />
            )}
            <Button
                className={`w-5/6 rounded-lg py-2 text-white hover:text-gray-200 ${
                    registerDisabled
                        ? "cursor-not-allowed bg-gray-500"
                        : "bg-gray-500 hover:bg-gray-600"
                }`}
                onClick={handleRegister}
                disabled={registerDisabled}
            >
                {buttonRegisterText}
            </Button>
        </div>
    );
}
