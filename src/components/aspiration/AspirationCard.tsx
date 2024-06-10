"use client";
import React, { useState } from "react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import Aspiration from "@/models/aspiration";

type AspirationCardProps = {
    aspiration: Aspiration;
};

const AspirationCard: React.FC<AspirationCardProps> = ({ aspiration }) => {
    const [showAdminReply, setShowAdminReply] = useState(false);

    // Handler untuk menampilkan atau menyembunyikan balasan admin
    const toggleAdminReply = () => {
        setShowAdminReply(!showAdminReply);
    };
    // like icon
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
    };

    const dateConvert = (date: Date) => {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        return `${date.getDate().toString().padStart(2, "0")} ${
            months[date.getMonth()]
        } ${date.getFullYear().toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex flex-col gap-4 rounded-lg border-2 border-gray-300 p-4 md:p-6">
            <div className="flex flex-row justify-between">
                <h1 className="text-lg font-bold capitalize md:text-xl">
                    {aspiration.subject}
                </h1>
                {aspiration.admin_reply && (
                    <button
                        onClick={toggleAdminReply}
                        className={`md:ml-auto ${
                            showAdminReply ? "rotate-180 duration-300" : ""
                        }`}
                    >
                        <svg
                            width="12"
                            height="8"
                            viewBox="0 0 12 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                id="Icon"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.351472 0.390524C0.820101 -0.130175 1.5799 -0.130175 2.04853 0.390524L6 4.78105L9.95147 0.390524C10.4201 -0.130175 11.1799 -0.130175 11.6485 0.390524C12.1172 0.911223 12.1172 1.75544 11.6485 2.27614L6.84853 7.60948C6.3799 8.13017 5.6201 8.13017 5.15147 7.60948L0.351472 2.27614C-0.117157 1.75544 -0.117157 0.911223 0.351472 0.390524Z"
                                fill="#6B7280"
                            />
                        </svg>
                    </button>
                )}
            </div>
            <p className="text-[16px] font-[400] text-[#6B7280]">
                {aspiration.message}
            </p>
            {showAdminReply && (
                <p className="text-[16px] font-[400] text-[#111827]">
                    {" "}
                    Admin :{" "}
                    <span className="text-[16px] font-[400] text-[#6B7280]">
                        {" "}
                        {aspiration.admin_reply}{" "}
                    </span>
                </p>
            )}
            <div className="flex flex-col">
                {/*Author if anonymous show anonymous if its false show user_id*/}
                <p className="text-[14px] font-semibold text-[#111827]">
                    From:{" "}
                    {aspiration.anonymous
                        ? "Anonymous"
                        : aspiration.author.name}
                </p>
                <div className="flex flex-col gap-2 text-sm md:flex-row md:justify-between">
                    <div className="text-[#6B7280]">
                        <p>
                            To: {aspiration.organization.name} <span> · </span>{" "}
                            <span>{dateConvert(aspiration.updated_at)}</span>
                        </p>
                    </div>

                    {/*Like and Like Count*/}
                    <div className="flex flex-row gap-4">
                        <button
                            onClick={toggleLike}
                            className="flex items-center gap-1 text-2xl text-[#6B7280] disabled:cursor-not-allowed disabled:opacity-50"
                            disabled
                        >
                            {liked ? (
                                <IoIosHeart className="text-3xl" />
                            ) : (
                                <IoIosHeartEmpty className="text-3xl" />
                            )}
                            <span className="text-xl">{aspiration.upvote}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AspirationCard;
