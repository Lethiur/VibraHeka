import { useEffect } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import { NotificationVariant } from "@core/Domain/Notifications/INotificationProvider";
import { UseToast } from "@core/Presentation/Hooks/UseToast";
import { CreateRecordingEntity, RecordingType } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";
import UseUploadRecording from "@admin/recordings/Presentation/Hooks/UseUploadRecording";
import "./RecordingsPage.scss";

export default function RecordingsPage() {
    const { t } = useTranslation();
    const { ShowNotification } = UseToast();
    const { UploadRecording, recordingID, loading, error, validationErrors } = UseUploadRecording();

    useEffect(() => {
        if (!recordingID) return;
        ShowNotification(
            t("pages.admin.recordings.messages.success_title"),
            t("pages.admin.recordings.messages.success_content"),
            NotificationVariant.Success,
        );
    }, [recordingID, ShowNotification, t]);

    useEffect(() => {
        if (!error) return;
        ShowNotification(
            t("pages.admin.recordings.messages.error_title"),
            t(`errors.recordings.${error}`),
            NotificationVariant.Error,
        );
    }, [error, ShowNotification, t]);

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

        const data: CreateRecordingEntity = {
            Name: (formData.get("Name") as string) ?? "",
            Description: (formData.get("Description") as string) ?? "",
            Type: typeValue,
            File: file instanceof File && file.size > 0 ? file : null,
            FileName: (formData.get("FileName") as string) ?? "",
        };

        await UploadRecording(data);
    };

    return (
        <Container fluid className="py-4 py-md-5 recordings-page">
            <section className="vh-surface-card mb-4 recordings-page__header">
                <h1>{t("pages.admin.recordings.title")}</h1>
                <p>{t("pages.admin.recordings.description")}</p>
            </section>

            <Row className="g-4">
                <Col lg={5}>
                    <section className="vh-surface-card h-100 recordings-page__panel">
                        <h2 className="h4">{t("pages.admin.recordings.form.title")}</h2>
                        <ErrorBox message={getDomainErrorMessage(error)} />

                        <Form onSubmit={handleSubmit} noValidate className="d-flex flex-column gap-3">
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

                            <PrimaryTextInput
                                name="FileName"
                                label={t("pages.admin.recordings.form.file_name_label")}
                                disabled={loading}
                                required
                                error={getValidationMessage(validationErrors.FileName?.toString())}
                            />

                            <PrimaryButton
                                type="submit"
                                disabled={loading}
                                fullWidth={true}
                                label={loading ? t("pages.admin.recordings.form.submitting_button") : t("pages.admin.recordings.form.submit_button")}
                            />
                        </Form>
                    </section>
                </Col>

                <Col lg={7}>
                    <section className="vh-surface-card h-100 recordings-page__panel">
                        <h2 className="h4">{t("pages.admin.recordings.list.title")}</h2>
                        <p className="recordings-page__panel-copy">{t("pages.admin.recordings.list.description")}</p>

                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>{t("pages.admin.recordings.list.columns.name")}</th>
                                    <th>{t("pages.admin.recordings.list.columns.description")}</th>
                                    <th>{t("pages.admin.recordings.list.columns.type")}</th>
                                    <th>{t("pages.admin.recordings.list.columns.file_name")}</th>
                                    <th>{t("pages.admin.recordings.list.columns.actions")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={4}>{t("pages.admin.recordings.list.pending")}</td>
                                    <td>
                                        <PrimaryButton
                                            variant="outline-danger"
                                            disabled
                                            label={t("pages.admin.recordings.list.delete_pending")}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </section>
                </Col>
            </Row>
        </Container>
    );
}
