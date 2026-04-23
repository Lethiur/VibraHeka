import { Result } from "neverthrow";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { ResetPasswordData } from "@auth/Domain/Entities/ResetPasswordData";
import { IResetPasswordUseCase } from "@auth/Application/UseCases/ResetPassword/IResetPasswordUseCase";
import { IAuthRepository } from "@auth/Domain/Repositories/IAuthRepository";
import ResetPasswordDataValidator from "@auth/Application/Validators/ResetPasswordDataValidator";
import { ValidationErrors } from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import { AuthApplicationErrors } from "@auth/Application/Errors/AuthApplicationErrors";
import { passwordsMatch, sanitizePasswordInput } from "@core/Application/Validation/PasswordInput";

export default class ResetPasswordUseCaseImpl implements IResetPasswordUseCase {

    constructor(
        private readonly repository: IAuthRepository,
        private readonly validator: ResetPasswordDataValidator
    ) { }

    public async execute(data: ResetPasswordData): Promise<Result<void, AuthErrorCodes>> {
        const sanitizedData: ResetPasswordData = {
            ...data,
            NewPassword: sanitizePasswordInput(data.NewPassword),
            NewPasswordConfirmation: sanitizePasswordInput(data.NewPasswordConfirmation)
        };

        const validationResult: ValidationErrors<ResetPasswordData> = this.validator.validate(sanitizedData);

        if (Object.keys(validationResult).length > 0) {
            throw new InvalidEntityError(validationResult);
        }

        if (!passwordsMatch(sanitizedData.NewPassword, sanitizedData.NewPasswordConfirmation)) {
            throw new InvalidEntityError<ResetPasswordData>({
                NewPasswordConfirmation: AuthApplicationErrors.PASSWORD_CONFIRMATION_MISMATCH
            });
        }

        return this.repository.ResetPassword(sanitizedData);
    }
}
