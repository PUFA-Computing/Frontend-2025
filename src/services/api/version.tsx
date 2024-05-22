import { API_VERSION } from "@/config/config";

export default async function GetVersion() {
    try {
        const response = await fetch(API_VERSION);

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch version:", error);
    }
}
