import {useContext} from "react";
import {VerifyUserUseCaseContext} from "../Context/VerifyUserUseCaseContext";
import {AuthErrorCodes} from "@auth/Domain/Errors/AuthErrorCodes.ts";
import GenericUseMutation from "@core/Presentation/Hooks/GenericUseMutation.ts";
import {VerificationCommand} from "@auth/Domain/Commands/VerificationCommand.ts";

/**
 * Custom hook that provides functionality for user verification.
 *
 * This hook utilizes a mutation to execute a user verification command
 * and returns the state of the mutation, including loading status, error information,
 * and a method to trigger the user verification flow.
 *
 * @return {Object} An object containing:
 * - `loading` (boolean): Indicates if the verification process is ongoing.
 * - `error` (AuthErrorCodes | null): Contains error information if the verification fails.
 * - `verifyUser` (function): Function to trigger the user verification command.
 */
export default function useVerifyUser() {
    const useCase = useContext(VerifyUserUseCaseContext);

    const mutation = GenericUseMutation<void, AuthErrorCodes, VerificationCommand>(
        ["verify-user"],
        useCase.Execute,
    );

    return {
        loading: mutation.loading,
        error: mutation.error,
        verifyUser: mutation.execute,
    }
}