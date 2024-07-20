"use client";
import React, { useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import {
    InputOTP as OTPInput,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { ForgotPassword } from "@/services/api/auth";

interface OTPFormProps {
    onSubmit: () => void;
}

export default function OTPForm({ onSubmit }: OTPFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [otp, setOTP] = useState<string | null>(null);

    const onOtpChange = (otp: string) => {
        setOTP(otp);
    };

    const email = sessionStorage.getItem("email") || "";

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp) {
            setError("OTP is required");
            return;
        }
        setError("");
        setIsLoading(true);
        try {
            await ForgotPassword(email,otp);
            sessionStorage.setItem("otp", otp)
            onSubmit();
        } catch (error) {
            setError("Failed to request password reset. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="py-0 sm:py-24">
            <div className="mx-auto max-w-lg rounded-md bg-white bg-opacity-40 p-6 shadow-md">
                <div>
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <div className="mb-4 text-[#353535] md:mb-0 md:mr-10">
                            <p className="text-base font-normal md:text-lg">
                                Hello, Computizens!
                            </p>
                            <p className="text-lg font-semibold md:text-2xl">
                                Please Input Your OTP Code
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <img
                                src="../logo/PUFA_Computing.png"
                                alt="PUFA Computing Logo"
                                className="h-12 w-12 md:h-16 md:w-16"
                            />
                            <img
                                src="../PU.png"
                                alt="PU Logo"
                                className="h-12 w-12 md:h-16 md:w-16"
                            />
                        </div>
                    </div>
                    <div className="my-4">
                        <div className="border-t border-[#D1D5DB]"></div>
                    </div>
                </div>
                <form onSubmit={handleVerifyOTP}>
                    <div className="flex flex-col items-center justify-between">
                        <OTPInput maxLength={6} onChange={onOtpChange}>
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
                        </OTPInput>
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
