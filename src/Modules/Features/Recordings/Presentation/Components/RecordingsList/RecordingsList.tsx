import React, { useMemo } from "react";
import { RecordingEntity, RecordingType } from "@recordings/Domain/Entities/RecordingEntity";
import RecordingCard from "../RecordingCard/RecordingCard";
import { Row, Col } from "react-bootstrap";
import "./RecordingsList.scss";

interface RecordingsListProps {
    recordings: RecordingEntity[];
    isAuthenticated: boolean;
    onPlay: (recording: RecordingEntity) => void;
    isLoadingUrl?: boolean;
}

const getTypeName = (type: RecordingType | string | number): string => {
    const typeValue = typeof type === "string" ? parseInt(type, 10) : type;
    switch (typeValue) {
        case RecordingType.MEDITACION: return "Meditaciones";
        case RecordingType.MASTERCLASS: return "Masterclasses";
        case RecordingType.TALLER: return "Talleres";
        default: return "Otras grabaciones";
    }
};

const RecordingsList: React.FC<RecordingsListProps> = ({
    recordings,
    isAuthenticated,
    onPlay,
    isLoadingUrl = false
}) => {

    const groupedRecordings = useMemo(() => {
        const groups: Record<number, RecordingEntity[]> = {};
        recordings.forEach((recording) => {
            const key = typeof recording.Type === "string" ? parseInt(recording.Type, 10) : recording.Type;
            if (!groups[key]) groups[key] = [];
            groups[key].push(recording);
        });
        return groups;
    }, [recordings]);

    if (recordings.length === 0) {
        return (
            <div className="recordings-list__empty">
                <p>Aún no hay grabaciones disponibles.</p>
            </div>
        );
    }

    return (
        <div className="recordings-list">
            {Object.entries(groupedRecordings).map(([type, items]) => (
                <section key={type} className="recordings-list__section mb-5">
                    <h2 className="recordings-list__section-title mb-4">
                        {getTypeName(Number(type))}
                    </h2>
                    <Row className="g-4">
                        {items.map((recording) => (
                            <Col key={recording.Id} xs={12} md={6} lg={4}>
                                <RecordingCard
                                    recording={recording}
                                    isAuthenticated={isAuthenticated}
                                    onPlay={onPlay}
                                    isLoadingUrl={isLoadingUrl}
                                />
                            </Col>
                        ))}
                    </Row>
                </section>
            ))}
        </div>
    );
};

export default RecordingsList;
