"use client";
import Button from "@/components/Button";
import { API_EVENT } from "@/config/config";
import { fetchUserEvents } from "@/services/api/user";
import axios from "axios";
import { access } from "fs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { fetchEvents } from "@/services/api/event";

interface RegisterButtonProps {
    eventId: number;
    eventTitle: string;
    eventSlug: string;
    eventStatus: string;
    userId: string;
    accessToken: string;
}

export default function RegisterButton({
    userId,
    accessToken,
    eventId,
    eventTitle,
    eventSlug,
    eventStatus,
}: RegisterButtonProps) {
    const [registerDisabled, setregisterDisabled] = useState(false);
    const [buttonRegisterText, setButtonRegisterText] = useState("Loading...");

    useEffect(() => {
        const userEvents = async () => {
            try {
                if (!userId) {
                    await Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "You havent logged in yet",
                    });

                    setButtonRegisterText("You need to login");
                    setregisterDisabled(true);
                    return;
                }

                const response = await fetchUserEvents(accessToken, eventId);

                for (const event of response) {
                    if (event.slug == eventSlug) {
                        setregisterDisabled(true);
                        setButtonRegisterText("Registered");
                        return;
                    }
                }
                if (eventStatus !== "Open") {
                    setButtonRegisterText("Registration Closed");
                    setregisterDisabled(true);
                } else {
                    setButtonRegisterText("Register");
                    setregisterDisabled(false);
                }
            } catch (error) {
                console.log(error);
                await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Cant fetch users event, please try again later",
                });
            }
        };
        userEvents().then((r) => r);
    }, []);

    const router = useRouter();
    const handleRegister = async () => {
        if (eventStatus !== "Open") {
            await Swal.fire({
                icon: "error",
                title: "Registration failed",
                text: "Event registration is closed.",
            });
            setButtonRegisterText("Registration Closed");
            setregisterDisabled(true);
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
                try {
                    if (result.isConfirmed) {
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
                                text: "Redirect to dashboard...",
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
                    }
                } catch (error: any) {
                    console.error("Error registering for event:", error);
                    if (
                        error.response &&
                        error.response.status === 500 &&
                        error.response.data &&
                        error.response.data.message &&
                        error.response.data.message.includes(
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
                            text: `There was an error while registering event ${eventTitle}`,
                        });
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
            disabled={buttonRegisterText.toLowerCase().includes("registered")}
        >
            {buttonRegisterText}
        </Button>
    );
}
