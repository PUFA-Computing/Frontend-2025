import { GetUserProfile } from "@/services/api/user";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";

export default function VerificationStatus() {
    const session = useSession();
    const [userData, setUserData] = useState<string>("");
    const [emailIsVerified, setEmailIsVerified] = useState(true);
    const [twoFactorVerified, setTwoFactorVerified] = useState(true);
    const [studentIdVerified, setStudentIdVerified] = useState(true);
    const [studentIdImage, setStudentIdImage] = useState(null);

    useEffect(() => {
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
                setEmailIsVerified(userData.email_verified);
                setTwoFactorVerified(userData.twofa_enabled);
                setStudentIdVerified(userData.student_id_verified);
                setStudentIdImage(userData.student_id_verification);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData().then((r) => r);
    }, [session]);

    const renderStudentIdStatus = () => {
        if (studentIdVerified) {
            return (
                <div className="flex flex-col items-center">
                    <FaCheckCircle className="mb-4 text-6xl text-green-500" />
                    <p className="text-lg text-gray-600">
                        Your student ID is already verified.
                    </p>
                </div>
            );
        } else if (!studentIdVerified && studentIdImage) {
            return (
                <div className="flex flex-col items-center">
                    <FaHourglassHalf className="mb-4 text-6xl text-yellow-500" />
                    <p className="text-lg text-gray-600">
                        Your student ID verification is pending.
                    </p>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col items-center">
                    <FaTimesCircle className="mb-4 text-6xl text-red-500" />
                    <p className="text-lg text-gray-600">
                        Your student ID is still not verified, please verify it.
                    </p>
                </div>
            );
        }
    };

    return (
        <section className="p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-lg h-full rounded-lg bg-white p-8 text-center shadow-lg">
                    <h1 className="mb-6 text-3xl font-bold text-gray-800">
                        Email Verification Status
                    </h1>
                    {emailIsVerified ? (
                        <div className="flex flex-col items-center">
                            <FaCheckCircle className="mb-4 text-6xl text-green-500" />
                            <p className="text-lg text-gray-600">
                                Your email is already verified.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <FaTimesCircle className="mb-4 text-6xl text-red-500" />
                            <p className="text-lg text-gray-600">
                                Your email is still not verified, please verify it.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-lg h-full rounded-lg bg-white p-8 text-center shadow-lg">
                    <h1 className="mb-6 text-3xl font-bold text-gray-800">
                        Student ID Verification Status
                    </h1>
                    {renderStudentIdStatus()}
                </div>
            </div>
            <div className="flex items-center justify-center bg-gray-50">
                <div className="w-full max-w-lg h-full rounded-lg bg-white p-8 text-center shadow-lg">
                    <h1 className="mb-6 text-3xl font-bold text-gray-800">
                        Two-Factor Authentication Status
                    </h1>
                    {twoFactorVerified ? (
                        <div className="flex flex-col items-center">
                            <FaCheckCircle className="mb-4 text-6xl text-green-500" />
                            <p className="text-lg text-gray-600">
                                Two-factor authentication is already enabled.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <FaTimesCircle className="mb-4 text-6xl text-red-500" />
                            <p className="text-lg text-gray-600">
                                Two-factor authentication is still not enabled, please enable it.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
