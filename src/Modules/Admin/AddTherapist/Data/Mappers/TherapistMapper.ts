import Therapist from "@admin/addTherapist/Domain/Entities/Therapist";
import { CreateTherapistEntity } from "@admin/addTherapist/Domain/Entities/CreateTherapistEntity";
import { TherapistDTO } from "@admin/addTherapist/Data/Models/TherapistDTO";
import { ICreateTherapistDTO } from "@admin/addTherapist/Data/Models/ICreateTherapistDTO";

export function mapTherapistDTO(dto: TherapistDTO): Therapist {
  return new Therapist({
    Id: dto.id,
    FirstName: dto.firstName,
    LastName: dto.lastName,
    MiddleName: dto.middleName,
    Bio: dto.bio,
    Email: dto.email,
    TimezoneID: dto.timezoneID,
  });
}

export function mapCreateTherapistToDTO(entity: CreateTherapistEntity): ICreateTherapistDTO {
  return {
    email: entity.Email,
    firstName: entity.FirstName,
    middleName: entity.MiddleName,
    lastName: entity.LastName,
    phoneNumber: entity.PhoneNumber,
    bio: entity.Bio,
    timezoneID: entity.TimezoneID,
  };
}
