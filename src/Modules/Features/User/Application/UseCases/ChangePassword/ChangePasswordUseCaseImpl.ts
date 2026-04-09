import { Result } from "neverthrow";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import { ValidationErrors } from "fluentvalidation-ts";
import { IChangePasswordData } from "@users/Domain/Entities/IChangePasswordData";
import { ProfileErrors } from "@users/Domain/Errors/ProfileErrors";
import IProfileRepository from "@users/Domain/Repositories/IProfileRepository";
import IChangePasswordUseCase from "./IChangePasswordUseCase";
import ChangePasswordDataValidator from "@users/Application/Validators/ChangePasswordDataValidator";
import { ProfileApplicationErrors } from "@users/Application/Errors/ProfileApplicationErrors";
import { passwordsMatch, sanitizePasswordInput } from "@core/Application/Validation/PasswordInput";

export default class ChangePasswordUseCaseImpl implements IChangePasswordUseCase {
    constructor(
        private readonly profileRepository: IProfileRepository,
        private readonly validator: ChangePasswordDataValidator
    ) { }

    public async Execute(data: IChangePasswordData): Promise<Result<void, ProfileErrors>> {
        const sanitizedData: IChangePasswordData = {
            ...data,
            NewPassword: sanitizePasswordInput(data.NewPassword),
            NewPasswordConfirmation: sanitizePasswordInput(data.NewPasswordConfirmation)
        };

        const validationResult: ValidationErrors<IChangePasswordData> = this.validator.validate(sanitizedData);

        if (Object.keys(validationResult).length > 0) {
            throw new InvalidEntityError(validationResult);
        }

        if (!passwordsMatch(sanitizedData.NewPassword, sanitizedData.NewPasswordConfirmation)) {
            throw new InvalidEntityError<IChangePasswordData>({
                NewPasswordConfirmation: ProfileApplicationErrors.PASSWORD_CONFIRMATION_MISMATCH
            });
        }

        return await this.profileRepository.ChangePassword(sanitizedData);
    }
}
