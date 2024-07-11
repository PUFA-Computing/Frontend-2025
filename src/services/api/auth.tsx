import axios from "axios";
import { API_LOGIN, API_LOGOUT, API_REGISTER } from "@/config/config";
import User from "@/models/user";

export const Login = async (
    username: string,
    password: string,
    passcode?: string
) => {
    const data: { username: string; password: string; passcode?: string } = {
        username,
        password,
    };

    // Only include passcode if it's provided
    if (passcode) {
        data.passcode = passcode;
    }

    try {
        const response = await axios.post(API_LOGIN, data, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Failed to Login", error);
        throw error;
    }
};

export const Logout = async () => {
    try {
        const response = await axios.post(
            API_LOGOUT,
            {},
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization:
                        "Bearer " + localStorage.getItem("access_token") || "",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Failed to Logout", error);
        throw error;
    }
};

export const Register = async (user: User) => {
    try {
        const response = await axios.post(
            API_REGISTER,
            {
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
                role_id: user.role_id,
                student_id: user.student_id,
                year: user.year,
            },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Failed to Register", error);
        throw error;
    }
};

export default Login;
