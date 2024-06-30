"use client";
import Button from "@/components/Button";
import { API_EVENT } from "@/config/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
    fetchUsersRegistered,
    totalRegisteredUsers,
} from "@/services/api/event";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
                const response = await totalRegisteredUsers(eventId);

                if (!response) {
                    setButtonRegisterText("Register");
                    setRegisterDisabled(false);
                    return;
                }

                if (Array.isArray(response)) {
                    for (const event of response) {
                        if (event.slug === eventSlug) {
                            setRegisterDisabled(true);
                            setButtonRegisterText("Registered");
                            return;
                        }
                    }
                } else {
                    console.warn(
                        "Unexpected response format from totalRegisteredUsers"
                    );
                    // Set button text and disabled state appropriately (e.g., "Error fetching data")

                    setButtonRegisterText("Error fetching data");
                    setRegisterDisabled(true);

                    return;
                }

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
                            {},
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
                                timer: 3000,
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
        <Button
            className="w-5/6 border-[#353535] py-2 text-[#353535] hover:bg-[#353535] hover:text-white"
            onClick={handleRegister}
            disabled={registerDisabled}
        >
            {buttonRegisterText}
        </Button>
    );
}
