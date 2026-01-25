import React from "react";
import {ValidationErrors} from "fluentvalidation-ts";
import {CreateTherapistEntity} from "@admin/addTherapist/Domain/Entities/CreateTherapistEntity";
import {useTranslation} from "react-i18next";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";


export interface CreateTherapistFormProps {
    onSubmit: (data: CreateTherapistEntity) => Promise<void>;
    isSubmitting: boolean;
    errors: ValidationErrors<CreateTherapistEntity>;
}


export default function CreateTherapistForm({onSubmit, isSubmitting, errors}: CreateTherapistFormProps ) {
    const { t } = useTranslation();
    
    async function onSubmitForm(event: React.FormEvent<HTMLFormElement>) : Promise<void> {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data : CreateTherapistEntity = {
            Name :  (formData.get('name') as string) || "",
            Email: (formData.get('email') as string) || ""
        }
        await onSubmit(data);
    }
    
    return <div>
        <h1>{t('pages.therapists.form.title')}</h1>
        <p>{t('pages.therapists.form.description')}</p>
        <form onSubmit={onSubmitForm} noValidate>
            <div className='mb-3'>
                <label htmlFor="email" className="form-label">{t('pages.login.form.email_label')}</label>
                <input type="email" className={`form-control ${errors.Email ? 'is-invalid' : ''}`} name="email" id="email" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">{t('pages.login.form.email_help')}</div>
                {errors.Email && <div className="invalid-feedback">{t(`errors.auth.${errors.Email}`)}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">{t('pages.register.form.name_label')}</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control ${errors.Name ? 'is-invalid' : ''}`}
                    disabled={isSubmitting}
                />
                {errors.Name && <div className="invalid-feedback">{t('pages.register.validation.name_required')}</div>}
            </div>
            
            <PrimaryButton label={t('pages.therapists.form.submit_button')} type="submit" variant="primary" disabled={isSubmitting} fullWidth={true} />
        </form>
        
    </div>
}