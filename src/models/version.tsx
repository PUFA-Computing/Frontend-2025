export interface ChangelogEntry {
    [key: string]: string[];
}

export interface Version {
    latest_version: string;
    changelog: ChangelogEntry;
}
