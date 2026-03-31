import { useContext, useState } from "react";
import { IResendVerificationCodeUseCase } from "../../Application/UseCases/ResendVerificationCode/IResendVerificationCodeUseCase";
import { ResendVerificationCodeContext } from "../Context/ResendVerificationCodeContext";
import { AuthErrorCodes } from "../../Domain/Errors/AuthErrorCodes";
import { Result } from "neverthrow";

export default function useResendVerificationCode() {


    const UseCase: IResendVerificationCodeUseCase = useContext(ResendVerificationCodeContext);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const ResendVerificationCode = async (email: string): Promise<Result<void, AuthErrorCodes>> => {
        setLoading(true);
        const result: Result<void, AuthErrorCodes> = await UseCase.Execute(email);
        result.mapErr(setError);
        setLoading(false);
        return result;
    };

    return {
        loading,
        error,
        ResendVerificationCode,
    };
}
