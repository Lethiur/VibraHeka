import React, { useState } from "react";
import { ValidationErrors } from "fluentvalidation-ts";
import PrimaryButton from "../../../../../components/atoms/PrimaryButton/PrimaryButton";
import { RegistrationData } from "../../../domain/models/RegistrationData";
import RegistrationDataValidator from "../../validators/RegistrationDataValidator";
import { authRepository } from "../../../infrastructure/AuthRepository";
import { useTranslation } from "react-i18next";

export default function Registro() {
    const { t } = useTranslation();
    const [errors, setErrors] = useState<ValidationErrors<RegistrationData>>({});
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setGlobalError(null);

        const formData = new FormData(event.currentTarget);

        const data: RegistrationData = {
            fullName: (formData.get('name') as string) || "",
            email: (formData.get('email') as string) || "",
            password: (formData.get('password') as string) || ""
        };

        const validator = new RegistrationDataValidator();
        const validationResult = validator.validate(data);

        // Traducir errores de validación si es necesario, 
        // aunque fluentvalidation-ts suele devolver strings fijos, 
        // idealmente el validador debería devolver claves o usar una librería que soporte i18n
        setErrors(validationResult);

        if (Object.keys(validationResult).length === 0) {
            setIsSubmitting(true);

            const result = await authRepository.register(data);
            if (result.isOk()) {
                console.log("Registrado con éxito:", result.value.userId);
                // Aquí podrías redireccionar o mostrar éxito
            } else {
                // Usamos la clave del error para traducir
                const errorKey = `errors.auth.${result.error}`;
                console.log(errorKey);
                // t devuelve la clave si no encuentra traducción, así que es seguro
                setGlobalError(t(errorKey));
            }

            setIsSubmitting(false);

        } else {
            console.log("Errores de validación:", validationResult);
        }
    }

    return (
        <div>
            <h1>{t('pages.register.title')}</h1>
            <p>{t('pages.register.description')}</p>
            <div className="container-fluid justify-content-center">
                <div>
                    {globalError && (
                        <div className="alert alert-danger" role="alert">
                            {globalError}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">{t('pages.register.form.name_label')}</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.fullName && <div className="invalid-feedback">{t('pages.register.validation.name_required')}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">{t('pages.register.form.email_label')}</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.email && <div className="invalid-feedback">{t('pages.register.validation.email_invalid')}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">{t('pages.register.form.password_label')}</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.password && <div className="invalid-feedback">{t('pages.register.validation.password_length')}</div>}
                        </div>
                        <PrimaryButton
                            label={isSubmitting ? t('pages.register.form.submitting_button') : t('pages.register.form.submit_button')}
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                            fullWidth={true}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}