import {useEffect} from "react";
import {Col, Container, ProgressBar, Row} from "react-bootstrap";
import VHModal from "@core/Presentation/Components/molecules/VHModal/VHModal";
import {useTranslation} from "react-i18next";
import {NotificationVariant} from "@core/Domain/Notifications/INotificationProvider";
import {UseToast} from "@core/Presentation/Hooks/UseToast";
import {CreateRecordingEntity} from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import {RecordingsErrors} from "@admin/recordings/Domain/Errors/RecordingsErrors";
import UseUploadRecording from "@admin/recordings/Presentation/Hooks/UseUploadRecording";
import UseGetRecordings from "@admin/recordings/Presentation/Hooks/UseGetRecordings";
import UseDeleteRecording from "@admin/recordings/Presentation/Hooks/UseDeleteRecording";
import CreateRecordingForm from "@admin/recordings/Presentation/Components/CreateRecordingForm/CreateRecordingForm.tsx";
import RecordingList from "@admin/recordings/Presentation/Components/RecordingList/RecordingList.tsx";
import "./RecordingsPage.scss";

export default function RecordingsPage() {
    const {t} = useTranslation();
    const {ShowNotification} = UseToast();
    const {UploadRecording, recordingID, uploadProgress, loading, error, validationErrors} = UseUploadRecording();
    const {recordings, loading: listLoading, error: listError, refetch} = UseGetRecordings();
    const {DeleteRecording, loading: deleteLoading} = UseDeleteRecording();

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

    return (
        <>
            <VHModal show={loading} backdrop="static" keyboard={false} centered>
                <VHModal.Header>
                    <VHModal.Title>{t("pages.admin.recordings.upload_modal.title")}</VHModal.Title>
                </VHModal.Header>
                <VHModal.Body>
                    <p className="mb-3">{t("pages.admin.recordings.upload_modal.description")}</p>
                    <ProgressBar animated now={uploadProgress} label={`${uploadProgress}%`}/>
                </VHModal.Body>
            </VHModal>

            <Container fluid className="py-4 py-md-5 recordings-page">
                <section className="vh-surface-card mb-4 recordings-page__header">
                    <h1>{t("pages.admin.recordings.title")}</h1>
                    <p>{t("pages.admin.recordings.description")}</p>
                </section>

                <Row className="g-4 align-items-start">
                    <Col lg={4} className="recordings-page__form-col">
                        <CreateRecordingForm
                            onSubmit={handleSubmit}
                            loading={loading}
                            error={error}
                            validationErrors={validationErrors}
                        />
                    </Col>

                    <Col lg={8}>
                        <RecordingList
                            recordings={recordings}
                            loading={listLoading}
                            error={listError}
                            deleteLoading={deleteLoading}
                            onDelete={handleDelete}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
