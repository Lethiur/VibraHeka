import { useEffect } from "react";
import { Col, Container, Form, ProgressBar, Row, Spinner, Table } from "react-bootstrap";
import VHModal from "@core/Presentation/Components/molecules/VHModal/VHModal";
import { useTranslation } from "react-i18next";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import PrimaryTextInput from "@core/Presentation/Components/molecules/PrimaryTextInput/PrimaryTextInput";
import { NotificationVariant } from "@core/Domain/Notifications/INotificationProvider";
import { UseToast } from "@core/Presentation/Hooks/UseToast";
import { CreateRecordingEntity, RecordingType } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";
import UseUploadRecording from "@admin/recordings/Presentation/Hooks/UseUploadRecording";
import UseGetRecordings from "@admin/recordings/Presentation/Hooks/UseGetRecordings";
import UseDeleteRecording from "@admin/recordings/Presentation/Hooks/UseDeleteRecording";
import "./RecordingsPage.scss";

export default function RecordingsPage() {
    const { t } = useTranslation();
    const { ShowNotification } = UseToast();
    const { UploadRecording, recordingID, uploadProgress, loading, error, validationErrors } = UseUploadRecording();
    const { recordings, loading: listLoading, error: listError, refetch } = UseGetRecordings();
    const { DeleteRecording, loading: deleteLoading } = UseDeleteRecording();

    useEffect(() => {
        if (!recordingID) return;
        ShowNotification(
            t("pages.admin.recordings.messages.success_title"),
            t("pages.admin.recordings.messages.success_content"),
            NotificationVariant.Success,
        );
        refetch();
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
            Type: typeValue || RecordingType.MEDITACION,
            File: file instanceof File && file.size > 0 ? file : null
        };

        await UploadRecording(data);
    };

    const handleDelete = async (id: string): Promise<void> => {
        if (!window.confirm(t("pages.admin.recordings.list.delete_confirm"))) return;
        const success = await DeleteRecording(id);
        if (success) {
            ShowNotification(
                t("pages.admin.recordings.list.delete_success_title"),
                t("pages.admin.recordings.list.delete_success_content"),
                NotificationVariant.Success,
            );
        } else {
            ShowNotification(
                t("pages.admin.recordings.messages.error_title"),
                t(`errors.recordings.${RecordingsErrors.DELETE_FAILED}`),
                NotificationVariant.Error,
            );
        }
    };

    const getTypeName = (type: RecordingType): string => {
        switch (type) {
            case RecordingType.MEDITACION: return t("pages.admin.recordings.form.types.meditacion");
            case RecordingType.MASTERCLASS: return t("pages.admin.recordings.form.types.masterclass");
            case RecordingType.TALLER: return t("pages.admin.recordings.form.types.taller");
            default: return String(type);
        }
    };

    return (
        <>
        <VHModal show={loading} backdrop="static" keyboard={false} centered>
            <VHModal.Header>
                <VHModal.Title>{t("pages.admin.recordings.upload_modal.title")}</VHModal.Title>
            </VHModal.Header>
            <VHModal.Body>
                <p className="mb-3">{t("pages.admin.recordings.upload_modal.description")}</p>
                <ProgressBar animated now={uploadProgress} label={`${uploadProgress}%`} />
            </VHModal.Body>
        </VHModal>
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

                        {listError && (
                            <ErrorBox message={getDomainErrorMessage(listError)} />
                        )}

                        {listLoading ? (
                            <div className="d-flex justify-content-center py-4">
                                <Spinner animation="border" role="status" />
                                <span className="visually-hidden">{t("pages.admin.recordings.list.loading")}</span>
                            </div>
                        ) : (
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>{t("pages.admin.recordings.list.columns.name")}</th>
                                        <th>{t("pages.admin.recordings.list.columns.description")}</th>
                                        <th>{t("pages.admin.recordings.list.columns.type")}</th>
                                        <th>{t("pages.admin.recordings.list.columns.created")}</th>
                                        <th>{t("pages.admin.recordings.list.columns.actions")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recordings.length === 0 ? (
                                        <tr>
                                            <td colSpan={5}>{t("pages.admin.recordings.list.empty")}</td>
                                        </tr>
                                    ) : (
                                        recordings.map((recording) => (
                                            <tr key={recording.Id}>
                                                <td>{recording.Name}</td>
                                                <td>{recording.Description}</td>
                                                <td>{getTypeName(recording.Type)}</td>
                                                <td>{new Date(recording.Created).toLocaleDateString("es-ES")}</td>
                                                <td>
                                                    <PrimaryButton
                                                        variant="dark-outline"
                                                        disabled={deleteLoading}
                                                        label={deleteLoading ? t("pages.admin.recordings.list.deleting_button") : t("pages.admin.recordings.list.delete_button")}
                                                        onClick={() => handleDelete(recording.Id)}
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        )}
                    </section>
                </Col>
            </Row>
        </Container>
        </>
    );
}
