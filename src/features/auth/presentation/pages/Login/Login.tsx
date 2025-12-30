import ErrorBox from "../../../../../components/atoms/ErrorBox/ErrorBox.tsx";
import React, {useState} from "react";
import PrimaryButton from "../../../../../components/atoms/PrimaryButton/PrimaryButton.tsx";
import {useTranslation} from "react-i18next";
import InvalidEntityError from "../../../Application/Errors/InvalidEntityError.ts";
import {LoginData} from "../../../Domain/Models/LoginData.ts";
import {ValidationErrors} from "fluentvalidation-ts";
import useLoginUser from "../../Hooks/useLoginUser.ts";
import LoginUserUseCase from "../../../Application/UseCases/LoginUser/LoginUserUseCase.ts";
import {useNavigate} from "react-router-dom";


export default function Login() {
    
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors<LoginData>>({})
    const { t } = useTranslation();
    
    const loginUserUseCase : LoginUserUseCase = useLoginUser();
    const navigation  = useNavigate();
    
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setGlobalError(null);
        
        try {
            setIsSubmitting(true);
            await loginUserUseCase.execute()
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
            <ErrorBox message={globalError} />
            <form onSubmit={handleSubmit} noValidate>
                <div className='mb-3'>
                    <label htmlFor="email" className="form-label">{t('pages.login.form.email_label')}</label>
                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">{t('pages.login.form.email_help')}</div>
                    {errors.email && <div className="invalid-feedback">{t(`auth.errors.${errors.email}`)}</div>}
                </div>
                
                <div className='mb-3'>
                    <label htmlFor="password" className="form-label">{t('pages.login.form.password_label')}</label>
                    <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" name="password"/>
                    <div id="passwordHelp" className="form-text">{t('pages.login.form.password_help')}</div>
                    {errors.password && <div className="invalid-feedback">{t(`auth.errors.${errors.password}`)}</div>}
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