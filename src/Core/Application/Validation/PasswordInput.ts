// Helpers to make password handling more robust on mobile (autofill/IME can introduce
// canonically-equivalent Unicode forms or invisible characters that users can't see).

const ZERO_WIDTH_CHARS_RE = /[\u200B-\u200D\u2060\uFEFF]/g; // ZWSP..ZWJ, Word Joiner, BOM

export function sanitizePasswordInput(input: string): string {
    if (!input) return "";

    // `String.prototype.normalize` is broadly supported in modern browsers, but keep a safe fallback.
    const normalized = typeof (input as any).normalize === "function" ? input.normalize("NFC") : input;
    return normalized.replace(ZERO_WIDTH_CHARS_RE, "");
}

export function passwordsMatch(a: string, b: string): boolean {
    return sanitizePasswordInput(a) === sanitizePasswordInput(b);
}