import React, { useState } from "react";
import TimezoneSelect from 'react-timezone-select';
import { ValidationErrors } from "fluentvalidation-ts";
import { CreateTherapistEntity } from "@admin/addTherapist/Domain/Entities/CreateTherapistEntity";
import { useTranslation } from "react-i18next";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import { Col, Form, Row } from "react-bootstrap";
import PrimaryTextInput from "@/core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";


export interface CreateTherapistFormProps {
    onSubmit: (data: CreateTherapistEntity) => Promise<void>;
    isSubmitting: boolean;
    errors: ValidationErrors<CreateTherapistEntity>;
}


export default function CreateTherapistForm({ onSubmit, isSubmitting, errors }: CreateTherapistFormProps) {
    const { t } = useTranslation();
    const [timezone, setTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    async function onSubmitForm(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: CreateTherapistEntity = {
            FirstName: (formData.get('firstName') as string) || "",
            LastName: (formData.get('lastName') as string) || "",
            MiddleName: (formData.get('middleName') as string) || "",
            Bio: (formData.get('bio') as string) || "",
            PhoneNumber: (formData.get('phoneNumber') as string) || "",
            Email: (formData.get('email') as string) || "",
            TimezoneID: (formData.get('timezone') as string) || "",

        }
        await onSubmit(data);
    }

    return <div>
        <h1>{t('pages.therapists.form.title')}</h1>
        <p>{t('pages.therapists.form.description')}</p>


        <Form id="createTherapistForm" onSubmit={onSubmitForm}>
            <Row>
                <Col md={6}>
                    <PrimaryTextInput
                        name="email"
                        label={t('pages.therapists.form.email_label')}
                        disabled={isSubmitting}
                        error={errors.Email?.toString()}
                        required
                    />
                </Col>
                <Col md={6}>
                    <PrimaryTextInput
                        name="phoneNumber"
                        label={t('pages.therapists.form.phone_label')}
                        disabled={isSubmitting}
                        error={errors.PhoneNumber?.toString()}
                        required
                    />
                </Col>


            </Row>
            <Row>
                <Col md={4}>
                    <PrimaryTextInput
                        name="firstName"
                        label={t('pages.therapists.form.name_label')}
                        disabled={isSubmitting}
                        error={errors.FirstName?.toString()}
                        required
                    />
                </Col>
                <Col md={4}>
                    <PrimaryTextInput
                        name="middleName"
                        label={t('pages.therapists.form.middle_name_label')}
                        disabled={isSubmitting}
                        error={errors.MiddleName?.toString()}
                        required
                    />
                </Col>
                <Col md={4}>
                    <PrimaryTextInput
                        name="lastName"
                        label={t('pages.therapists.form.last_name_label')}
                        disabled={isSubmitting}
                        error={errors.LastName?.toString()}
                        required
                    />
                </Col>
            </Row>
            <Row className="mt-2 mb-3">
                <Form.Group>
                    <Form.Label>{t('pages.therapists.form.timezone_label')}</Form.Label>
                    <TimezoneSelect
                        form="createTherapistForm"
                        name="timezone"
                        value={timezone}
                        onChange={(value) => setTimezone(value.value)}
                        isLoading={isSubmitting}
                        required
                    />
                </Form.Group>
            </Row>

            <Row>
                <Col md={12}>
                    <PrimaryButton label={t('pages.therapists.form.submit_button')} type="submit" variant="primary" disabled={isSubmitting} fullWidth={true} />
                </Col>
            </Row>
        </Form>
    </div>
}