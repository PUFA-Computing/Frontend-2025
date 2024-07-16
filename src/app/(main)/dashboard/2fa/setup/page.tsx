"use client";
import Image from "next/image";
import React, { useState } from "react";
import QRCODE from "@/assets/icon/qr_code.png";
import {
    Enable2FA,
    GetUserProfile,
    Toggle2FA,
    Verify2FA,
} from "@/services/api/user";
import { signIn, useSession } from "next-auth/react";
import { FaRegCopy } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Spinner } from "@nextui-org/spinner";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

export default function Page() {
    const session = useSession();
    const [userData, setUserData] = useState<string>("");
    const [secretKey, setSecretKey] = useState<string>("");
    const [qrImage, setQrImage] = useState<string>("");

    const fetchData = async () => {
        if (!session || !session.data || !session.data.user) {
            return;
        }
        try {
            const userData = await Enable2FA(session.data.user.access_token);
            setUserData(userData);
            setSecretKey(userData.twofa_secret);
            setQrImage(userData.twofa_image);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    if (!userData) {
        fetchData();
    }

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(secretKey);
            Swal.fire({
                icon: "success",
                title: "Copied!",
                text: "Secret key copied to clipboard.",
                timer: 1500,
            });
        } catch (error) {
            console.error("Failed to copy secret key:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to copy secret key.",
                timer: 1500,
            });
        }
    };

    const [passcode, setPasscode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleVerify2FA = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const accessToken = session?.data?.user?.access_token;
        if (!accessToken) {
            Swal.fire({
                icon: "error",
                title: "Session Error",
                text: "Session data is not available",
                showConfirmButton: false,
                timer: 5000,
            });
            setIsLoading(false);
            return;
        }

        try {
            const res = await Verify2FA({ passcode, accessToken });

            if (res?.success) {
                const response = await Toggle2FA(accessToken, true);
                console.log("2FA Enabled", response);
                if (response.success) {
                    await Swal.fire({
                        icon: "success",
                        title: "2FA Enabled",
                        text: "Multi-Factor Authentication has been enabled",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    window.location.assign("/dashboard");
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Verification Failed",
                    text: res.error,
                    showConfirmButton: false,
                    timer: 1500,
                });
                setError(res.error);
            }
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Verification Failed",
                text: "Invalid passcode",
                showConfirmButton: false,
                timer: 5000,
            });
            setError(error.response?.data?.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const onOtpChange = (otp: string) => {
        setPasscode(otp);
    };

    console.log(qrImage);

    return (
        <section className="bg-white font-[500] text-[#353535]">
            <div className="p-4">
                <p className="mb-4 text-[24px] capitalize">
                    Connect with your authenticator apps
                </p>
                <hr />
                <div className="flex flex-col justify-between p-4 lg:flex-row">
                    <div className="flex-1 lg:pr-8">
                        <h1 className="mb-4 text-[32px] capitalize">
                            Multi-Factor Authentication
                        </h1>
                        <div className="text-justify font-[400]">
                            <ol className="list-decimal gap-2 space-y-4 pl-6">
                                <li>
                                    You will need an authenticator mobile app to
                                    complete this process, such as one of the
                                    following:
                                    <ul className="list-disc pl-6 text-[#0C8CE9]">
                                        <li>Google Authenticator</li>
                                        <li>Authy</li>
                                    </ul>
                                </li>
                                <li>
                                    Scan the QR code with your authenticator
                                </li>
                                <p className="mt-2 text-[#6B7280]">
                                    If you can’t scan the code, you can enter
                                    this secret key into your authentication app
                                </p>
                                <div className="flex w-auto items-center justify-between gap-2 border border-[#9CA3AF] p-2 md:w-96">
                                    <p className="md:break-all-0 break-all font-bold text-[#353535]">
                                        {secretKey}
                                    </p>
                                    <FaRegCopy
                                        className="cursor-pointer text-2xl md:text-xl"
                                        onClick={handleCopyToClipboard}
                                    />
                                </div>
                                <li>
                                    After scanning the QR code
                                    <span className="inline lg:hidden">
                                        {" "}
                                        below
                                    </span>
                                    <span className="hidden lg:inline">
                                        {" "}
                                        beside
                                    </span>
                                    , enter the six-digit code generated by your
                                    authenticator
                                    <form
                                        onSubmit={handleVerify2FA}
                                        className="mt-2"
                                    >
                                        <div className="flex flex-col items-center justify-between">
                                            <InputOTP
                                                maxLength={8}
                                                onChange={onOtpChange}
                                            >
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
                                        <div className="mt-6 w-full">
                                            <button
                                                type="submit"
                                                className="focus:shadow-outline w-full rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none"
                                            >
                                                {isLoading ? (
                                                    <Spinner />
                                                ) : (
                                                    "Verify"
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="mx-auto mt-4 hidden justify-center sm:flex lg:mt-0 lg:justify-end">
                        {qrImage && (
                            <Image
                                src={`data:image/png;base64,${qrImage}`}
                                height={300}
                                width={300}
                                alt="QR Code"
                                className="h-[300px] w-[300px]"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
