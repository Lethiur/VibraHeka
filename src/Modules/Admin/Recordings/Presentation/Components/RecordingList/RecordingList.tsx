import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import AppLoader from "@core/Presentation/Components/molecules/AppLoader/AppLoader";
import { RecordingEntity } from "@admin/recordings/Domain/Entities/RecordingEntity";
import { RecordingTier, RecordingType } from "@admin/recordings/Domain/Entities/CreateRecordingEntity";
import { RecordingsErrors } from "@admin/recordings/Domain/Errors/RecordingsErrors";
import "./RecordingList.scss";

export interface RecordingListProps {
    recordings: RecordingEntity[];
    loading: boolean;
    error: RecordingsErrors | null;
    deleteLoading: boolean;
    onDelete: (id: string) => Promise<void>;
}

const TYPE_BADGE_CLASS: Record<RecordingType, string> = {
    [RecordingType.MEDITACION]: "recording-list__badge--meditacion",
    [RecordingType.MASTERCLASS]: "recording-list__badge--masterclass",
    [RecordingType.TALLER]: "recording-list__badge--taller",
};

const TIER_BADGE_CLASS: Record<RecordingTier, string> = {
    [RecordingTier.FREE]: "recording-list__badge--free",
    [RecordingTier.PREMIUM]: "recording-list__badge--premium",
    [RecordingTier.DISCOUNT_FOR_MEMBERS]: "recording-list__badge--discount",
};

export default function RecordingList({
    recordings,
    loading,
    error,
    deleteLoading,
    onDelete,
}: RecordingListProps) {
    const { t } = useTranslation();

    const getDomainErrorMessage = (errorCode: RecordingsErrors | null): string | null => {
        if (!errorCode) return null;
        return t(`errors.recordings.${errorCode}`);
    };

    return (
        <section className="vh-surface-card recording-list">
            <h2 className="h4">{t("pages.admin.recordings.list.title")}</h2>
            <p className="recording-list__panel-copy">{t("pages.admin.recordings.list.description")}</p>

            <ErrorBox message={getDomainErrorMessage(error)} />

            {loading ? (
                <AppLoader message={t("pages.admin.recordings.list.loading")} />
            ) : (
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>{t("pages.admin.recordings.list.columns.name")}</th>
                            <th>{t("pages.admin.recordings.list.columns.description")}</th>
                            <th>{t("pages.admin.recordings.list.columns.type")}</th>
                            <th>{t("pages.admin.recordings.list.columns.tier")}</th>
                            <th>{t("pages.admin.recordings.list.columns.created")}</th>
                            <th>{t("pages.admin.recordings.list.columns.actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recordings.length === 0 ? (
                            <tr>
                                <td colSpan={6}>{t("pages.admin.recordings.list.empty")}</td>
                            </tr>
                        ) : (
                            recordings.map((recording) => (
                                <tr key={recording.Id}>
                                    <td>{recording.Name}</td>
                                    <td>{recording.Description}</td>
                                    <td>
                                        <span className={`recording-list__badge ${TYPE_BADGE_CLASS[recording.Type]}`}>
                                            {t(`pages.admin.recordings.form.types.${recording.Type}`)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`recording-list__badge ${TIER_BADGE_CLASS[recording.Tier]}`}>
                                            {t(`pages.admin.recordings.form.tiers.${recording.Tier}`)}
                                        </span>
                                    </td>
                                    <td>{new Date(recording.Created).toLocaleDateString("es-ES")}</td>
                                    <td>
                                        <PrimaryButton
                                            variant="dark-outline"
                                            disabled={deleteLoading}
                                            label={
                                                deleteLoading
                                                    ? t("pages.admin.recordings.list.deleting_button")
                                                    : t("pages.admin.recordings.list.delete_button")
                                            }
                                            onClick={() => onDelete(recording.Id)}
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
