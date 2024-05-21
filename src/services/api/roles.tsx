import { API_ROLE, API_USER } from "@/config/config";
import axios from "axios";

export async function GetRoles() {
    try {
        const response = await axios.get(`${API_ROLE}`, {
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
