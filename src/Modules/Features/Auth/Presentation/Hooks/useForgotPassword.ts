import {useContext, useState} from "react";
import {ForgotPasswordUseCaseContext} from "@auth/Presentation/Context/ForgotPasswordUseCaseContext";
import {ForgotPasswordCommand} from "@auth/Domain/Commands/ForgotPasswordCommand.ts";
import {ValidationErrors} from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import GenericUseMutation from "@core/Presentation/Hooks/GenericUseMutation";
import {AuthErrorCodes} from "@auth/Domain/Errors/AuthErrorCodes.ts";

/**
 * A hook that provides functionality to handle the "forgot password" use case.
 *
 * @return {Object} An object containing various states and functions to manage the "forgot password" process:
 * - `loading` (boolean): Indicates whether the forgot password request is in progress.
 * - `error` (AuthErrorCodes | null): Represents any error codes encountered during the process.
 * - `success` (boolean): Indicates whether the forgot password request was successful.
 * - `formErrors` (ValidationErrors<ForgotPasswordCommand>): Validation errors for the form data, if any.
 * - `forgotPassword` (function(ForgotPasswordCommand): void): Function to execute the forgot password operation.
 */
export default function useForgotPassword() {
    const useCase = useContext(ForgotPasswordUseCaseContext);

    const [formErrors, setFormErrors] = useState<ValidationErrors<ForgotPasswordCommand>>({});

    const mutation = GenericUseMutation<void, AuthErrorCodes, ForgotPasswordCommand>(
        ["forgot-password"],
        useCase.execute,
        {
            onSuccess: () => {
                setFormErrors({});
            },
            onError: (exception: unknown) => {
                if (exception instanceof InvalidEntityError) {
                    setFormErrors(exception.fieldErrors);
                    return;
                }
            },
        }
    );

    const forgotPassword = (data: ForgotPasswordCommand): void => {
        setFormErrors({});
        mutation.execute(data);
    };

    return {
        loading: mutation.loading,
        error: mutation.error,
        success: mutation.success,
        formErrors,
        forgotPassword
    };
}
