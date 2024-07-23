import Verify2FA from "@/app/(auth)/auth/verify-2fa/_components/verify2fa";

export default function Verify2FAPage() {
    return (
        <div
            className="bg-cover bg-center"
            style={{ backgroundImage: `url('/doodle.svg')` }}
        >
            <div className="container mx-auto flex min-h-screen items-center justify-center px-6">
                <div className="mx-auto max-w-lg">
                    <Verify2FA />
                </div>
            </div>
        </div>
    );
}
