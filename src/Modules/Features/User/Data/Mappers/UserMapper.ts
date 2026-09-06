import ISubscriptionCreation from "@users/Domain/Entities/ISubscriptionCreation";
import { IUserprofile } from "@users/Domain/Entities/IUserProfile";
import { SubscriptionResponse } from "@/Generated/api/subscriptions";
import {UpdateProfileRequest, UserDTO} from "@/Generated/api/users";
import IUpdateProfileRequest from "@users/Data/Requests/IUpdateProfileRequest.ts";

export function mapSubscriptionCreationDTO(dto: SubscriptionResponse): ISubscriptionCreation {
  return {
    Url: dto.url,
    ExpiresAt: new Date(dto.expiresAt),
  };
}

export function mapUserProfileDTO(dto: UserDTO): IUserprofile {
  return {
    Id: dto.id,
    FirstName: dto.firstName,
    MiddleName: dto.middleName || "",
    LastName: dto.lastName,
    Email: dto.email,
    Phone: dto.phoneNumber,
    Bio: dto.bio,
    AvatarUrl: "",
    TimeZone: dto.timezoneID || "Europe/Madrid",
  };
}

export function mapToUpdateProfileRequest(domainRequest : IUpdateProfileRequest) : UpdateProfileRequest {
  return {
    email: domainRequest.email,
    firstName: domainRequest.firstName,
    middleName: domainRequest.middleName,
    lastName: domainRequest.lastName,
    bio: domainRequest.bio,
    phoneNumber: domainRequest.phoneNumber,
    profilePictureUrl: domainRequest.avatarUrl,
    timezoneID: domainRequest.timeZoneID,
  };
}
