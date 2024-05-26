import axios, { AxiosError } from "axios";
import { API_EVENT, API_USER } from "@/config/config";
import Event from "@/models/event";
import User from "@/models/user";

/**
 * Fetches the user profile data from the API.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await GetUserProfile();
 */
export async function GetUserProfile(userId: string, token: string) {
    try {
        const response = await axios.get(`${API_USER}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data?.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response);
        } else {
            console.log(error);
        }
        throw error;
    }
}

/**
 * @UpdateUserProfile
 * Updates the user profile data in the API.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await UpdateUserProfile();
 */
export async function UpdateUserProfile(
    username: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    email: string,
    major: string,
    year: string,
    accessToken: string
) {
    try {
        const response = await axios.put(
            `${API_USER}/edit`,
            {
                username,
                first_name,
                middle_name,
                last_name,
                email,
                major,
                year,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function UpdatePassword(password: string, accessToken: string) {
    try {
        const response = await axios.put(
            `${API_USER}/edit`,
            {
                password,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * @DeleteUserProfile Deletes the user profile data in the API.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request
 * @example
 * const user = await DeleteUserProfile();
 */
export async function DeleteUserProfile() {
    try {
        const response = await axios.delete(`${API_USER}/delete`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * @Logout Logs the user out of the API.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await Logout();
 */
export async function Logout() {
    try {
        const response = await axios.post(`${API_USER}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Fetches the user data from the API.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await GetUser();
 */
export async function GetUser(accessToken: string) {
    try {
        const response = await axios.get(`${API_USER}/list`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/** Fetches the events that the user has registered for from the API.
 * @returns {Promise<Event[]>} A promise that resolves to an array of Event objects.
 * @throws {Error} If an error occurs during the API request.
 * @param accessToken The access token to authenticate the request.
 */
export async function fetchUserEvents(accessToken: string) {
    try {
        const response = await axios.get(`${API_USER}/registered-events`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data?.data || [];
    } catch (error) {
        console.error("Error fetching user events", error);
        throw error;
    }
}

/**
 * Fetches the user data from the API.
 * @param userId The ID of the user to fetch.
 * @param roleID The ID of the role to update the user to.
 * @param studentIDVerified Whether the student ID is verified.
 * @param accessToken The access token to authenticate the request.
 *
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await adminUpdateUser();
 */
export async function adminUpdateUser(
    userId: string | undefined,
    roleID: number | undefined,
    studentIDVerified: boolean | undefined,
    accessToken: string | undefined
): Promise<User> {
    try {
        // Json Body
        const response = await axios.put(
            `${API_USER}/${userId}/update-user`,
            {
                role_id: roleID,
                student_id_verified: studentIDVerified,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        console.log(response);

        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * @uploadProfilePicture Uploads a profile picture for the current user.
 * @param file The file to upload.
 * @param accessToken The access token to authenticate the request.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await uploadProfilePicture(file);
 * @see https://developer.mozilla.org/en-US/docs/Web/API/FormData
 */
export async function uploadProfilePicture(file: File, accessToken: string) {
    try {
        const formData = new FormData();
        formData.append("profile_picture", file);

        const response = await axios.post(
            `${API_USER}/upload-profile-picture`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data.data;
    } catch (error) {
        console.error("Error uploading profile picture", error);
        throw error;
    }
}
