import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import AppLoader from "@core/Presentation/Components/molecules/AppLoader/AppLoader";
import { EventEntity } from "@admin/events/Domain/Entities/EventEntity";
import { EventsErrors } from "@admin/events/Domain/Errors/EventsErrors";
import "./EventList.scss";

export interface EventListProps {
    events: EventEntity[];
    loading: boolean;
    error: EventsErrors | null;
    deleteLoading: boolean;
    toggleLoading: boolean;
    onDelete: (id: string) => Promise<void>;
    onToggleStatus: (id: string, activate: boolean) => Promise<void>;
}

export default function EventList({
    events,
    loading,
    error,
    deleteLoading,
    toggleLoading,
    onDelete,
    onToggleStatus,
}: EventListProps) {
    const { t } = useTranslation();

    const getDomainErrorMessage = (errorCode: EventsErrors | null): string | null => {
        if (!errorCode) return null;
        return t(`errors.events.${errorCode}`);
    };

    const formatDate = (dateStr: string): string => {
        try {
            return new Date(dateStr).toLocaleString("es-ES", {
                dateStyle: "short",
                timeStyle: "short",
            });
        } catch {
            return dateStr;
        }
    };

    return (
        <section className="vh-surface-card event-list">
            <h2 className="h4">{t("pages.admin.events.list.title")}</h2>
            <p className="event-list__panel-copy">{t("pages.admin.events.list.description")}</p>

            <ErrorBox message={getDomainErrorMessage(error)} />

            {loading ? (
                <AppLoader message={t("pages.admin.events.list.loading")} />
            ) : (
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>{t("pages.admin.events.list.columns.name")}</th>
                            <th>{t("pages.admin.events.list.columns.description")}</th>
                            <th>{t("pages.admin.events.list.columns.date")}</th>
                            <th>{t("pages.admin.events.list.columns.duration")}</th>
                            <th>{t("pages.admin.events.list.columns.timezone")}</th>
                            <th>{t("pages.admin.events.list.columns.status")}</th>
                            <th>{t("pages.admin.events.list.columns.actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.length === 0 ? (
                            <tr>
                                <td colSpan={7}>{t("pages.admin.events.list.empty")}</td>
                            </tr>
                        ) : (
                            events.map((event) => (
                                <tr key={event.EventID}>
                                    <td>{event.EventName}</td>
                                    <td>{event.EventDescription}</td>
                                    <td>{formatDate(event.EventDateUtc)}</td>
                                    <td>{event.Duration} min</td>
                                    <td>{event.EventTimezone}</td>
                                    <td>
                                        <span className={`event-list__badge ${event.IsActive ? "event-list__badge--active" : "event-list__badge--inactive"}`}>
                                            {event.IsActive
                                                ? t("pages.admin.events.status.active")
                                                : t("pages.admin.events.status.inactive")}
                                        </span>
                                    </td>
                                    <td className="event-list__actions">
                                        <PrimaryButton
                                            variant="dark-outline"
                                            disabled={toggleLoading}
                                            label={event.IsActive
                                                ? t("pages.admin.events.list.deactivate_button")
                                                : t("pages.admin.events.list.activate_button")
                                            }
                                            onClick={() => onToggleStatus(event.EventID, !event.IsActive)}
                                        />
                                        <PrimaryButton
                                            variant="dark-outline"
                                            disabled={deleteLoading}
                                            label={
                                                deleteLoading
                                                    ? t("pages.admin.events.list.deleting_button")
                                                    : t("pages.admin.events.list.delete_button")
                                            }
                                            onClick={() => onDelete(event.EventID)}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            )}
        </section>
    );
}
