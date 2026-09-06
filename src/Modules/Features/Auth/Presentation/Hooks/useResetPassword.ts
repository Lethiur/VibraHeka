import { useContext, useState } from "react";
import { ResetPasswordUseCaseContext } from "@auth/Presentation/Context/ResetPasswordUseCaseContext";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { ValidationErrors } from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import GenericUseMutation from "@core/Presentation/Hooks/GenericUseMutation.ts";
import {ResetPasswordCommand} from "@auth/Domain/Commands/ResetPasswordCommand.ts";

/**
 * Provides functionality to manage the reset password process, including handling form errors and executing the reset password command.
 *
 * @return {object} An object containing the following properties:
 * - `loading` {boolean}: Indicates whether the reset password operation is in progress.
 * - `error` {AuthErrorCodes | null}: Provides error information if the operation fails.
 * - `ResetPassword` {function(ResetPasswordCommand): void}: Executes the reset password command.
 * - `formErrors` {ValidationErrors<ResetPasswordCommand>}: Contains validation errors related to the reset password form.
 */
export default function useResetPassword() {
    const useCase = useContext(ResetPasswordUseCaseContext);
    const [formErrors, setFormErrors] = useState<ValidationErrors<ResetPasswordCommand>>({});

    const mutation = GenericUseMutation<void, AuthErrorCodes, ResetPasswordCommand>(
        ["reset-password"],
        useCase.execute,
        {
            onSuccess: () => setFormErrors({}),
            onError: (exception: unknown) => {
                if (exception instanceof InvalidEntityError) {
                    setFormErrors(exception.fieldErrors);
                    return;
                }
            },
        }
    );

   return {
       loading: mutation.loading,
       error: mutation.error,
       ResetPassword: mutation.execute,
       success: mutation.success,
       formErrors,
   }
}
