import axios, { AxiosError } from "axios";
import { API_USER } from "@/config/config";
import Event from "@/models/event";
import User from "@/models/user";

/**
 * Fetches the user profile data from the API.
 * @param {string} userId - The ID of the user to fetch.
 * @param {string} token - The access token to authenticate the request.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await GetUserProfile('userId', 'token');
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
 * Updates the user profile data in the API.
 * @param {string} username - The username of the user.
 * @param {string} first_name - The first name of the user.
 * @param {string} middle_name - The middle name of the user.
 * @param {string} last_name - The last name of the user.
 * @param {string} email - The email of the user.
 * @param {string} major - The major of the user.
 * @param {string} year - The year of the user.
 * @param {string} accessToken - The access token to authenticate the request.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await UpdateUserProfile('username', 'first_name', 'middle_name', 'last_name', 'email', 'major', 'year', 'accessToken');
 */
export async function UpdateUserProfile(
    username: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    email: string,
    major: string,
    year: string,
    gender: string,
    date_of_birth: string,
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
                gender,
                year,
                date_of_birth,
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
 * Updates the user password in the API.
 * @param {string} password - The new password for the user.
 * @param {string} accessToken - The access token to authenticate the request.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await UpdatePassword('newPassword', 'accessToken');
 */
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
 * Deletes the user profile data in the API.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
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
 * Logs the user out of the API.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await Logout();
 */
export async function Logout() {
    try {
        const response = await axios.post(`${API_USER}/logout`);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Fetches the user data from the API.
 * @param {string} accessToken - The access token to authenticate the request.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await GetUser('accessToken');
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

/**
 * Fetches the events that the user has registered for from the API.
 * @param {string} accessToken - The access token to authenticate the request.
 * @returns {Promise<Event[]>} A promise that resolves to an array of Event objects.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const events = await fetchUserEvents('accessToken');
 */
export async function fetchUserEvents(accessToken: string): Promise<Event[]> {
    try {
        const response = await axios.get(`${API_USER}/registered-events`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (Array.isArray(response.data?.data)) {
            return response.data.data;
        } else {
            console.error("Unexpected response structure:", response.data);
            return [];
        }
    } catch (error) {
        console.error("Error fetching user events", error);
        throw error;
    }
}

/**
 * Updates the user data as an admin in the API.
 * @param {string} userId - The ID of the user to update.
 * @param {number} roleID - The ID of the role to update the user to.
 * @param {boolean} studentIDVerified - Whether the student ID is verified.
 * @param {string} accessToken - The access token to authenticate the request.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await adminUpdateUser('userId', 1, true, 'accessToken');
 */
export async function adminUpdateUser(
    userId: string | undefined,
    roleID: number | undefined,
    studentIDVerified: boolean | undefined,
    accessToken: string | undefined
): Promise<User> {
    try {
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
 * Uploads a profile picture for the current user.
 * @param {File} file - The file to upload.
 * @param {string} accessToken - The access token to authenticate the request.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await uploadProfilePicture(file, 'accessToken');
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

/**
 * Enables 2FA for the user.
 * @param {string} session - The session token to authenticate the request.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await Enable2FA('sessionToken');
 */
export async function Enable2FA(session: string) {
    try {
        const response = await axios.post(
            `${API_USER}/2fa/enable`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${session}`,
                },
            }
        );
        return response.data.data;
    } catch (error) {
        console.log("Error enabling 2FA:", error);
        throw error;
    }
}

/**
 * Verifies the 2FA code for the user.
 * @param {Verify2FAProps} props - The properties for verification.
 * @param {string} props.passcode - The 2FA code to verify.
 * @param {string} props.accessToken - The access token to authenticate the request.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await Verify2FA({ passcode: '123456', accessToken: 'token' });
 */

interface Verify2FAProps {
    passcode: string;
    accessToken: string;
}

export async function Verify2FA({ passcode, accessToken }: Verify2FAProps) {
    try {
        const response = await axios.post(
            `${API_USER}/2fa/verify`,
            {
                code: passcode,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

/**
 * Toggles the 2FA status for the user.
 * @param {string} accessToken - The access token to authenticate the request.
 * @param {boolean} enable - Whether to enable or disable 2FA.
 * @returns {Promise<User>} A promise that resolves to a User object.
 * @throws {Error} If an error occurs during the API request.
 * @example
 * const user = await Toggle2FA('accessToken', true);
 */

export async function Toggle2FA(accessToken: string, enable: boolean) {
    try {
        const response = await axios.post(
            `${API_USER}/2fa/toggle`,
            {
                enable: enable,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function VerifyStudentID(file: File, accessToken: string) {
    try {
        const formData = new FormData();
        formData.append("student_id", file);

        const response = await axios.post(
            `${API_USER}/upload-student-id`,
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
