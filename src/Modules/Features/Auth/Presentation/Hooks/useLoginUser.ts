import {useContext, useState} from "react";
import {LoginUserUseCaseContext} from "../Context/LoginUserUseCaseContext";
import {LoginCommand} from "@auth/Domain/Commands/LoginCommand.ts";
import {ValidationErrors} from "fluentvalidation-ts";
import {AuthenticationResult} from "@auth/Domain/ValueObjects/AuthenticationResult.ts";
import {AuthErrorCodes} from "@auth/Domain/Errors/AuthErrorCodes.ts";
import GenericUseMutation from "@core/Presentation/Hooks/GenericUseMutation.ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError.ts";
import useLocalStorage from "@core/Presentation/Hooks/UseLocalStorage.ts";
import {STORAGE_KEYS} from "@core/Infrastructure/Storage/StorageKeys.ts";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useSetAtom} from "jotai";
import {isAuthenticatedAtom} from "@core/Presentation/Storage/AuthAtom.ts";

/**
 * A custom hook for managing the login user process, including state for loading, error, success, and form validation errors.
 *
 * @return {Object} An object containing:
 * - `loading` (boolean): Indicates whether the login process is currently in progress.
 * - `error` (AuthErrorCodes | null): Error information if the login attempt fails.
 * - `success` (boolean): Indicates whether the login was successful.
 * - `formErrors` (ValidationErrors<LoginCommand>): Validation errors for the login form fields.
 * - `loginUser` (function): A function to initiate the login process with the provided login command data.
 */
export default function useLoginUser() {
    const useCase = useContext(LoginUserUseCaseContext);

    const [formErrors, setFormErrors] = useState<ValidationErrors<LoginCommand>>({});
    const localStorage = useLocalStorage();
    const navigate: NavigateFunction = useNavigate();
    const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);


    const mutation = GenericUseMutation<AuthenticationResult, AuthErrorCodes, LoginCommand>(
        ["authenticate-user"],
        (data: LoginCommand) => {
            setFormErrors({});
            return useCase.execute(data)
        },
        {
            onSuccess: () => {
                setFormErrors({});
                localStorage.remove(STORAGE_KEYS.PASSWORD);
                setIsAuthenticated(true);
                navigate('/actividades');
            },
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
        success: mutation.success,
        formErrors,
        loginUser: mutation.execute
    };
}