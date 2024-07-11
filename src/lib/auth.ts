import Login from "@/services/api/auth";
import { GetUser, GetUserProfile } from "@/services/api/user";
import { UserType } from "@/types/next-auth";
import { AxiosError } from "axios";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface Credentials extends Record<"username" | "password", string> {
    passcode?: string;
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
                passcode: { label: "Passcode", type: "text" },
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    throw new Error("No credentials provided");
                }
                try {
                    const response = await Login(
                        credentials.username,
                        credentials.password,
                        credentials.passcode
                    );
                    const user = await GetUserProfile(
                        response.data.user_id,
                        response.data.access_token
                    );
                    return {
                        id: response.data.user_id,
                        access_token: response.data.access_token,
                        ...user,
                    };
                } catch (err) {
                    if (err instanceof AxiosError) {
                        throw new Error(
                            err.response?.data.message || err.message
                        );
                    }
                }
            },
        }),
    ],
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user = token;
            }

            try {
                const { password, ...user } = await GetUserProfile(
                    session.user.id,
                    session.user.access_token
                );
                session.user = { ...session.user, ...user };
            } catch (err) {
                throw new Error("Invalid session token");
            }
            return session;
        },
        // @ts-ignore
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
    },
};

export async function getSessionServer() {
    const session = await getServerSession(authOptions);
    return session;
}
