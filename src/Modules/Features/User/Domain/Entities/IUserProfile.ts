/**
 * Represents a user profile containing personal and contact information.
 */
export interface IUserprofile {
    TimeZone: string;
    Id: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Email: string;
    Phone: string;
    Bio: string;
    AvatarUrl: string;
}