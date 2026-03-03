/* ============
   Utils
   ============ */

/**
 * Formats a date string for display in the table.
 * @param date The date string to format.
 * @returns The formatted date string or a dash if the date is invalid or empty.
 */
export function FormatDate(date: string): string {
    if (!date || date.startsWith("0001-01-01")) {
        return "—";
    }

    return new Date(date).toLocaleDateString();
}