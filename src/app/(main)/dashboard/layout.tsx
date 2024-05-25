import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getSessionServer } from "@/lib/auth";
import ToggleButton from "./_components/ToggleButton";
import DashboardSidebar from "./_components/DashboardSidebar";
import { DashobardContextProvider } from "./_components/DashboardContext";
import DashboardContent from "./_components/DashboardContent";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSessionServer();
    if (!session) return redirect("/auth/signin");

    return (
        <DashobardContextProvider>
            <div className="flex h-screen">
                {/* Sidebar */}
                {session.user && <DashboardSidebar />}

                {/* Main content */}
                
					 <DashboardContent>{children}</DashboardContent>

                {/* Toggle button */}
                <ToggleButton />
            </div>
        </DashobardContextProvider>
    );
}
