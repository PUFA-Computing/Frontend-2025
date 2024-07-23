"use client";
import React, { useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { ForgotPasswordRequest } from "@/services/api/auth";

interface InputEmailProps {
    onSubmit: () => void;
}


export default function InputEmail({ onSubmit }: InputEmailProps) {
    const [error, setError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email) {
            setError("Email is required");
            return;
        }

        setError(""); 
        setIsLoading(true); 

        try {
            await ForgotPasswordRequest(email);
            sessionStorage.setItem("email", email)
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
                                Please Input Your Email
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
                <form onSubmit={handleInputEmail}>
                    <div className="mt-8">
                        <div className="relative flex items-center">
                            <span className="absolute"></span>
                            <input
                                type="text"
                                className="block w-full rounded-lg border bg-white px-6 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-blue-300 md:px-10"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        {error && (
                            <div className="error my-2 text-red-500">
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="w-full transform rounded-lg border border-[#6B7280] bg-white px-6 py-3 text-sm font-medium capitalize tracking-wide text-[#6B7280] transition-colors duration-300 hover:bg-[#6B7280] hover:text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Spinner size="sm" /> // Show spinner when loading
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
