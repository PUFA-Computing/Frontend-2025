interface User {
    id: string;
    username: string;
    password: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
    student_id?: string;
    major?: string;
    profile_picture: string;
    date_of_birth: string;
    role_id: number;
    created_at?: string;
    updated_at?: string;
    year: string;
    email_verified?: boolean;
    student_id_verified: boolean;
    student_id_verification?: string;
    institution_name?: string;
    gender: string;
}

export default User;
