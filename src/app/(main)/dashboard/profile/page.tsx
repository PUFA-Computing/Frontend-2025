"use client";
import React, { useState } from "react";
import SecurityPage from "./_components/SecurityPage";
import VerificationStatus from "./_components/VerificationStatus";
import AcademicInformation from "./_components/AcademicInformation";
import MyAccount from "./_components/MyAccount";

export default function DashboardProfilePage() {
    const [activeTab, setActiveTab] = useState("My Account");

    const tabs = [
        { name: "My Account", current: activeTab === "My Account" },
        {
            name: "Academic Information",
            current: activeTab === "Academic Information",
        },
        {
            name: "Verification Status",
            current: activeTab === "Verification Status",
        },
        { name: "Security", current: activeTab === "Security" },
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
                    <select
                        id="tabs"
                        name="tabs"
                        className="block w-full rounded-md border-gray-300 focus:border-sky-500 focus:ring-sky-500"
                        value={activeTab}
                        onChange={(e) => setActiveTab(e.target.value)}
                    >
                        {tabs.map((tab) => (
                            <option key={tab.name} value={tab.name}>
                                {tab.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <nav
                        className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
                        aria-label="Tabs"
                    >
                        {tabs.map((tab, tabIdx) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
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
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
            {activeTab === "My Account" && <MyAccount />}
            {activeTab === "Academic Information" && <AcademicInformation />}
            {activeTab === "Verification Status" && <VerificationStatus />}
            {activeTab === "Security" && <SecurityPage />}
        </div>
    );
}
