import "./globals.css";
import { Poppins } from "next/font/google";
import Providers from "@/components/Loading";
import AuthProvider from "@/components/AuthProvider";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
    title: {
        template: "%s | PUFA Computer Science",
        default: "PUFA Computer Science",
    },
    description: "PUFA Computer Science is a organization in President University",
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
