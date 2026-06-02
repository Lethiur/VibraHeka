import ISubscription from "@users/Domain/Entities/ISubscription";
import ISubscriptionCreation from "@users/Domain/Entities/ISubscriptionCreation";
import { IUserprofile } from "@users/Domain/Entities/IUserProfile";
import ISubscriptionDetailsDTO from "@users/Data/Entities/ISubscriptionDetailsDTO";
import ISubscriptionCreationDTO from "@users/Data/Entities/ISubscriptionCreationDTO";
import IUserDTO from "@users/Data/Entities/IUserProfileDTO";
import { OrderStatus } from "@users/Domain/Enums/OrderStatus";
import { SubscriptionStatus } from "@users/Domain/Enums/SubscriptionStatus";

export function mapSubscriptionDetailsDTO(dto: ISubscriptionDetailsDTO): ISubscription {
  return {
    StartDate: dto.startDate,
    EndDate: dto.endDate,
    Status: dto.status as OrderStatus,
    SubscriptionStatus: dto.subscriptionStatus as SubscriptionStatus,
    CheckoutSessionUrl: dto.checkoutSessionUrl ?? null,
    CheckoutSessionExpiresAt: dto.checkoutSessionExpiresAt ?? null,
  };
}

export function mapSubscriptionCreationDTO(dto: ISubscriptionCreationDTO): ISubscriptionCreation {
  return {
    Url: dto.url,
    ExpiresAt: new Date(dto.expiresAt),
  };
}

export function mapUserProfileDTO(dto: IUserDTO): IUserprofile {
  return {
    Id: dto.id,
    FirstName: dto.firstName,
    MiddleName: dto.middleName,
    LastName: dto.lastName,
    Email: dto.email,
    Phone: dto.phoneNumber,
    Bio: dto.bio,
    AvatarUrl: dto.avatarUrl,
    TimeZone: dto.timeZoneID,
  };
}
