import { useContext } from "react";
import { IResendVerificationCodeUseCase } from "../../Application/UseCases/ResendVerificationCode/IResendVerificationCodeUseCase";
import { ResendVerificationCodeContext } from "../Context/ResendVerificationCodeContext";
import { AuthErrorCodes } from "../../Domain/Errors/AuthErrorCodes";
import GenericUseMutation from "@core/Presentation/Hooks/GenericUseMutation.ts";
import {STORAGE_KEYS} from "@core/Infrastructure/Storage/StorageKeys.ts";

export default function useResendVerificationCode() {

    const UseCase: IResendVerificationCodeUseCase = useContext(ResendVerificationCodeContext);

    const mutation = GenericUseMutation<void, AuthErrorCodes, string>(
        ["resend-verification-code"],
        UseCase.Execute,
    );

    /**
     * Handles the process of resending a verification code to the user's email address.
     *
     * This asynchronous function retrieves the email address from local storage,
     * validates its presence, and attempts to trigger the resend verification code
     * functionality. If the email is not present in local storage, it logs an error
     * and returns `false`. Any errors during the resend operation are also caught
     * and logged.
     *
     * @async
     * @function
     * @returns {Promise<boolean>} A promise that resolves to `true` if the verification
     * code was resent successfully, otherwise `false`.
     */
    const handleResendVerificationCode =  () => {
        const email = localStorage.getString(STORAGE_KEYS.EMAIL) ?? "";
        if (!email) {
            console.error("Email not found in local storage.");
            return false;
        }
        try {
            mutation.execute(email);
            return true;
        } catch (error) {
            console.error("Error resending verification code:", error);
            return false;
        }
    }

    return {
        loading: mutation.loading,
        error: mutation.error,
        ResendVerificationCode: mutation.executeAsync,
        HandleResendVerificationCode: handleResendVerificationCode,
    };
}
