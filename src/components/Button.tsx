import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    disabled?: boolean;
}

export default function Button({
    children,
    className,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                `rounded-lg px-4 py-2 text-black duration-300 ease-in-out hover:bg-opacity-90 hover:text-blue-500`,
                className
            )}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
