import React from "react";
import "./CreateProductForm.scss";
import { ValidationErrors } from "fluentvalidation-ts";
import { CreateProductEntity } from "@admin/catalog/Domain/Entities/CreateProductEntity";
import { CurrencyIsoCode } from "@admin/catalog/Domain/Entities/CurrencyIsoCode";
import { useTranslation } from "react-i18next";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import { Col, Form, Row } from "react-bootstrap";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";

export interface CreateProductFormProps {
    onSubmit: (data: CreateProductEntity) => Promise<void>;
    isSubmitting: boolean;
    errors: ValidationErrors<CreateProductEntity>;
}

export default function CreateProductForm({ onSubmit, isSubmitting, errors }: CreateProductFormProps) {
    const { t } = useTranslation();

    async function onSubmitForm(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: CreateProductEntity = {
            Name: (formData.get('name') as string) || "",
            Description: (formData.get('description') as string) || "",
            Price: parseFloat((formData.get('price') as string) || "0"),
            CurrencyCode: (formData.get('currencyCode') as CurrencyIsoCode) || CurrencyIsoCode.EUR,
        };
        await onSubmit(data);
    }

    return (
        <div>
            <h1>{t('pages.admin.catalog.form.title')}</h1>

            <Form onSubmit={onSubmitForm}>
                <Row>
                    <Col md={6}>
                        <PrimaryTextInput
                            name="name"
                            label={t('pages.admin.catalog.form.name_label')}
                            disabled={isSubmitting}
                            error={errors.Name?.toString()}
                            required
                        />
                    </Col>
                    <Col md={6}>
                        <PrimaryTextInput
                            name="description"
                            label={t('pages.admin.catalog.form.description_label')}
                            disabled={isSubmitting}
                            error={errors.Description?.toString()}
                            required
                        />
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <PrimaryTextInput
                            name="price"
                            label={t('pages.admin.catalog.form.price_label')}
                            type="number"
                            disabled={isSubmitting}
                            error={errors.Price?.toString()}
                            required
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>{t('pages.admin.catalog.form.currency_label')}</Form.Label>
                            <Form.Select name="currencyCode" disabled={isSubmitting} required>
                                <option value={CurrencyIsoCode.EUR}>{CurrencyIsoCode.EUR}</option>
                                <option value={CurrencyIsoCode.USD}>{CurrencyIsoCode.USD}</option>
                                <option value={CurrencyIsoCode.GBP}>{CurrencyIsoCode.GBP}</option>
                            </Form.Select>
                            {errors.CurrencyCode && (
                                <Form.Text className="text-danger">{errors.CurrencyCode.toString()}</Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <PrimaryButton
                            label={isSubmitting
                                ? t('pages.admin.catalog.form.submitting_button')
                                : t('pages.admin.catalog.form.submit_button')}
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                            fullWidth={true}
                        />
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
