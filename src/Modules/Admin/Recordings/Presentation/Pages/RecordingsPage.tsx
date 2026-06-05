import { useEffect, useState } from "react";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import VHModal from "@core/Presentation/Components/molecules/VHModal/VHModal";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import ConfirmationModal from "@core/Presentation/Components/molecules/ConfirmationModal/ConfirmationModal";
import { useTranslation } from "react-i18next";
import { NotificationVariant } from "@core/Domain/Notifications/INotificationProvider";
import { UseToast } from "@core/Presentation/Hooks/UseToast";
import { CreateRecordingEntity } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";
import UseUploadRecording from "@admin/recordings/Presentation/Hooks/UseUploadRecording";
import UseGetRecordings from "@admin/recordings/Presentation/Hooks/UseGetRecordings";
import UseDeleteRecording from "@admin/recordings/Presentation/Hooks/UseDeleteRecording";
import UseToggleRecordingStatus from "@admin/recordings/Presentation/Hooks/UseToggleRecordingStatus";
import CreateRecordingForm from "@admin/recordings/Presentation/Components/CreateRecordingForm/CreateRecordingForm.tsx";
import RecordingList from "@admin/recordings/Presentation/Components/RecordingList/RecordingList.tsx";
import "./RecordingsPage.scss";

export default function RecordingsPage() {
    const { t } = useTranslation();
    const { ShowNotification } = UseToast();
    const { UploadRecording, recordingID, uploadProgress, loading, error, validationErrors } = UseUploadRecording();
    const { recordings, loading: listLoading, error: listError, refetch } = UseGetRecordings();
    const { DeleteRecording, loading: deleteLoading } = UseDeleteRecording();
    const { ToggleStatus, loading: toggleLoading } = UseToggleRecordingStatus();
    const [showFormModal, setShowFormModal] = useState(false);
    const [toggleConfirmation, setToggleConfirmation] = useState<{ id: string; activate: boolean } | null>(null);

    useEffect(() => {
        if (!recordingID) return;
        setShowFormModal(false);
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

    const handleSubmit = async (data: CreateRecordingEntity): Promise<void> => {
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

    const handleToggleStatus = async (id: string, activate: boolean): Promise<void> => {
        setToggleConfirmation({ id, activate });
    };

    const handleCloseToggleConfirmation = (): void => {
        if (!toggleLoading) {
            setToggleConfirmation(null);
        }
    };

    const handleConfirmToggleStatus = async (): Promise<void> => {
        if (!toggleConfirmation) return;

        const { id, activate } = toggleConfirmation;
        setToggleConfirmation(null);
        const success = await ToggleStatus(id, activate);

        if (success) {
            ShowNotification(
                t("pages.admin.recordings.list.toggle_success_title"),
                t("pages.admin.recordings.list.toggle_success_content"),
                NotificationVariant.Success,
            );
            refetch();
        } else {
            ShowNotification(
                t("pages.admin.recordings.messages.error_title"),
                t(`errors.recordings.${RecordingsErrors.TOGGLE_STATUS_FAILED}`),
                NotificationVariant.Error,
            );
        }
    };

    return (
        <>
            <ConfirmationModal
                show={toggleConfirmation !== null}
                title={toggleConfirmation?.activate
                    ? t("pages.admin.recordings.activation_modal.activate_title")
                    : t("pages.admin.recordings.activation_modal.deactivate_title")}
                description={toggleConfirmation?.activate
                    ? t("pages.admin.recordings.list.activate_confirm")
                    : t("pages.admin.recordings.list.deactivate_confirm")}
                confirmLabel={toggleConfirmation?.activate
                    ? t("pages.admin.recordings.list.activate_button")
                    : t("pages.admin.recordings.list.deactivate_button")}
                cancelLabel={t("pages.admin.recordings.activation_modal.cancel_button")}
                loading={toggleLoading}
                onCancel={handleCloseToggleConfirmation}
                onConfirm={handleConfirmToggleStatus}
            />
            <VHModal
                show={showFormModal}
                backdrop={loading ? "static" : true}
                keyboard={!loading}
                onHide={() => { if (!loading) setShowFormModal(false); }}
                centered
            >
                <VHModal.Header closeButton={!loading}>
                    <VHModal.Title>{t("pages.admin.recordings.form.title")}</VHModal.Title>
                </VHModal.Header>
                <VHModal.Body>
                    <CreateRecordingForm
                        onSubmit={handleSubmit}
                        loading={loading}
                        disabled={loading}
                        error={error}
                        validationErrors={validationErrors}
                    />
                    {loading && (
                        <div className="mt-3">
                            <p className="text-muted small">{t("pages.admin.recordings.upload_modal.description")}</p>
                            <ProgressBar animated now={uploadProgress} label={`${uploadProgress}%`} />
                        </div>
                    )}
                </VHModal.Body>
            </VHModal>

            <Container fluid className="py-4 py-md-5 recordings-page">
                <section className="vh-surface-card mb-4 recordings-page__header">
                    <div className="recordings-page__header-content">
                        <div>
                            <h1>{t("pages.admin.recordings.title")}</h1>
                            <p>{t("pages.admin.recordings.description")}</p>
                        </div>
                        <PrimaryButton
                            label={t("pages.admin.recordings.new_recording_button")}
                            onClick={() => setShowFormModal(true)}
                        />
                    </div>
                </section>

                <Row className="g-4">
                    <Col lg={12}>
                        <RecordingList
                            recordings={recordings}
                            loading={listLoading}
                            error={listError}
                            deleteLoading={deleteLoading}
                            toggleLoading={toggleLoading}
                            onDelete={handleDelete}
                            onToggleStatus={handleToggleStatus}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
