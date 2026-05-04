import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ValidationErrors } from "fluentvalidation-ts";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import { CreateRecordingEntity, RecordingTier, RecordingType } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";
import "./CreateRecordingForm.scss";

export interface CreateRecordingFormProps {
    onSubmit: (recording: CreateRecordingEntity) => Promise<void>;
    loading: boolean;
    error: RecordingsErrors | null;
    validationErrors: ValidationErrors<CreateRecordingEntity>;
}

export default function CreateRecordingForm({ onSubmit, loading, error, validationErrors }: CreateRecordingFormProps) {
    const { t } = useTranslation();

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
        };
        
        await onSubmit(data);
    }

    return (
        <section className="vh-surface-card create-recording-form">
            <h2 className="h4">{t("pages.admin.recordings.form.title")}</h2>
            <ErrorBox message={getDomainErrorMessage(error)} />

            <Form onSubmit={handleSubmit} noValidate className="create-recording-form__body">
                <PrimaryTextInput
                    name="Name"
                    label={t("pages.admin.recordings.form.name_label")}
                    disabled={loading}
                    required
                    error={getValidationMessage(validationErrors.Name?.toString())}
                />

                <PrimaryTextInput
                    name="Description"
                    label={t("pages.admin.recordings.form.description_label")}
                    as="textarea"
                    rows={3}
                    disabled={loading}
                    required
                    error={getValidationMessage(validationErrors.Description?.toString())}
                />

                <Form.Group controlId="Type">
                    <Form.Label>{t("pages.admin.recordings.form.type_label")}</Form.Label>
                    <Form.Select
                        name="Type"
                        required
                        disabled={loading}
                        isInvalid={!!validationErrors.Type}
                        defaultValue=""
                    >
                        <option value="">{t("pages.admin.recordings.form.type_placeholder")}</option>
                        <option value={RecordingType.MEDITACION}>{t("pages.admin.recordings.form.types.meditacion")}</option>
                        <option value={RecordingType.MASTERCLASS}>{t("pages.admin.recordings.form.types.masterclass")}</option>
                        <option value={RecordingType.TALLER}>{t("pages.admin.recordings.form.types.taller")}</option>
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
                        disabled={loading}
                        isInvalid={!!validationErrors.Tier}
                        defaultValue=""
                    >
                        <option value="">{t("pages.admin.recordings.form.tier_placeholder")}</option>
                        <option value={RecordingTier.FREE}>{t("pages.admin.recordings.form.tiers.free")}</option>
                        <option value={RecordingTier.PREMIUM}>{t("pages.admin.recordings.form.tiers.premium")}</option>
                    </Form.Select>
                    {validationErrors.Tier && (
                        <Form.Control.Feedback type="invalid">
                            {getValidationMessage(validationErrors.Tier?.toString())}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group controlId="File">
                    <Form.Label>{t("pages.admin.recordings.form.file_label")}</Form.Label>
                    <Form.Control
                        name="File"
                        type="file"
                        required
                        disabled={loading}
                        isInvalid={!!validationErrors.File}
                    />
                    {validationErrors.File && (
                        <Form.Control.Feedback type="invalid">
                            {getValidationMessage(validationErrors.File?.toString())}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <PrimaryButton
                    type="submit"
                    disabled={loading}
                    fullWidth={true}
                    label={loading
                        ? t("pages.admin.recordings.form.submitting_button")
                        : t("pages.admin.recordings.form.submit_button")
                    }
                />
            </Form>
        </section>
    );
}



