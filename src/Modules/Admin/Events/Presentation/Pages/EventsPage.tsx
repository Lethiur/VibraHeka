import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import VHModal from "@core/Presentation/Components/molecules/VHModal/VHModal";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import { useTranslation } from "react-i18next";
import { NotificationVariant } from "@core/Domain/Notifications/INotificationProvider";
import { UseToast } from "@core/Presentation/Hooks/UseToast";
import { CreateEventEntity } from "@admin/events/Domain/Entities/CreateEventEntity";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";
import UseCreateEvent from "@admin/events/Presentation/Hooks/UseCreateEvent";
import UseGetEvents from "@admin/events/Presentation/Hooks/UseGetEvents";
import UseDeleteEvent from "@admin/events/Presentation/Hooks/UseDeleteEvent";
import UseToggleEventStatus from "@admin/events/Presentation/Hooks/UseToggleEventStatus";
import CreateEventForm from "@admin/events/Presentation/Components/CreateEventForm/CreateEventForm";
import EventList from "@admin/events/Presentation/Components/EventList/EventList";
import "./EventsPage.scss";

export default function EventsPage() {
    const { t } = useTranslation();
    const { ShowNotification } = UseToast();
    const { CreateEvent, createdId, loading, error, validationErrors } = UseCreateEvent();
    const { events, loading: listLoading, error: listError, refetch } = UseGetEvents();
    const { DeleteEvent, loading: deleteLoading } = UseDeleteEvent();
    const { ToggleStatus, loading: toggleLoading } = UseToggleEventStatus();
    const [showFormModal, setShowFormModal] = useState(false);

    useEffect(() => {
        if (!createdId) return;
        setShowFormModal(false);
        ShowNotification(
            t("pages.admin.events.messages.success_title"),
            t("pages.admin.events.messages.success_content"),
            NotificationVariant.Success,
        );
        refetch();
    }, [createdId, ShowNotification, t]);

    useEffect(() => {
        if (!error) return;
        ShowNotification(
            t("pages.admin.events.messages.error_title"),
            t(`errors.events.${error}`),
            NotificationVariant.Error,
        );
    }, [error, ShowNotification, t]);

    const handleSubmit = async (data: CreateEventEntity): Promise<void> => {
        await CreateEvent(data);
    };

    const handleDelete = async (id: string): Promise<void> => {
        if (!window.confirm(t("pages.admin.events.list.delete_confirm"))) return;
        const success = await DeleteEvent(id);
        if (success) {
            ShowNotification(
                t("pages.admin.events.list.delete_success_title"),
                t("pages.admin.events.list.delete_success_content"),
                NotificationVariant.Success,
            );
        } else {
            ShowNotification(
                t("pages.admin.events.messages.error_title"),
                t(`errors.events.${EventsErrors.DELETE_FAILED}`),
                NotificationVariant.Error,
            );
        }
    };

    const handleToggleStatus = async (id: string, activate: boolean): Promise<void> => {
        const confirmMsg = activate
            ? t("pages.admin.events.list.activate_confirm")
            : t("pages.admin.events.list.deactivate_confirm");
        if (!window.confirm(confirmMsg)) return;
        const success = await ToggleStatus(id, activate);
        if (success) {
            ShowNotification(
                t("pages.admin.events.list.toggle_success_title"),
                t("pages.admin.events.list.toggle_success_content"),
                NotificationVariant.Success,
            );
        } else {
            ShowNotification(
                t("pages.admin.events.messages.error_title"),
                t(`errors.events.${EventsErrors.TOGGLE_STATUS_FAILED}`),
                NotificationVariant.Error,
            );
        }
    };

    return (
        <>
            <VHModal
                show={showFormModal}
                backdrop={loading ? "static" : true}
                keyboard={!loading}
                onHide={() => { if (!loading) setShowFormModal(false); }}
                centered
            >
                <VHModal.Header closeButton={!loading}>
                    <VHModal.Title>{t("pages.admin.events.form.title")}</VHModal.Title>
                </VHModal.Header>
                <VHModal.Body>
                    <CreateEventForm
                        onSubmit={handleSubmit}
                        loading={loading}
                        disabled={loading}
                        error={error}
                        validationErrors={validationErrors}
                    />
                </VHModal.Body>
            </VHModal>

            <Container fluid className="py-4 py-md-5 events-page">
                <section className="vh-surface-card mb-4 events-page__header">
                    <div className="events-page__header-content">
                        <div>
                            <h1>{t("pages.admin.events.title")}</h1>
                            <p>{t("pages.admin.events.description")}</p>
                        </div>
                        <PrimaryButton
                            label={t("pages.admin.events.new_event_button")}
                            onClick={() => setShowFormModal(true)}
                        />
                    </div>
                </section>

                <Row className="g-4">
                    <Col lg={12}>
                        <EventList
                            events={events}
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
