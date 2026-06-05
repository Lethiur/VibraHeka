import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ValidationErrors } from "fluentvalidation-ts";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import { CreateRecordingEntity, CurrencyIsoCode, RecordingTier, RecordingType } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";
import "./CreateRecordingForm.scss";

export interface CreateRecordingFormProps {
    onSubmit: (recording: CreateRecordingEntity) => Promise<void>;
    loading: boolean;
    disabled?: boolean;
    error: RecordingsErrors | null;
    validationErrors: ValidationErrors<CreateRecordingEntity>;
}

export default function CreateRecordingForm({ onSubmit, loading, disabled, error, validationErrors }: CreateRecordingFormProps) {
    const { t } = useTranslation();
    const isDisabled = loading || disabled;

    const getValidationMessage = (errorCode?: string): string | undefined => {
        if (!errorCode) return undefined;
        return t(`errors.recordings.${errorCode}`);
    };

    const getDomainErrorMessage = (errorCode: RecordingsErrors | null): string | null => {
        if (!errorCode) return null;
        return t(`errors.recordings.${errorCode}`);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const file = formData.get("File");
        const typeStr = formData.get("Type") as string;
        const typeValue = typeStr !== "" ? (Number(typeStr) as RecordingType) : null;
        const tierStr = formData.get("Tier") as string;
        const tierValue = tierStr !== "" ? (Number(tierStr) as RecordingTier) : null;

        const data: CreateRecordingEntity = {
            Name: (formData.get("Name") as string) ?? "",
            Description: (formData.get("Description") as string) ?? "",
            Type: typeValue ?? RecordingType.MEDITACION,
            Tier: tierValue ?? RecordingTier.FREE,
            File: file instanceof File && file.size > 0 ? file : null,
            Price: parseFloat(formData.get("Price") as string) || 0,
            CurrencyCode: (formData.get("CurrencyCode") as CurrencyIsoCode) ?? CurrencyIsoCode.USD,
        };

        await onSubmit(data);
    };

    return (
        <section className="create-recording-form">
            <ErrorBox message={getDomainErrorMessage(error)} />

            <Form onSubmit={handleSubmit} noValidate className="create-recording-form__body">
                <PrimaryTextInput
                    name="Name"
                    label={t("pages.admin.recordings.form.name_label")}
                    disabled={isDisabled}
                    required
                    error={getValidationMessage(validationErrors.Name?.toString())}
                />

                <PrimaryTextInput
                    name="Description"
                    label={t("pages.admin.recordings.form.description_label")}
                    as="textarea"
                    rows={3}
                    disabled={isDisabled}
                    required
                    error={getValidationMessage(validationErrors.Description?.toString())}
                />

                <Form.Group controlId="Type">
                    <Form.Label>{t("pages.admin.recordings.form.type_label")}</Form.Label>
                    <Form.Select
                        name="Type"
                        required
                        disabled={isDisabled}
                        isInvalid={!!validationErrors.Type}
                        defaultValue=""
                    >
                        <option value="">{t("pages.admin.recordings.form.type_placeholder")}</option>
                        <option value={RecordingType.MEDITACION}>{t(`pages.admin.recordings.form.types.${RecordingType.MEDITACION}`)}</option>
                        <option value={RecordingType.MASTERCLASS}>{t(`pages.admin.recordings.form.types.${RecordingType.MASTERCLASS}`)}</option>
                        <option value={RecordingType.TALLER}>{t(`pages.admin.recordings.form.types.${RecordingType.TALLER}`)}</option>
                        <option value={RecordingType.CONSTELLATION}>{t(`pages.admin.recordings.form.types.${RecordingType.CONSTELLATION}`)}</option>
                    </Form.Select>
                    {validationErrors.Type && (
                        <Form.Control.Feedback type="invalid">
                            {getValidationMessage(validationErrors.Type?.toString())}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group controlId="Tier">
                    <Form.Label>{t("pages.admin.recordings.form.tier_label")}</Form.Label>
                    <Form.Select
                        name="Tier"
                        required
                        disabled={isDisabled}
                        isInvalid={!!validationErrors.Tier}
                        defaultValue=""
                    >
                        <option value="">{t("pages.admin.recordings.form.tier_placeholder")}</option>
                        <option value={RecordingTier.FREE}>{t(`pages.admin.recordings.form.tiers.${RecordingTier.FREE}`)}</option>
                        <option value={RecordingTier.PREMIUM}>{t(`pages.admin.recordings.form.tiers.${RecordingTier.PREMIUM}`)}</option>
                        <option value={RecordingTier.DISCOUNT_FOR_MEMBERS}>{t(`pages.admin.recordings.form.tiers.${RecordingTier.DISCOUNT_FOR_MEMBERS}`)}</option>
                    </Form.Select>
                    {validationErrors.Tier && (
                        <Form.Control.Feedback type="invalid">
                            {getValidationMessage(validationErrors.Tier?.toString())}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group controlId="Price">
                    <Form.Label>{t("pages.admin.recordings.form.price_label")}</Form.Label>
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

                <Form.Group controlId="CurrencyCode">
                    <Form.Label>{t("pages.admin.recordings.form.currency_label")}</Form.Label>
                    <Form.Select
                        name="CurrencyCode"
                        required
                        disabled={isDisabled}
                        isInvalid={!!validationErrors.CurrencyCode}
                        defaultValue=""
                    >
                        <option value="">{t("pages.admin.recordings.form.currency_placeholder")}</option>
                        <option value={CurrencyIsoCode.USD}>{t("pages.admin.recordings.form.currencies.USD")}</option>
                        <option value={CurrencyIsoCode.ARS}>{t("pages.admin.recordings.form.currencies.ARS")}</option>
                        <option value={CurrencyIsoCode.EUR}>{t("pages.admin.recordings.form.currencies.EUR")}</option>
                    </Form.Select>
                    {validationErrors.CurrencyCode && (
                        <Form.Control.Feedback type="invalid">
                            {getValidationMessage(validationErrors.CurrencyCode?.toString())}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group controlId="File">
                    <Form.Label>{t("pages.admin.recordings.form.file_label")}</Form.Label>
                    <Form.Control
                        name="File"
                        type="file"
                        required
                        disabled={isDisabled}
                        isInvalid={!!validationErrors.File}
                    />
                    {validationErrors.File && (
                        <Form.Control.Feedback type="invalid">
                            {getValidationMessage(validationErrors.File?.toString())}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                {!isDisabled && (
                    <PrimaryButton
                        type="submit"
                        disabled={isDisabled}
                        fullWidth={true}
                        label={loading
                            ? t("pages.admin.recordings.form.submitting_button")
                            : t("pages.admin.recordings.form.submit_button")
                        }
                    />
                )}
            </Form>
        </section>
    );
}



