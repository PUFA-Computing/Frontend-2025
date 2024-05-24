import "./globals.css";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import Providers from "@/components/Loading";
import { Suspense } from "react";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
    title: {
        template: "%s | PUFA Computing",
        default: "PUFA Computing",
    },
    description: "PUFA Computing is a organization in President University",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={poppins.className}>
					<AuthProvider>
                <Providers children={children} />
					</AuthProvider>
            </body>
        </html>
    );
}
