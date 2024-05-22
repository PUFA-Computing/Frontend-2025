import React, { Suspense } from "react";
import VerifyEmailForm from './_components/VerifyEmailForm';

const VerifyEmailPage: React.FC = () => {
    return (
        <div
            className="bg-cover bg-center"
            style={{ backgroundImage: `url('/doodle.svg')` }}
        >
            <div className="container mx-auto flex min-h-screen items-center justify-center px-6">
                <div className="mx-auto max-w-md">
                    <Suspense>
                        <VerifyEmailForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPage;
