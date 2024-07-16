"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { Spinner } from "@nextui-org/spinner";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

export default function Verify2FA() {
    const [passcode, setPasscode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");

    useEffect(() => {
        if (!username || !password) {
            router.push("/auth/signin"); // Redirect back to login if credentials are missing
        }
    }, [username, password, router]);

    const handleVerify2FA = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await signIn("credentials", {
                username: username!,
                password: password!,
                passcode: passcode,
                redirect: false,
            })
                .then(async (res) => {
                    if (res?.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Login Failed",
                            text: res?.error,
                            showConfirmButton: false,
                            timer: 5000,
                        });
                        setError(res?.error);
                    }
                    if (res?.ok) {
                        window.location.assign("/dashboard");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            return;
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Verification Failed",
                text: "Invalid passcode",
                showConfirmButton: false,
                timer: 5000,
            });
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onOtpChange = (otp: string) => {
        setPasscode(otp);
    };

    return (
        <section className="flex min-h-screen flex-col items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h1 className="mb-6 text-center text-2xl font-bold">
                    Verify Two-Factor Authentication
                </h1>
                <form onSubmit={handleVerify2FA}>
                    <div className="flex flex-col items-center justify-between">
                        <InputOTP maxLength={8} onChange={onOtpChange}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="focus:shadow-outline w-full rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isLoading ? <Spinner /> : "Verify"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
