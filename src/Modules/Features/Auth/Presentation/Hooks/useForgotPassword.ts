import { useContext, useState } from "react";
import { ForgotPasswordUseCaseContext } from "@auth/Presentation/Context/ForgotPasswordUseCaseContext";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { ForgotPasswordData } from "@auth/Domain/Entities/ForgotPasswordData";
import { ValidationErrors } from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import { Result } from "neverthrow";

export default function useForgotPassword() {
    const useCase = useContext(ForgotPasswordUseCaseContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<AuthErrorCodes | string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<ValidationErrors<ForgotPasswordData>>({});

    const forgotPassword = async (data: ForgotPasswordData): Promise<void> => {
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
        forgotPassword
    };
}
