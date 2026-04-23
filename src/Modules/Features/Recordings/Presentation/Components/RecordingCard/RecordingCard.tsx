import React from "react";
import { RecordingEntity } from "@recordings/Domain/Entities/RecordingEntity";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import "./RecordingCard.scss";

interface RecordingCardProps {
    recording: RecordingEntity;
    isAuthenticated: boolean;
    onPlay: (recording: RecordingEntity) => void;
    isLoadingUrl?: boolean;
}

const RecordingCard: React.FC<RecordingCardProps> = ({
    recording,
    isAuthenticated,
    onPlay,
    isLoadingUrl = false
}) => {
    return (
        <div className="recording-card vh-surface-card">
            <div className="recording-card__content">
                <h3 className="recording-card__title">{recording.Name}</h3>
                <p className="recording-card__description">{recording.Description}</p>
            </div>

            <div className="recording-card__footer">
                <PrimaryButton
                    variant="primary"
                    label={isAuthenticated ? "Ver grabación" : "Solo usuarios registrados"}
                    disabled={!isAuthenticated || isLoadingUrl}
                    onClick={() => isAuthenticated && onPlay(recording)}
                    fullWidth
                />
            </div>
        </div>
    );
};

export default RecordingCard;
