"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import React, { useState } from "react";
import Seperator from "@/components/Seperator";
import {
    GetUserProfile,
    UpdateUserProfile,
    uploadProfilePicture,
    Disable2FA,
} from "@/services/api/user";
import User from "@/models/user";
import Image from "next/image";
import Swal from "sweetalert2";
import { Spinner } from "@/components/ui/Spinner";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardProfilePage() {
    const session = useSession();

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<User>();
    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [major, setMajor] = useState<string>("");
    const [batch, setBatch] = useState<string>("");
    const [is2FAEnable, setIs2FAEnable] = useState(true);
        const [profilePicture, setProfilePicture] = useState<File | null>(
        null
    );

    // Fetch user data
    React.useEffect(() => {
        const fetchData = async () => {
            if (session.data == null) {
                return;
            }
            try {
                const userData = await GetUserProfile(
                    session.data.user.id,
                    session.data.user.access_token
                );
                setUserData(userData);
                setUsername(userData.username);
                setFirstName(userData.first_name);
                setMiddleName(userData.middle_name || "");
                setLastName(userData.last_name);
                setEmail(userData.email);
                setMajor(userData.major);
                setBatch(userData.year);
                setIs2FAEnable(userData.twofa_enabled);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData().then((r) => r);
    }, [session.data]);

    const handleProfilePictureChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePicture(file);
        }
    };

    const handleProfilePictureUpload = async () => {
        if (profilePicture) {
            if (!session.data) {
                return;
            }
            try {
                const updatedUser = await uploadProfilePicture(
                    profilePicture,
                    session.data.user.access_token
                );
                setUserData(updatedUser);
                setProfilePicture(null);

                await Swal.fire({
                    icon: "success",
                    title: "Profile Picture Updated",
                    showConfirmButton: false,
                    timer: 1500,
                });

                window.location.reload();
            } catch (error) {
                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error uploading profile picture",
                });
                console.error("Error uploading profile picture:", error);
            }
        }
    };

    const handleSave = async () => {
        if (!session.data) {
            return;
        }
        try {
            const updatedUser = await UpdateUserProfile(
                username,
                firstName,
                middleName,
                lastName,
                email,
                major,
                batch,
                session.data.user.access_token
            );

            setUserData(updatedUser);

            await Swal.fire({
                icon: "success",
                title: "Profile Updated",
                showConfirmButton: false,
                timer: 1500,
            });

            window.location.reload();
        } catch (error) {
            console.error("Error updating user profile:", error);
        }
    };

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
                    await Disable2FA(accessToken);
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
    

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner className="text-sky-500">
                    <span className="text-sky-500">Loading...</span>
                </Spinner>
            </div>
        );
    }

    const Major = [
        { value: "informatics", label: "Informatics" },
        { value: "information System", label: "Information System" },
        {
            value: "visual communication design",
            label: "Visual Communication Design",
        },
        { value: "interior design", label: "Interior Design" },
    ];

    const Batch = [
        { value: "2023", label: "2023" },
        { value: "2022", label: "2022" },
        { value: "2021", label: "2021" },
    ];

    const tabs = [
        { name: "My Account", href: "#", current: true },
        { name: "Academic Information", href: "#", current: false },
        { name: "Verification Status", href: "#", current: false },
    ];

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <div>
            <div className="px-4 sm:px-4">
                <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                        Select a tab
                    </label>
                    {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                    <select
                        id="tabs"
                        name="tabs"
                        className="block w-full rounded-md border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        defaultValue={tabs.find((tab) => tab.current)?.name}
                    >
                        {tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <nav
                        className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
                        aria-label="Tabs"
                    >
                        {tabs.map((tab, tabIdx) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    tab.current
                                        ? "text-gray-900"
                                        : "text-gray-500 hover:text-gray-700",
                                    tabIdx === 0 ? "rounded-l-lg" : "",
                                    tabIdx === tabs.length - 1
                                        ? "rounded-r-lg"
                                        : "",
                                    "group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                                )}
                                aria-current={tab.current ? "page" : undefined}
                            >
                                <span>{tab.name}</span>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        tab.current
                                            ? "bg-sky-500"
                                            : "bg-transparent",
                                        "absolute inset-x-0 bottom-0 h-0.5"
                                    )}
                                />
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-5 p-4 lg:grid-cols-2">
                <div>
                    <div className="rounded-lg border border-[#CBCBCB] bg-white shadow-lg">
                        <div className="mt-2 px-6 py-3">
                            <p className="text-[16px] font-[500]">
                                Personal Information
                            </p>
                        </div>
                        <Seperator className="border-gray-100" />
                        <div className="mt-2 space-y-6 px-6 py-10 pb-6">
                            {/*Username*/}
                            <div>
                                <Input
                                    htmlFor="username"
                                    label="Username"
                                    type="text"
                                    value={username}
                                    placeholder={userData?.username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Input
                                    htmlFor="first-name"
                                    label="First Name"
                                    type="text"
                                    value={firstName}
                                    placeholder={userData?.first_name}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                                <Input
                                    htmlFor="middle-name"
                                    label="Middle Name*"
                                    type="text"
                                    value={middleName}
                                    placeholder={userData?.middle_name}
                                    onChange={(e) =>
                                        setMiddleName(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Input
                                    htmlFor="last-name"
                                    label="Last Name"
                                    type="text"
                                    value={lastName}
                                    placeholder={userData?.last_name}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Input
                                    htmlFor="email-address"
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    placeholder={userData?.email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <Input
                                    htmlFor="major"
                                    label="Major"
                                    type="text"
                                    value={major}
                                    placeholder={userData?.major}
                                    onChange={(e) => setMajor(e.target.value)}
                                />
                            </div>
                            <div>
                                <Input
                                    htmlFor="batch"
                                    label="Batch"
                                    type="text"
                                    value={batch}
                                    placeholder={userData?.year}
                                    onChange={(e) => setBatch(e.target.value)}
                                />
                            </div>
                            <div className="mt-16 flex justify-end space-x-2 py-5">
                                <Button
                                    onClick={handleSave}
                                    className="border-[#02ABF3] bg-[#02ABF3] px-8 py-2 text-white hover:bg-white hover:text-[#02ABF3]"
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className="rounded-lg border border-[#CBCBCB] bg-white shadow-lg"
                        style={{ height: "fit-content" }}
                    >
                        <div className="mt-2 px-6 py-3">
                            <p className="text-[16px] font-[500]">
                                Profile Photo
                            </p>
                        </div>
                        <Seperator className="border-gray-100" />
                        <div className="p-6">
                            <div className="mb-4">
                                <div className="flex gap-3">
                                    <div className="">
                                        <Image
                                            src={
                                                userData?.profile_picture ||
                                                "https://sg.pufacomputing.live/Assets/male.jpeg"
                                            }
                                            alt={`${userData?.first_name} ${userData?.last_name} Profile Picture's`}
                                            className="h-14 w-14 rounded-full"
                                            width={480}
                                            height={240}
                                        />
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                        <button
                                            onClick={() => {
                                                document
                                                    .getElementById(
                                                        "dropzone-file"
                                                    )
                                                    ?.click();
                                            }}
                                            className="font-medium"
                                        >
                                            Edit your photo
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="text-[#353535]">
                                <label
                                    htmlFor="dropzone-file"
                                    className="mx-auto mt-2 flex w-full max-w-xl cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-gray-400 dark:border-gray-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-8 w-8 text-gray-500 dark:text-gray-400"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                        />
                                    </svg>

                                    <h2 className="mt-1 font-medium tracking-wide">
                                        Add Profile Picture
                                    </h2>

                                    <p className="mt-2 text-xs tracking-wide ">
                                        Upload or darg & drop your file SVG,
                                        PNG, or JPG.{" "}
                                    </p>

                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        className="hidden"
                                        onChange={handleProfilePictureChange}
                                    />
                                </label>
                            </div>
                            <div className="mt-6 flex justify-end space-x-2">
                                <Button
                                    onClick={handleProfilePictureUpload}
                                    className="border-[#02ABF3] bg-[#02ABF3] px-8 py-2 text-white hover:bg-white hover:text-[#02ABF3]"
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* Update Password */}
                    <div className="mt-4">
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
                                    <div className="flex items-center gap-2">
                                        {is2FAEnable ? (
                                            <>
                                                <Button
                                                    className="border border-[#02ABF3] bg-white px-8 py-2 text-[#02ABF3] hover:bg-[#02ABF3] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                                    type="button"
                                                    onClick={handleDisable2FA}
                                                >
                                                    Disable 2FA
                                                </Button>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-[0.875rem] font-[500]">
                                                        Secure Your Account
                                                    </p>
                                                    <p className="rounded-xl border border-[#7ED8FF] bg-[#E1F3FF] px-2 py-0.5 text-[#02ABF3]">
                                                        Active
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Link href="2fa/setup">
                                                    <Button className="border border-[#02ABF3] bg-white px-8 py-2 text-[#02ABF3] hover:bg-[#02ABF3] hover:text-white disabled:cursor-not-allowed disabled:opacity-50">
                                                        Enable 2FA
                                                    </Button>
                                                </Link>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-[0.875rem] font-[500]">
                                                        Secure Your Account
                                                    </p>
                                                    <p className="rounded-xl border border-[#e03939] bg-[#fa8a8a] px-2 py-0.5 text-[#e03939]">
                                                        Inactive
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
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
            </div>
        </div>
    );
}
