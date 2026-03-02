import { useContext, useState } from "react";
import { ValidationErrors } from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import { ChangePasswordContext } from "@users/Presentation/Context/ChangePasswordContext";
import { IChangePasswordData } from "@users/Domain/Entities/IChangePasswordData";
import { ProfileErrors } from "@users/Domain/Errors/ProfileErrors";

export default function UseChangePassword() {
    const useCase = useContext(ChangePasswordContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ProfileErrors | string | null>(null);
    const [success, setSuccess] = useState(false);
    const [formErrors, setFormErrors] = useState<ValidationErrors<IChangePasswordData>>({});

    const ChangePassword = async (data: IChangePasswordData): Promise<void> => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        setFormErrors({});

        try {
            const result = await useCase.Execute(data);
            result.match(
                () => setSuccess(true),
                (profileError) => setError(profileError)
            );
        } catch (exception: unknown) {
            if (exception instanceof InvalidEntityError) {
                setFormErrors(exception.fieldErrors as ValidationErrors<IChangePasswordData>);
            } else if (exception instanceof Error) {
                setError(exception.message);
            } else {
                setError("UNKNOWN_ERROR");
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        ChangePassword,
        loading,
        error,
        success,
        formErrors
    };
}
