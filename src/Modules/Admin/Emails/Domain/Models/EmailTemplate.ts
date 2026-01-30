/**
 * Represents an email template.
 */
export interface EmailTemplate {
    /**
     * The unique identifier of the template.
     */
    ID: string,
    /**
     * The name of the template.
     */
    Name: string,
    /**
     * The creation date of the template.
     */
    Created: string,
    /**
     * The last modification date of the template.
     */
    LastModified: string
}