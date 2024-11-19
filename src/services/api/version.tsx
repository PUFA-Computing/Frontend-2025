import { API_VERSION } from "@/config/config";
import axios from "axios";

export default async function GetVersion() {
    try {
        const response = await fetch(API_VERSION);

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch version:", error);
    }
}

export interface ChangelogEntry {
    [version: string]: string[];
}

export interface ChangelogResponse {
    changelog: ChangelogEntry[];
}

export async function GetChangeLog(): Promise<ChangelogResponse | null> {
    try {
        const response = await fetch(`${API_VERSION}/changelog`);
        if (!response.status) {
            throw new Error('Failed to fetch');
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch log : ", error);
        return null;
    }
}
