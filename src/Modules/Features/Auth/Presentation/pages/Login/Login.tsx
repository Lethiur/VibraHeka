import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LoginData } from "@auth/Domain/Models/LoginData";
import { ValidationErrors } from "fluentvalidation-ts";
import useLoginUser from "@auth/Presentation/Hooks/useLoginUser";
import LoginUserUseCase from "@auth/Application/UseCases/LoginUser/LoginUserUseCase";
import { AuthErrorCodes } from "@auth/Domain/Errors/AuthErrorCodes";
import { LoginResult } from "@auth/Domain/Models/LoginResult";
import { Result } from "neverthrow";
import { useSetAtom } from "jotai";
import { isAuthenticatedAtom } from "@core/Presentation/Storage/AuthAtom";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import InvalidEntityError from "@core/Application/Errors/InvalidEntityError";


export default function Login() {

    const [globalError, setGlobalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors<LoginData>>({})
    const { t } = useTranslation();

    const loginUserUseCase: LoginUserUseCase = useLoginUser();
    const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setGlobalError(null);
        const formData = new FormData(event.currentTarget);

        try {
            setIsSubmitting(true);
            const authResult: Result<LoginResult, AuthErrorCodes> = await loginUserUseCase.execute({
                email: formData.get('email') as string,
                password: formData.get('password') as string
            });

            if (authResult.isOk()) {
                setIsAuthenticated(true);
            } else {
                setGlobalError(authResult.error);
            }

        } catch (error) {
            if (error instanceof InvalidEntityError) {
                setErrors(error.fieldErrors);
            }
        }
        finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <h1>{t('pages.login.title')}</h1>
            <p>{t('pages.login.description')}</p>
            <ErrorBox message={globalError} variant="danger" />
            <form onSubmit={handleSubmit} noValidate>
                <div className='mb-3'>
                    <label htmlFor="email" className="form-label">{t('pages.login.form.email_label')}</label>
                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">{t('pages.login.form.email_help')}</div>
                    {errors.email && <div className="invalid-feedback">{t(`errors.auth.${errors.email}`)}</div>}
                </div>

                <div className='mb-3'>
                    <label htmlFor="password" className="form-label">{t('pages.login.form.password_label')}</label>
                    <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" name="password" />
                    <div id="passwordHelp" className="form-text">{t('pages.login.form.password_help')}</div>
                    {errors.password && <div className="invalid-feedback">{t(`errors.auth.${errors.password}`)}</div>}
                </div>

                <PrimaryButton
                    label={isSubmitting ? t('pages.login.form.submitting_button') : t('pages.login.form.submit_button')}
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    fullWidth={true}
                />
            </form>
        </div>
    )
}