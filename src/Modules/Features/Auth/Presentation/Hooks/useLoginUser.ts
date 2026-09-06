import {useContext, useState} from "react";
import {LoginUserUseCaseContext} from "../Context/LoginUserUseCaseContext";
import {LoginCommand} from "@auth/Domain/Commands/LoginCommand.ts";
import {ValidationErrors} from "fluentvalidation-ts";
import {AuthenticationResult} from "@auth/Domain/ValueObjects/AuthenticationResult.ts";
import {AuthErrorCodes} from "@auth/Domain/Errors/AuthErrorCodes.ts";
import GenericUseMutation from "@core/Presentation/Hooks/GenericUseMutation.ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError.ts";

export default function useLoginUser() {
    const useCase = useContext(LoginUserUseCaseContext);

    const [formErrors, setFormErrors] = useState<ValidationErrors<LoginCommand>>({});

    const mutation = GenericUseMutation<AuthenticationResult, AuthErrorCodes, LoginCommand>(
        ["authenticate-user"],
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

    const loginUser = (data: LoginCommand): void => {
        setFormErrors({});
        mutation.execute(data);
    };

    return {
        loading: mutation.loading,
        error: mutation.error,
        success: mutation.success,
        formErrors,
        loginUser
    };
}