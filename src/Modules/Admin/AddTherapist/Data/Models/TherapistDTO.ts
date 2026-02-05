/**
 * Represents a Data Transfer Object (DTO) for a therapist.
 *
 * This interface is used to encapsulate the data related to a therapist in a structured format.
 */
export interface TherapistDTO {
    id: string
    email: string
    firstName: string
    lastName: string
    middleName: string
    bio: string
    phoneNumber: string
    timezoneID: string
}