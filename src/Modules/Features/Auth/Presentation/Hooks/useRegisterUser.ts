import {useContext, useState} from "react";
import {RegisterUseCaseContext} from "../Context/RegisterUseCaseContext";
import RegisterUserUseCase from "@auth/Application/UseCases/RegisterUser/RegisterUserUseCase.ts";
import {RegistrationResult} from "@auth/Domain/ValueObjects/RegistrationResult.ts";
import {AuthErrorCodes} from "@auth/Domain/Errors/AuthErrorCodes.ts";
import {RegistrationCommand} from "@auth/Domain/Commands/RegistrationCommand.ts";
import GenericUseMutation from "@core/Presentation/Hooks/GenericUseMutation.ts";
import {ValidationErrors} from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError.ts";

/**
 * A custom React hook that provides functionality for registering a new user.
 *
 * This hook manages the registration process, including handling validation errors,
 * tracking loading and success states, and executing the user registration use case.
 *
 * @return {Object} An object containing the following:
 * - `data`: The result of the registration operation, if successful.
 * - `error`: The error encountered during registration, if any.
 * - `formErrors`: Validation errors related to the registration command, if any.
 * - `loading`: A boolean indicating if the registration operation is currently in progress.
 * - `success`: A boolean indicating if the registration operation was successful.
 * - `registerUser`: A function to execute the registration process with the given command.
 */
export function useRegisterUser() {
    const useCase: RegisterUserUseCase = useContext(RegisterUseCaseContext);
    const [errors, setErrors] = useState<ValidationErrors<RegistrationCommand>>({});

    const mutation = GenericUseMutation<RegistrationResult, AuthErrorCodes, RegistrationCommand>(
        ["register-user"],
        useCase.execute,
        {
            onSuccess: () => {
                setErrors({});
            },
            onError: (exception: unknown) => {
                if (exception instanceof InvalidEntityError) {
                    setErrors(exception.fieldErrors);
                    return;
                }
            },
        }
    );

    return {
        data: mutation.data,
        error: mutation.error,
        fromErrors: errors,
        loading: mutation.loading,
        success: mutation.success,
        registerUser: mutation.execute,
    }
}