"use client";
import React, { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import NewsDetailsForm from "@/components/admin/NewsDetailsForm";
import UploadThumbnailForm from "@/components/admin/UploadThumbnailForm";
import ReviewCreateForm from "@/components/admin/ReviewCreateForm";
import Swal from "sweetalert2";
import { createNews } from "@/services/api/news";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const steps = [
    {
        id: "01",
        name: "News Details",
        description: "Enter news title and content",
        status: "current",
    },
    {
        id: "02",
        name: "Upload Thumbnail",
        description: "Upload news thumbnail",
        status: "upcoming",
    },
    {
        id: "03",
        name: "Review & Create",
        description: "Review your news and create",
        status: "upcoming",
    },
];

interface NewsCreation {
    title: string;
    content: string;
    publish_date: Date;
    thumbnail: string;
    organization_id: number;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function CreateNewsTabs() {
    const session = useSession();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setNewsDetails] = useState<NewsCreation>({
        title: "",
        content: "",
        publish_date: new Date(),
        thumbnail: "",
        organization_id: 1,
    });

    const router = useRouter();

    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const organizationOptions = [
        {
            id: 1,
            name: "PUFA Computing",
        },
        {
            id: 2,
            name: "PUMA IT",
        },
        {
            id: 3,
            name: "PUMA IS",
        },
        {
            id: 4,
            name: "PUMA ID",
        },
        {
            id: 5,
            name: "PUMA VCD",
        },
    ];

    const [selectedOrganization, setSelectedOrganization] = useState(
        organizationOptions[0]
    );

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleNewsDetailsChange = (details: any) => {
        setNewsDetails(details);
    };

    const handleThumbnailChange = (file: File) => {
        setThumbnail(file);
    };

    const handleOrganizationChange = (selectedOption: any) => {
        setSelectedOrganization(selectedOption);
        setNewsDetails({
            ...formData,
            organization_id: selectedOption.id,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        if (
            !formData.title ||
            !formData.content ||
            !formData.publish_date ||
            !formData.organization_id ||
            !thumbnail
        ) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please fill all the fields",
            }).then((r) => r.dismiss);
            return;
        }

        const news = {
            title: formData.title,
            content: formData.content,
            publish_date: formData.publish_date,
            organization_id: formData.organization_id,
        };

        try {
            if (!session.data) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "You are not authorized to create news",
                }).then((r) => r.dismiss);
                return;
            }
            createNews(news, thumbnail, session.data.user.access_token).then(
                (response) => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "News created successfully",
                    }).then((r) => {
                        r.dismiss;
                        router.push("/admin/news");
                    });
                }
            );
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while creating the news",
            }).then((r) => r.dismiss);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <NewsDetailsForm
                        onNext={handleNext}
                        formData={formData}
                        onDetailsChange={handleNewsDetailsChange}
                        organizationOptions={organizationOptions}
                        selectedOrganization={selectedOrganization}
                        onOrganizationChange={handleOrganizationChange}
                    />
                );
            case 1:
                return (
                    <UploadThumbnailForm
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        onThumbnailChange={handleThumbnailChange}
                    />
                );
            case 2:
                return (
                    <ReviewCreateForm
                        onPrevious={handlePrevious}
                        onSubmit={handleSubmit}
                        formData={formData}
                        thumbnail={thumbnail}
                        selectedOrganization={selectedOrganization}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="lg:border-b lg:border-t lg:border-gray-200">
            <nav
                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
                aria-label="Progress"
            >
                <ol
                    role="list"
                    className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200"
                >
                    {steps.map((step, stepIdx) => {
                        const stepStatus =
                            stepIdx < currentStep
                                ? "complete"
                                : stepIdx === currentStep
                                  ? "current"
                                  : "upcoming";
                        return (
                            <li
                                key={step.id}
                                className="relative overflow-hidden lg:flex-1"
                            >
                                <div
                                    className={classNames(
                                        stepIdx === 0
                                            ? "rounded-t-md border-b-0"
                                            : "",
                                        stepIdx === steps.length - 1
                                            ? "rounded-b-md border-t-0"
                                            : "",
                                        "overflow-hidden border border-gray-200 lg:border-0"
                                    )}
                                >
                                    {stepStatus === "complete" ? (
                                        <a href="#" className="group">
                                            <span
                                                className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                                                aria-hidden="true"
                                            />
                                            <span
                                                className={classNames(
                                                    stepIdx !== 0
                                                        ? "lg:pl-9"
                                                        : "",
                                                    "flex items-start px-6 py-5 text-sm font-medium"
                                                )}
                                            >
                                                <span className="flex-shrink-0">
                                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
                                                        <CheckIcon
                                                            className="h-6 w-6 text-white"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                </span>
                                                <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                                                    <span className="text-sm font-medium">
                                                        {step.name}
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-500">
                                                        {step.description}
                                                    </span>
                                                </span>
                                            </span>
                                        </a>
                                    ) : stepStatus === "current" ? (
                                        <a href="#" aria-current="step">
                                            <span
                                                className="absolute left-0 top-0 h-full w-1 bg-indigo-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                                                aria-hidden="true"
                                            />
                                            <span
                                                className={classNames(
                                                    stepIdx !== 0
                                                        ? "lg:pl-9"
                                                        : "",
                                                    "flex items-start px-6 py-5 text-sm font-medium"
                                                )}
                                            >
                                                <span className="flex-shrink-0">
                                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600">
                                                        <span className="text-indigo-600">
                                                            {step.id}
                                                        </span>
                                                    </span>
                                                </span>
                                                <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                                                    <span className="text-sm font-medium text-indigo-600">
                                                        {step.name}
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-500">
                                                        {step.description}
                                                    </span>
                                                </span>
                                            </span>
                                        </a>
                                    ) : (
                                        <a href="#" className="group">
                                            <span
                                                className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                                                aria-hidden="true"
                                            />
                                            <span
                                                className={classNames(
                                                    stepIdx !== 0
                                                        ? "lg:pl-9"
                                                        : "",
                                                    "flex items-start px-6 py-5 text-sm font-medium"
                                                )}
                                            >
                                                <span className="flex-shrink-0">
                                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                                                        <span className="text-gray-500">
                                                            {step.id}
                                                        </span>
                                                    </span>
                                                </span>
                                                <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                                                    <span className="text-sm font-medium text-gray-500">
                                                        {step.name}
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-500">
                                                        {step.description}
                                                    </span>
                                                </span>
                                            </span>
                                        </a>
                                    )}

                                    {stepIdx !== 0 ? (
                                        <>
                                            {/* Separator */}
                                            <div
                                                className="absolute inset-0 left-0 top-0 hidden w-3 lg:block"
                                                aria-hidden="true"
                                            >
                                                <svg
                                                    className="h-full w-full text-gray-300"
                                                    viewBox="0 0 12 82"
                                                    fill="none"
                                                    preserveAspectRatio="none"
                                                >
                                                    <path
                                                        d="M0.5 0V31L10.5 41L0.5 51V82"
                                                        stroke="currentcolor"
                                                        vectorEffect="non-scaling-stroke"
                                                    />
                                                </svg>
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </nav>
            <div className="mt-8">{renderStepContent()}</div>
        </div>
    );
}
