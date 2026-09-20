import { useContext, useState } from "react";
import { ValidationErrors } from "fluentvalidation-ts";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import { ChangePasswordContext } from "@users/Presentation/Context/ChangePasswordContext";
import { IChangePasswordData } from "@users/Domain/Entities/IChangePasswordData";
import { ProfileErrors } from "@users/Domain/Errors/ProfileErrors";
import GenericUseMutation from "@core/Presentation/Hooks/GenericUseMutation";

export default function UseChangePassword() {
    const useCase = useContext(ChangePasswordContext);

    const [formErrors, setFormErrors] = useState<ValidationErrors<IChangePasswordData>>({});
    const mutation = GenericUseMutation<void, ProfileErrors, IChangePasswordData>(
        ["change-password"],
        (data: IChangePasswordData) => useCase.Execute(data),
        {
            onSuccess: () => {
                setFormErrors({});
            }
        }
    );

    const ChangePassword = async (data: IChangePasswordData): Promise<void> => {
        setFormErrors({});

        try {
            await mutation.executeAsync(data);
        } catch (exception: unknown) {
            if (exception instanceof InvalidEntityError) {
                setFormErrors(exception.fieldErrors as ValidationErrors<IChangePasswordData>);
                mutation.reset();
            }
        }
    };

    return {
        ChangePassword,
        loading: mutation.loading,
        error: mutation.error,
        success: mutation.success,
        formErrors
    };
}
