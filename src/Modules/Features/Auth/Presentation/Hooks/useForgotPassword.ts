import {useContext, useState} from "react";
import {ForgotPasswordUseCaseContext} from "@auth/Presentation/Context/ForgotPasswordUseCaseContext";
import {ForgotPasswordCommand} from "@auth/Domain/Commands/ForgotPasswordCommand.ts";
import {ValidationErrors} from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import GenericUseMutation from "@core/Presentation/Hooks/GenericUseMutation";
import {AuthErrorCodes} from "@auth/Domain/Errors/AuthErrorCodes.ts";

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
