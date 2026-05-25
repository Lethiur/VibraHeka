import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ValidationErrors } from "fluentvalidation-ts";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import { CreateEventEntity, CurrencyIsoCode } from "@admin/events/Domain/Entities/CreateEventEntity";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";
import "./CreateEventForm.scss";

export interface CreateEventFormProps {
    onSubmit: (event: CreateEventEntity) => Promise<void>;
    loading: boolean;
    disabled?: boolean;
    error: EventsErrors | null;
    validationErrors: ValidationErrors<CreateEventEntity>;
}

export default function CreateEventForm({ onSubmit, loading, disabled, error, validationErrors }: CreateEventFormProps) {
    const { t } = useTranslation();
    const isDisabled = loading || disabled;

    const getValidationMessage = (errorCode?: string): string | undefined => {
        if (!errorCode) return undefined;
        return t(`errors.events.${errorCode}`);
    };

    const getDomainErrorMessage = (errorCode: EventsErrors | null): string | null => {
        if (!errorCode) return null;
        return t(`errors.events.${errorCode}`);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data: CreateEventEntity = {
            EventName: (formData.get("EventName") as string) ?? "",
            EventDescription: (formData.get("EventDescription") as string) ?? "",
            EventDate: (formData.get("EventDate") as string) ?? "",
            Duration: parseInt(formData.get("Duration") as string, 10) || 0,
            EventTimezone: (formData.get("EventTimezone") as string) ?? "",
            Price: parseFloat(formData.get("Price") as string) || 0,
            CurrencyCode: (formData.get("CurrencyCode") as CurrencyIsoCode) ?? CurrencyIsoCode.USD,
        };

        await onSubmit(data);
    };

    return (
        <section className="create-event-form">
            <ErrorBox message={getDomainErrorMessage(error)} />

            <Form onSubmit={handleSubmit} noValidate className="create-event-form__body">
                <PrimaryTextInput
                    name="EventName"
                    label={t("pages.admin.events.form.name_label")}
                    disabled={isDisabled}
                    required
                    error={getValidationMessage(validationErrors.EventName?.toString())}
                />

                <PrimaryTextInput
                    name="EventDescription"
                    label={t("pages.admin.events.form.description_label")}
                    as="textarea"
                    rows={3}
                    disabled={isDisabled}
                    required
                    error={getValidationMessage(validationErrors.EventDescription?.toString())}
                />

                <Form.Group controlId="EventDate" className="mb-3">
                    <Form.Label>{t("pages.admin.events.form.date_label")}</Form.Label>
                    <Form.Control
                        name="EventDate"
                        type="datetime-local"
                        required
                        disabled={isDisabled}
                        isInvalid={!!validationErrors.EventDate}
                    />
                    {validationErrors.EventDate && (
                        <Form.Control.Feedback type="invalid">
                            {getValidationMessage(validationErrors.EventDate?.toString())}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group controlId="Duration" className="mb-3">
                    <Form.Label>{t("pages.admin.events.form.duration_label")}</Form.Label>
                    <Form.Control
                        name="Duration"
                        type="number"
                        min="1"
                        required
                        disabled={isDisabled}
                        isInvalid={!!validationErrors.Duration}
                    />
                    {validationErrors.Duration && (
                        <Form.Control.Feedback type="invalid">
                            {getValidationMessage(validationErrors.Duration?.toString())}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group controlId="EventTimezone" className="mb-3">
                    <Form.Label>{t("pages.admin.events.form.timezone_label")}</Form.Label>
                    <Form.Select
                        name="EventTimezone"
                        required
                        disabled={isDisabled}
                        isInvalid={!!validationErrors.EventTimezone}
                        defaultValue=""
                    >
                        <option value="">{t("pages.admin.events.form.timezone_placeholder")}</option>
                        <option value="UTC">UTC</option>
                        <option value="America/Buenos_Aires">America/Buenos_Aires (ART)</option>
                        <option value="America/New_York">America/New_York (ET)</option>
                        <option value="America/Los_Angeles">America/Los_Angeles (PT)</option>
                        <option value="Europe/Madrid">Europe/Madrid (CET)</option>
                        <option value="Europe/London">Europe/London (GMT)</option>
                        <option value="America/Mexico_City">America/Mexico_City (CST)</option>
                        <option value="America/Bogota">America/Bogota (COT)</option>
                        <option value="America/Santiago">America/Santiago (CLT)</option>
                    </Form.Select>
                    {validationErrors.EventTimezone && (
                        <Form.Control.Feedback type="invalid">
                            {getValidationMessage(validationErrors.EventTimezone?.toString())}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group controlId="Price" className="mb-3">
                    <Form.Label>{t("pages.admin.events.form.price_label")}</Form.Label>
                    <Form.Control
                        name="Price"
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        disabled={isDisabled}
                        isInvalid={!!validationErrors.Price}
                    />
                    {validationErrors.Price && (
                        <Form.Control.Feedback type="invalid">
                            {getValidationMessage(validationErrors.Price?.toString())}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group controlId="CurrencyCode" className="mb-3">
                    <Form.Label>{t("pages.admin.events.form.currency_label")}</Form.Label>
                    <Form.Select
                        name="CurrencyCode"
                        required
                        disabled={isDisabled}
                        isInvalid={!!validationErrors.CurrencyCode}
                        defaultValue=""
                    >
                        <option value="">{t("pages.admin.events.form.currency_placeholder")}</option>
                        <option value={CurrencyIsoCode.USD}>Dólar (USD)</option>
                        <option value={CurrencyIsoCode.ARS}>Peso Argentino (ARS)</option>
                        <option value={CurrencyIsoCode.EUR}>Euro (EUR)</option>
                    </Form.Select>
                    {validationErrors.CurrencyCode && (
                        <Form.Control.Feedback type="invalid">
                            {getValidationMessage(validationErrors.CurrencyCode?.toString())}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                {!isDisabled && (
                    <PrimaryButton
                        type="submit"
                        disabled={isDisabled}
                        fullWidth={true}
                        label={loading
                            ? t("pages.admin.events.form.submitting_button")
                            : t("pages.admin.events.form.submit_button")
                        }
                    />
                )}
            </Form>
        </section>
    );
}
