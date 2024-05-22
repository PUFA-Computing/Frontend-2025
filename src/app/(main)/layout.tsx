import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import GetVersion from "@/services/api/version";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const version = await GetVersion();
    return (
        <div className="flex min-h-screen flex-col scroll-smooth">
            <Navbar />
            <div className="flex-1 bg-[#FBFBFB]">{children}</div>
            <Footer version={version} />
        </div>
    );
}
