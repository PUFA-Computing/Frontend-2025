import { GetUserProfile } from "@/services/api/user";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function VerificationStatus() {
    const session = useSession();
    const [userData, setUserData] = useState<string>("");
    const [isVerified, setIsVerified] = useState(true);

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
            setIsVerified(userData.email_verified);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    fetchData().then((r) => r);
    }, [session.data]);

    return (
        <section className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-24">
            <div className="w-full max-w-lg rounded-lg bg-white p-8 text-center shadow-lg">
                <h1 className="mb-6 text-3xl font-bold text-gray-800">
                    Verification Status
                </h1>
                {isVerified ? (
                    <div className="flex flex-col items-center">
                        <FaCheckCircle className="mb-4 text-6xl text-green-500" />
                        <p className="text-lg text-gray-600">
                            Your account is already verified.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <FaTimesCircle className="mb-4 text-6xl text-red-500" />
                        <p className="text-lg text-gray-600">
                            Your account is still not verified, please verify
                            it.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
