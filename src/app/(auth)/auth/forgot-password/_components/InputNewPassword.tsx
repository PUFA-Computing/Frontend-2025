import { ForgotPassword } from "@/services/api/auth";
import { Spinner } from "@nextui-org/spinner";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function InputNewPassword() {
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const router = useRouter();

    const HandleNewPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== newPassword) {
            setError("New Password and New Password Validate must be the same");
            return;
        }
        setError("");
        setIsLoading(true);

        const email = sessionStorage.getItem("email") || "";
        const otp = sessionStorage.getItem("otp") || "";
        try {
            await ForgotPassword(email, otp, password);
            router.push("/auth/signin");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("otp");
        } catch (error) {
            setError("Failed to request password reset. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
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
                                Please Input Your New Password
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
                <form onSubmit={HandleNewPassword}>
                    <div className="mt-8">
                        <div className="relative flex items-center">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                className="block w-full rounded-lg border bg-white px-6 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-blue-300 md:px-10"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-3"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? (
                                    <AiFillEyeInvisible size={20} />
                                ) : (
                                    <AiFillEye size={20} />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="mt-8">
                        <div className="relative flex items-center">
                            <input
                                type={newPasswordVisible ? "text" : "password"}
                                className="block w-full rounded-lg border bg-white px-6 py-3 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring-blue-300 md:px-10"
                                placeholder="New Password Validate"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-3"
                                onClick={toggleNewPasswordVisibility}
                            >
                                {newPasswordVisible ? (
                                    <AiFillEyeInvisible size={20} />
                                ) : (
                                    <AiFillEye size={20} />
                                )}
                            </button>
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
