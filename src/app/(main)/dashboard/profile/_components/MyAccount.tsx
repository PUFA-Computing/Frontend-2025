"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Seperator from "@/components/Seperator";
import { Spinner } from "@/components/ui/Spinner";
import {
    GetUserProfile,
    UpdateUserProfile,
    uploadProfilePicture,
} from "@/services/api/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import User from "@/models/user";
import Select from "react-select";

interface Props {
    userData?: {
        date_of_birth?: Date;
    };
}

const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    const d = new Date(date);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
};

const parseDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split("-");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

export default function MyAccount() {
    const session = useSession();

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<User>();
    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [middleName, setMiddleName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(
        userData?.date_of_birth
    );
    const [major, setMajor] = useState<string>("");
    const [batch, setBatch] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [gender, setGender] = useState<string>("");

    const genderOptions = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
    ];

    // Fetch user data
    useEffect(() => {
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
                setGender(userData.gender);
                setDateOfBirth(userData.date_of_birth);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData().then((r) => r);
    }, [session]);

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
        if (!dateOfBirth) {
          console.error("Date of birth is required");
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
                gender,
                dateOfBirth,
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

    const handleGenderChange = (selectedOption: any) => {
        setGender(selectedOption ? selectedOption.value : "");
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

    return (
        <section>
            <div className="grid grid-cols-1 gap-5 p-4 lg:grid-cols-2">
                <div>
                    <div className="rounded-lg border border-[#CBCBCB] bg-white shadow-lg">
                        <div className="mt-2 px-6 py-3">
                            <p className="text-[16px] font-[500]">
                                Personal Information
                            </p>
                        </div>
                        <Seperator className="border-gray-100" />
                        <div className="mt-2 space-y-6 px-6 pb-6">
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
                                <label
                                    htmlFor="date-of-birth"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Date of Birth
                                </label>
                                <input
                                    id="date-of-birth"
                                    type="date"
                                    value={formatDate(dateOfBirth)}
                                    placeholder={
                                        userData?.date_of_birth
                                            ? formatDate(userData.date_of_birth)
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setDateOfBirth(
                                            parseDate(e.target.value)
                                        )
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="gender"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Gender
                                </label>
                                <Select
                                    id="gender"
                                    value={genderOptions.find(
                                        (option) => option.value === gender
                                    )}
                                    onChange={handleGenderChange}
                                    options={genderOptions}
                                    placeholder={userData?.gender}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                                            className="h-16 w-16 rounded-full object-cover"
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
                </div>
            </div>
        </section>
    );
}
