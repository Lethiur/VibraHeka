import { useContext, useState } from "react";
import { ResetPasswordUseCaseContext } from "@auth/Presentation/Context/ResetPasswordUseCaseContext";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { ResetPasswordData } from "@auth/Domain/Entities/ResetPasswordData";
import { ValidationErrors } from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import { Result } from "neverthrow";

export default function useResetPassword() {
    const useCase = useContext(ResetPasswordUseCaseContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<AuthErrorCodes | string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<ValidationErrors<ResetPasswordData>>({});

    const resetPassword = async (data: ResetPasswordData): Promise<void> => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        setFormErrors({});

        try {
            const result: Result<void, AuthErrorCodes> = await useCase.execute(data);
            result.match(
                () => setSuccess(true),
                (authError) => setError(authError)
            );
        } catch (exception: unknown) {
            if (exception instanceof InvalidEntityError) {
                setFormErrors(exception.fieldErrors);
            } else if (exception instanceof Error) {
                setError(exception.message);
            } else {
                setError(AuthErrorCodes.UNKNOWN_ERROR);
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        success,
        formErrors,
        resetPassword
    };
}
