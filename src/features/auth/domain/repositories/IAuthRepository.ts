import { Result } from 'neverthrow';
import { RegistrationData } from "../models/RegistrationData";
import { RegistrationResult } from "../models/RegistrationResult";
import { AuthErrorCodes } from "../errors/AuthErrorCodes";

export interface IAuthRepository {
    register(data: RegistrationData): Promise<Result<RegistrationResult, AuthErrorCodes>>;
}
