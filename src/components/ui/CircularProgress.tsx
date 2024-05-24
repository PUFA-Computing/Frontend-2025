import { Spinner } from "@/components/ui/Spinner";
import React from "react";

export const CircularProgress = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <Spinner className="text-sky-500">
                <span className="text-sky-500">Loading...</span>
            </Spinner>
        </div>
    );
};
