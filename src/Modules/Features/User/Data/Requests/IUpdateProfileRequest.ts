export default interface IUpdateProfileRequest {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    bio: string;
    avatarUrl: string;
    timeZoneID: string;
}
