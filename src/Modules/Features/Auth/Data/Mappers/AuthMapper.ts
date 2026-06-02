import { LoginResult } from "@auth/Domain/Entities/LoginResult";
import { LoginResultDTO } from "@auth/Data/Entities/LoginResultDTO";
import { RegistrationResult } from "@auth/Domain/Entities/RegistrationResult";
import { RegisterResponseDTO } from "@auth/Data/Entities/RegistrationResponseDTO";

export function mapLoginResultDTO(dto: LoginResultDTO): LoginResult {
  return {
    UserID: dto.userID,
    Token: dto.accessToken,
    RefreshToken: dto.refreshToken,
    Role: dto.role,
  };
}

export function mapRegisterResponseDTO(dto: RegisterResponseDTO): RegistrationResult {
  return {
    UserId: dto.userId,
    NeedsConfirmation: dto.needsConfirmation,
  };
}
