import React from "react";
import User from "@/models/user";

function ViewVerificationModal({
    verificationInfo,
    onClose,
}: {
    verificationInfo: any; // Define the type for verification info
    onClose: () => void;
}) {
    console.log("Verification URL:", verificationInfo.student_id_verification);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {/*        student_id_verification is link of the image and we need to show the image*/}
            <div className="rounded-lg bg-white p-4 shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">
                    Verification Info
                </h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Student ID Verification
                    </label>
                    <img
                        src={verificationInfo.student_id_verification}
                        alt="Student ID Verification"
                        className="h-96 w-full object-cover"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="rounded-lg bg-red-500 px-4 py-2 text-white"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ViewVerificationModal;
