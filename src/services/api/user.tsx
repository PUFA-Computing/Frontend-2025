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
export async function GetUserProfile(userId?: string, token?: string) {
    try {
      //   const id = localStorage.getItem("userId");
        const response = await axios.get(`${API_USER}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data?.data;
    } catch (error) {
		if(error instanceof AxiosError) {
			console.log(error.response)
		} else {
			console.log(error)
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
    year: string
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
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }
        );

        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function UpdatePassword(password: string) {
    try {
        const response = await axios.put(
            `${API_USER}/edit`,
            {
                password,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
export async function GetUser() {
    try {
        const response = await axios.get(`${API_USER}/list`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        });

        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/** Fetches the events that the user has registered for from the API.
 * @param {string} userId The ID of the user to fetch events for.
 * @returns {Promise<Event[]>} A promise that resolves to an array of Event objects.
 * @throws {Error} If an error occurs during the API request.
 */
export async function fetchUserEvents(userId: string) {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) {
            throw new Error("No access token found");
        }

        const response = await axios.get(`${API_USER}/registered-events`, {
            headers: {
                Authorization: `Bearer ${token}`,
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
 *
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await adminUpdateUser();
 */
export async function adminUpdateUser(
    userId: string | undefined,
    roleID: number | undefined,
    studentIDVerified: boolean | undefined
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
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await uploadProfilePicture(file);
 * @see https://developer.mozilla.org/en-US/docs/Web/API/FormData
 */
export async function uploadProfilePicture(file: File) {
    try {
        const formData = new FormData();
        formData.append("profile_picture", file);

        const response = await axios.post(
            `${API_USER}/upload-profile-picture`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }
        );

        return response.data.data;
    } catch (error) {
        console.error("Error uploading profile picture", error);
        throw error;
    }
}
