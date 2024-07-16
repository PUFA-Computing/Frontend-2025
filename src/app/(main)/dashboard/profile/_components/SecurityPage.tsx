"use client";
import React, { useState } from "react";
import { GetUserProfile, Toggle2FA } from "@/services/api/user";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Button from "@/components/Button";
import Seperator from "@/components/Seperator";

export default function SecurityPage() {
    const session = useSession();
    const [userData, setUserData] = useState<string>("");
    const [is2FAEnable, setIs2FAEnable] = useState(true);

    const fetchData = async () => {
        if (!session || !session.data || !session.data.user) {
            return;
        }
        try {
            const userData = await GetUserProfile(
                session.data.user.id,
                session.data.user.access_token
            );
            setUserData(userData);
            setIs2FAEnable(userData.twofa_enabled);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    if (!userData) {
        fetchData();
    }

    const handleDisable2FA = async () => {
        if (!session) {
            return;
        }

        const accessToken = session.data?.user.access_token;

        if (!accessToken) {
            Swal.fire(
                "Error!",
                "Access token is missing. Please log in again.",
                "error"
            );
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to disable 2FA?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, disable it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await Toggle2FA(accessToken, false);
                    setIs2FAEnable(false);
                    Swal.fire(
                        "Disabled!",
                        "Your 2FA has been disabled.",
                        "success"
                    );
                } catch (error) {
                    Swal.fire(
                        "Error!",
                        "Failed to disable 2FA. Please try again later.",
                        "error"
                    );
                    console.error("Error disabling 2FA:", error);
                }
            }
        });
    };

    return (
        <section className="px-4">
            <div className="grid grid-cols-1 gap-5 p-4 lg:grid-cols-2">
                <div className="rounded-lg border border-[#CBCBCB] bg-white shadow-lg">
                    <h1 className="mt-2 px-6 py-3 text-[16px] font-[500]">
                        Multi-Factor Authentication
                    </h1>
                    <Seperator className="border-gray-100" />

                    <div className="flex flex-col gap-2">
                        {is2FAEnable ? (
                            <>
                                <div className="rounded-lg p-4">
                                    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-2">
                                            <p className="text-[14px] font-semibold text-[#0369A1]">
                                                Multi-Factor Authentication is
                                                Active
                                            </p>
                                            <span className="rounded-xl border border-[#7ED8FF] bg-[#E1F3FF] px-2 py-0.5 text-[#02ABF3]">
                                                Active
                                            </span>
                                        </div>
                                        <Button
                                            className="border border-[#02ABF3] bg-white px-8 py-2 text-[#02ABF3] hover:bg-[#02ABF3] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                            type="button"
                                            onClick={handleDisable2FA}
                                        >
                                            Disable 2FA
                                        </Button>
                                    </div>
                                    <div className="mt-2 text-justify text-[14px] text-[#4B5563]">
                                        Your account is currently protected with
                                        multi-factor authentication, providing
                                        an extra layer of security. This helps
                                        prevent unauthorized access and keeps
                                        your information safe.
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col gap-2 p-4">
                                    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                                        <p className="text-[0.875rem] font-[500]">
                                            Secure Your Account
                                        </p>
                                        <p className="rounded-xl border border-[#FE8A8A] bg-[#FFD7D7] px-2 py-0.5 text-[#FD4747]">
                                            Inactive
                                        </p>
                                    </div>
                                    <p className="text-justify text-[14px] font-[400] text-[#6B7280]">
                                        Enable multi-factor authentication to
                                        add an extra layer of security to your
                                        account. This helps protect against
                                        unauthorized access by requiring a
                                        second form of verification.
                                    </p>
                                    <div className="text-justify text-[14px] font-[400] text-[#6B7280]">
                                        <h2 className="mt-2 text-[0.875rem] font-[500]">
                                            Why Use Multi-Factor Authentication?
                                        </h2>
                                        <ul className="list-disc pl-5">
                                            <li>
                                                <strong>
                                                    Enhanced Security:
                                                </strong>{" "}
                                                Adds an extra layer of
                                                protection, making it harder for
                                                attackers to gain access.
                                            </li>
                                            <li>
                                                <strong>Reduced Risk:</strong>{" "}
                                                Protects sensitive information
                                                and reduces the risk of account
                                                breaches.
                                            </li>
                                            <li>
                                                <strong>Peace of Mind:</strong>{" "}
                                                Provides confidence that your
                                                account is more secure.
                                            </li>
                                            <li>
                                                <strong>Compliance:</strong>{" "}
                                                Helps meet regulatory
                                                requirements for protecting user
                                                data.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <Link href="2fa/setup" className="m-4">
                                    <Button className="mt-4 border border-[#02ABF3] bg-white px-8 py-2 text-[#02ABF3] hover:bg-[#02ABF3] hover:text-white disabled:cursor-not-allowed disabled:opacity-50">
                                        Enable 2FA
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Update Password */}
                <div>
                    <div className="rounded-lg border border-[#CBCBCB] bg-white shadow-lg">
                        <div className="mt-2 px-6 py-3">
                            <p className="text-[16px] font-[500]">
                                Update Password
                            </p>
                        </div>
                        <Seperator className="border-gray-100" />
                        <div className="mt-2 space-y-6 px-6 py-3 pb-6">
                            <div>
                                <label
                                    htmlFor="new-password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    New Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="new-password"
                                        name="new-password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm sm:leading-6"
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Confirm Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm sm:leading-6"
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            <div className="mt-16 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-x-2 md:space-y-0">
                                <Button
                                    className="mt-4 border-[#02ABF3] bg-[#02ABF3] px-8 py-2 text-white hover:bg-white hover:text-[#02ABF3] disabled:cursor-not-allowed disabled:opacity-50 md:mt-0"
                                    disabled={true}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
