import React from "react";
import { RecordingEntity, RecordingTier } from "@recordings/Domain/Entities/RecordingEntity";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import "./RecordingCard.scss";
import { Play, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

interface RecordingCardProps {
    recording: RecordingEntity;
    isAuthenticated: boolean;
    hasActiveSubscription: boolean;
    onPlay: (recording: RecordingEntity) => void;
    onSubscribe: () => void;
    isLoadingUrl?: boolean;
    isSubscribeLoading?: boolean;
}

const RecordingCard: React.FC<RecordingCardProps> = ({
    recording,
    isAuthenticated,
    hasActiveSubscription,
    onPlay,
    onSubscribe,
    isLoadingUrl = false,
    isSubscribeLoading = false,
}) => {
    const { t } = useTranslation();
    const isPremium = recording.Tier === RecordingTier.PREMIUM || recording.Tier === RecordingTier.DISCOUNT_FOR_MEMBERS;
    const needsSubscription = isAuthenticated && isPremium && !hasActiveSubscription;

    const getButtonConfig = () => {
        if (!isAuthenticated) {
            return {
                label: t("pages.recordings.card.restricted"),
                disabled: true,
                icon: <Play />,
                onClick: () => {},
            };
        }
        if (needsSubscription) {
            return {
                label: isSubscribeLoading ? t("pages.recordings.card.subscribe_loading") : t("pages.recordings.card.subscribe"),
                disabled: isSubscribeLoading,
                icon: <Star />,
                onClick: onSubscribe,
            };
        }
        return {
            label: t("pages.recordings.card.watch"),
            disabled: isLoadingUrl,
            icon: <Play />,
            onClick: () => onPlay(recording),
        };
    };

    const btnConfig = getButtonConfig();

    return (
        <div className="recording-card vh-surface-card">
            <div className="recording-card__content">
                {isPremium && (
                    <span className="recording-card__premium-badge">
                        <Star size={12} /> Premium
                    </span>
                )}
                <h3 className="recording-card__title">{recording.Name}</h3>
                <p className="recording-card__description">{recording.Description}</p>
            </div>

            <div className="recording-card__footer">
                <PrimaryButton
                    variant={needsSubscription ? "secondary" : "primary"}
                    label={btnConfig.label}
                    disabled={btnConfig.disabled}
                    trackId={`recording_action_${recording.Id}`}
                    iconLeft={btnConfig.icon}
                    onClick={btnConfig.onClick}
                    fullWidth
                />
            </div>
        </div>
    );
};

export default RecordingCard;
