import NextAuth from "next-auth";
import type { JWT, DefaultJWT } from "next-auth/jwt";

export type UserType = {
    id: string;
    username: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
    student_id: string;
    major: string;
    profile_picture: string;
    date_of_birth: string | null;
    role_id: number;
    created_at: string;
    updated_at: string;
    year: string;
    email_verified: boolean;
    email_verification_token: string;
    password_reset_token: string;
    password_reset_expires: string | null;
    student_id_verified: boolean;
    student_id_verification: string | null;
    institution_name: string | null;
    gender: string;
    access_token: string;
};

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            first_name: string;
            middle_name?: string;
            last_name: string;
            email: string;
            student_id: string;
            major: string;
            profile_picture: string;
            date_of_birth: string | null;
            role_id: number;
            created_at: string;
            updated_at: string;
            year: string;
            email_verified: boolean;
            email_verification_token: string;
            password_reset_token: string;
            password_reset_expires: string | null;
            student_id_verified: boolean;
            student_id_verification: string | null;
            institution_name: string | null;
            gender: string;
            access_token: string;
        };
    }

    interface Profile {
        given_name: string;
        family_name: string;
    }

    interface Account {}
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        username: string;
        first_name: string;
        middle_name?: string;
        last_name: string;
        email: string;
        student_id: string;
        major: string;
        profile_picture: string;
        date_of_birth: string | null;
        role_id: number;
        created_at: string;
        updated_at: string;
        year: string;
        email_verified: boolean;
        email_verification_token: string;
        password_reset_token: string;
        password_reset_expires: string | null;
        student_id_verified: boolean;
        student_id_verification: string | null;
        institution_name: string | null;
        gender: string;
        access_token: string;
    }

    interface DefaultJWT {
        id: string;
        username: string;
        first_name: string;
        middle_name?: string;
        last_name: string;
        email: string;
        student_id: string;
        major: string;
        profile_picture: string;
        date_of_birth: string | null;
        role_id: number;
        created_at: string;
        updated_at: string;
        year: string;
        email_verified: boolean;
        email_verification_token: string;
        password_reset_token: string;
        password_reset_expires: string | null;
        student_id_verified: boolean;
        student_id_verification: string | null;
        institution_name: string | null;
        gender: string;
        access_token: string;
    }
}
