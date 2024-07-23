"use client";
import React, { useState } from "react";
import InputEmail from "./_components/InputEmail";
import OTPForm from "./_components/InputOTP";
import InputNewPassword from "./_components/InputNewPassword";
import { CheckIcon } from "lucide-react";

export default function Page() {
    const [currentStep, setCurrentStep] = useState<string>("Input Email");
    const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
    const [otpSubmitted, setOtpSubmitted] = useState<boolean>(false);

    const steps = [
        {
            id: "01",
            name: "Input Email",
            component: () => (
                <InputEmail
                    onSubmit={() => {
                        setEmailSubmitted(true);
                        setCurrentStep("Input OTP");
                    }}
                />
            ),
            status: currentStep === "Input Email" ? "current" : "completed",
        },
        {
            id: "02",
            name: "Input OTP",
            component: () => (
                <OTPForm
                    onSubmit={() => {
                        setOtpSubmitted(true);
                        setCurrentStep("Input New Password");
                    }}
                />
            ),
            status: currentStep === "Input OTP" ? "current" : otpSubmitted ? "completed" : emailSubmitted ? "upcoming" : "disabled",
        },
        {
            id: "03",
            name: "Input New Password",
            component: InputNewPassword,
            status: currentStep === "Input New Password" ? "current" : otpSubmitted ? "upcoming" : "disabled",
        },
    ];

    const handleStepChange = (stepName: string) => {
        const currentStepIndex = steps.findIndex(step => step.name === currentStep);
        const nextStepIndex = steps.findIndex(step => step.name === stepName);
        
        // Ensure we only navigate to the next step or the current step, but not previous ones
        if (nextStepIndex > currentStepIndex && steps[nextStepIndex].status !== "completed") {
            setCurrentStep(stepName);
        }
    };

    const classNames = (...classes: string[]) => {
        return classes.filter(Boolean).join(" ");
    };

    const currentComponent = steps.find(
        (step) => step.name === currentStep
    )?.component;

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center flex flex-col"
            style={{ backgroundImage: `url('/doodle.svg')` }}
        >
            <nav aria-label="Progress" className="">
                <ol
                    role="list"
                    className="divide-y divide-gray-300 rounded-md border bg-white border-gray-300 md:flex md:divide-y-0"
                >
                    {steps.map((step, stepIdx) => (
                        <li
                            key={step.name}
                            className="relative md:flex md:flex-1"
                        >
                            {step.status === "completed" ? (
                                <div
                                    className="group flex w-full items-center cursor-not-allowed opacity-50"
                                    aria-disabled="true"
                                >
                                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600">
                                            <CheckIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </span>
                                        <span className="ml-4 text-sm font-medium text-gray-900">
                                            {step.name}
                                        </span>
                                    </span>
                                </div>
                            ) : step.status === "current" ? (
                                <button
                                    onClick={() => handleStepChange(step.name)}
                                    className="flex items-center px-6 py-4 text-sm font-medium"
                                    aria-current="step"
                                >
                                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                                        <span className="text-indigo-600">
                                            {step.id}
                                        </span>
                                    </span>
                                    <span className="ml-4 text-sm font-medium text-indigo-600">
                                        {step.name}
                                    </span>
                                </button>
                            ) : step.status === "upcoming" ? (
                                <button
                                    onClick={() => handleStepChange(step.name)}
                                    className="group flex items-center"
                                >
                                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                                            <span className="text-gray-500 group-hover:text-gray-900">
                                                {step.id}
                                            </span>
                                        </span>
                                        <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                                            {step.name}
                                        </span>
                                    </span>
                                </button>
                            ) : (
                                <div
                                    className="group flex items-center cursor-not-allowed opacity-50"
                                >
                                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                                            <span className="text-gray-500">
                                                {step.id}
                                            </span>
                                        </span>
                                        <span className="ml-4 text-sm font-medium text-gray-500">
                                            {step.name}
                                        </span>
                                    </span>
                                </div>
                            )}

                            {stepIdx !== steps.length - 1 ? (
                                <>
                                    {/* Arrow separator for lg screens and up */}
                                    <div
                                        className="absolute right-0 top-0 hidden h-full w-5 md:block"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            className="h-full w-full text-gray-300"
                                            viewBox="0 0 22 80"
                                            fill="none"
                                            preserveAspectRatio="none"
                                        >
                                            <path
                                                d="M0 -2L20 40L0 82"
                                                vectorEffect="non-scaling-stroke"
                                                stroke="currentcolor"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </>
                            ) : null}
                        </li>
                    ))}
                </ol>
            </nav>

            <div className="mt-8">
                {currentComponent
                    ? React.createElement(currentComponent)
                    : null}
            </div>
        </div>
    );
}
