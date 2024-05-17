"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API_VERIFY_EMAIL } from "@/config/config";

const VerifyEmailForm: React.FC = () => {
    const router = useSearchParams();
    const token = router.get('token');
    const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const nextRouter = useRouter();

    useEffect(() => {
        if (token) {
            verifyEmail(token as string).then(r => r);
        }
    }, [token]);

    const verifyEmail = async (token: string) => {
        try {
            const response = await fetch(`${API_VERIFY_EMAIL}${token}`);
            if (response.ok) {
                setVerificationStatus('Email verified successfully!');
                // Redirect to signin page after successful verification
                setTimeout(() => {
                    nextRouter.push('/auth/signin');
                }, 2000); // Redirect after 2 seconds
            } else {
                setVerificationStatus('Email verification failed. Token is invalid or expired.');
            }
        } catch (error) {
            setVerificationStatus('An error occurred during verification.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="text-center">Verifying your email...</p>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-md shadow-md bg-white">
            <h1 className="text-2xl font-bold mb-4 text-center">Status Email Verification</h1>
            <div className="text-center">{verificationStatus && <p>{verificationStatus}</p>}</div>
        </div>
    );
};

export default VerifyEmailForm;
