import { Result } from "neverthrow";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { ResetPasswordData } from "@auth/Domain/Models/ResetPasswordData";
import { IResetPasswordUseCase } from "@auth/Application/UseCases/ResetPassword/IResetPasswordUseCase";
import { IAuthRepository } from "@auth/Domain/Repositories/IAuthRepository";
import ResetPasswordDataValidator from "@auth/Application/Validators/ResetPasswordDataValidator";
import { ValidationErrors } from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import { AuthApplicationErrors } from "@auth/Application/Errors/AuthApplicationErrors";

export default class ResetPasswordUseCaseImpl implements IResetPasswordUseCase {

    constructor(
        private readonly repository: IAuthRepository,
        private readonly validator: ResetPasswordDataValidator
    ) { }

    public async execute(data: ResetPasswordData): Promise<Result<void, AuthErrorCodes>> {
        const validationResult: ValidationErrors<ResetPasswordData> = this.validator.validate(data);

        if (Object.keys(validationResult).length > 0) {
            throw new InvalidEntityError(validationResult);
        }

        if (data.newPassword !== data.newPasswordConfirmation) {
            throw new InvalidEntityError<ResetPasswordData>({
                newPasswordConfirmation: AuthApplicationErrors.PASSWORD_CONFIRMATION_MISMATCH
            });
        }

        return this.repository.ResetPassword(data);
    }
}
