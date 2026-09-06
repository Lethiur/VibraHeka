import { Result } from "neverthrow";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { IForgotPasswordUseCase } from "@auth/Application/UseCases/ForgotPassword/IForgotPasswordUseCase";
import { IAuthRepository } from "@auth/Domain/Repositories/IAuthRepository";
import { ForgotPasswordCommand } from "@auth/Domain/Commands/ForgotPasswordCommand.ts";
import { ValidationErrors } from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import ForgotPasswordDataValidator from "@auth/Application/Validators/ForgotPasswordDataValidator";

/**
 * Implementation of the ForgotPassword use case.
 *
 * This class is responsible for handling the forgot password operation by validating the input
 * data and delegating the actual processing to the authentication repository.
 */
export default class ForgotPasswordUseCaseImpl implements IForgotPasswordUseCase {

    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly validator: ForgotPasswordDataValidator
    ) { }

    public async execute(data: ForgotPasswordCommand): Promise<Result<void, AuthErrorCodes>> {
        const validationResult: ValidationErrors<ForgotPasswordCommand> = this.validator.validate(data);

        if (Object.keys(validationResult).length > 0) {
            throw new InvalidEntityError(validationResult);
        }

        return this.authRepository.ForgotPassword(data);
    }
}
