export interface Version {
    latest_version: string;
    changelog: Changelog[];
}

interface Changelog {
    version: string;
    changes: string[];
}
