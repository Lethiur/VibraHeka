export {};

declare global {
    interface Window {
        fbq?: (
            command: "init" | "track" | "trackCustom" | "consent",
            eventName: string,
            parameters?: Record<string, unknown>
        ) => void;
    }
}