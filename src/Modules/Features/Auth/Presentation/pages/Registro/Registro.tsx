import React, { useState } from "react";

import { ValidationErrors } from "fluentvalidation-ts";
import { useTranslation } from "react-i18next";
import { RegistrationData } from "@auth/Domain/Models/RegistrationData";
import { useRegisterUser } from "@auth/Presentation/Hooks/useRegisterUser";
import RegisterUserUseCase from "@auth/Application/UseCases/RegisterUser/RegisterUserUseCase";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { RegistrationResult } from "@auth/Domain/Models/RegistrationResult";
import { Result } from "neverthrow";
import { NavigateFunction, useNavigate } from "react-router-dom";
import useLocalStorage from "@core/Presentation/Hooks/UseLocalStorage";
import LocalStorageService from "@core/Infrastructure/Storage/LocalStorageService";
import { STORAGE_KEYS } from "@core/Infrastructure/Storage/StorageKeys";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import AuthLayout from "@auth/Presentation/layouts/AuthLayout/AuthLayout";

export default function Registro() {
    const { t } = useTranslation();
    const [errors, setErrors] = useState<ValidationErrors<RegistrationData>>({});
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const registerUserUseCase: RegisterUserUseCase = useRegisterUser();
    const localStorage: LocalStorageService = useLocalStorage();
    const navigate: NavigateFunction = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setGlobalError(null);

        const formData = new FormData(event.currentTarget);

        const data: RegistrationData = {
            firstName: (formData.get('firstName') as string) || "",
            middleName: (formData.get('middleName') as string) || "",
            lastName: (formData.get('lastName') as string) || "",
            email: (formData.get('email') as string) || "",
            password: (formData.get('password') as string) || ""
        };


        try {
            setIsSubmitting(true);
            const result: Result<RegistrationResult, AuthErrorCodes> = await registerUserUseCase.execute(data);
            if (result.isOk()) {
                localStorage.setString(STORAGE_KEYS.EMAIL, data.email);
                navigate('/verify');
            } else {
                setGlobalError(t(`errors.auth.${result.error}`));
            }

        } catch (error) {
            if (error instanceof InvalidEntityError) {
                setErrors(error.fieldErrors);
            }
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AuthLayout title={t('pages.register.title')} subtitle={t('pages.register.description')}>
            <ErrorBox message={globalError} />

            <form onSubmit={handleSubmit} noValidate>
                <PrimaryTextInput label={t('pages.register.form.email_label')} name="email" disabled={isSubmitting} error={errors.email?.toString()} />
                <PrimaryTextInput label={t('pages.register.form.name_label')} name="firstName" disabled={isSubmitting} error={errors.firstName?.toString()} />
                <PrimaryTextInput label={t('pages.register.form.middle_name_label')} name="middleName" disabled={isSubmitting} error={errors.middleName?.toString()} />
                <PrimaryTextInput label={t('pages.register.form.last_name_label')} name="lastName" disabled={isSubmitting} error={errors.lastName?.toString()} />
                <PrimaryTextInput label={t('pages.register.form.password_label')} name="password" disabled={isSubmitting} type="password" showPasswordToggle={true} error={errors.password?.toString()} />

                <div className="auth-form__submit">
                    <PrimaryButton
                        label={isSubmitting ? t('pages.register.form.submitting_button') : t('pages.register.form.submit_button')}
                        type="submit"
                        variant="outline"
                        disabled={isSubmitting}
                        fullWidth={true}
                    />
                </div>
            </form>
        </AuthLayout>
    )
}
