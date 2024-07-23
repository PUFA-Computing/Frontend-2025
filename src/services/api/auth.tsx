import axios from "axios";
import {
    API_FORGOT_PASSWORD,
    API_LOGIN,
    API_LOGOUT,
    API_REGISTER,
} from "@/config/config";
import User from "@/models/user";
import { string } from "zod";

/**
 * Logs the user into the system.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @param {string} [passcode] - The optional 2FA passcode for the user.
 * @returns {Promise<any>} A promise that resolves to the response data.
 * @throws {Error} If an error occurs during the login process.
 * @example
 * const response = await Login('username', 'password', '123456');
 */
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

/**
 * Logs the user out of the system.
 * @returns {Promise<any>} A promise that resolves to the response data.
 * @throws {Error} If an error occurs during the logout process.
 * @example
 * const response = await Logout();
 */
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

/**
 * Registers a new user in the system.
 * @param {User} user - The user object containing the user details.
 * @returns {Promise<any>} A promise that resolves to the response data.
 * @throws {Error} If an error occurs during the registration process.
 * @example
 * const user: User = {
 *   username: 'newuser',
 *   first_name: 'First',
 *   last_name: 'Last',
 *   email: 'user@example.com',
 *   password: 'password',
 *   role_id: 1,
 *   student_id: '123456',
 *   year: '2024'
 * };
 * const response = await Register(user);
 */
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

export const ForgotPassword = async (
    email: string,
    otp: string,
    password?: string
) => {
    const data: { email: string; otp: string; password?: string } = {
        "email": email,
        "otp": otp,
        "password": password
    };

    try {
        const response = await axios.post(API_FORGOT_PASSWORD, data, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log("Failed to Change the Password: ", error);
        throw error;
    }
};

export const ForgotPasswordRequest = async (email : string) => {
    try {
        const response = await axios.post(`${API_FORGOT_PASSWORD}/request`, {
            "email": email, 
        });
        return response.data;
    } catch (error) {
        console.error("Error requesting password reset:", error);
        throw error;
    }
};

