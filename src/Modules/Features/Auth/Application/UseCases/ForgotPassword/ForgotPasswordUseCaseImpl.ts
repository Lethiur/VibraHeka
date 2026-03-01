import { Result } from "neverthrow";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { IForgotPasswordUseCase } from "@auth/Application/UseCases/ForgotPassword/IForgotPasswordUseCase";
import { IAuthRepository } from "@auth/Domain/Repositories/IAuthRepository";
import { ForgotPasswordData } from "@auth/Domain/Models/ForgotPasswordData";
import { ValidationErrors } from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import ForgotPasswordDataValidator from "@auth/Application/Validators/ForgotPasswordDataValidator";

export default class ForgotPasswordUseCaseImpl implements IForgotPasswordUseCase {

    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly validator: ForgotPasswordDataValidator
    ) { }

    public async execute(data: ForgotPasswordData): Promise<Result<void, AuthErrorCodes>> {
        const validationResult: ValidationErrors<ForgotPasswordData> = this.validator.validate(data);

        if (Object.keys(validationResult).length > 0) {
            throw new InvalidEntityError(validationResult);
        }

        return this.authRepository.ForgotPassword(data);
    }
}
