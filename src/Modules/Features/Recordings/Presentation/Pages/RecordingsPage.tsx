import React, { useState } from "react";
import { Container } from "react-bootstrap";
import VHModal from "@core/Presentation/Components/molecules/VHModal/VHModal";
import { useAtomValue } from "jotai";
import { isAuthenticatedAtom } from "@core/Presentation/Storage/AuthAtom";
import UseGetRecordings from "@recordings/Presentation/Hooks/UseGetRecordings";
import UseGetRecordingUrl from "@recordings/Presentation/Hooks/UseGetRecordingUrl";
import { RecordingEntity } from "@recordings/Domain/Entities/RecordingEntity";
import AppLoader from "@core/Presentation/Components/molecules/AppLoader/AppLoader";
import ErrorBox from "@core/Presentation/Components/atoms/ErrorBox/ErrorBox";
import RecordingsDisclaimer from "@recordings/Presentation/Components/RecordingsDisclaimer/RecordingsDisclaimer";
import RecordingsList from "@recordings/Presentation/Components/RecordingsList/RecordingsList";
import VideoPlayer from "@core/Presentation/Components/atoms/VideoPlayer/VideoPlayer";

import "./RecordingsPage.scss";

const RecordingsPage: React.FC = () => {
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);
    const { recordings, loading: recordingsLoading, error: recordingsError } = UseGetRecordings();
    const { getRecordingUrl, loading: urlLoading } = UseGetRecordingUrl();

    const [selectedRecording, setSelectedRecording] = useState<RecordingEntity | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    const handlePlay = async (recording: RecordingEntity) => {
        if (!isAuthenticated) return;
        setSelectedRecording(recording);
        setVideoUrl(null);
        try {
            const url = await getRecordingUrl(recording.Id);
            setVideoUrl(url);
        } catch (error) {
            setSelectedRecording(null);
            setVideoUrl(null);
        }
    };

    const handleCloseModal = () => {
        setSelectedRecording(null);
        setVideoUrl(null);
    };

    if (recordingsLoading) {
        return <AppLoader />;
    }

    return (
        <div className="recordings-page vh-page-section">
            <Container>
                <header className="recordings-page__header text-center">
                    <p className="recordings-page__eyebrow">Aprendizaje y Exploración</p>
                    <h1 className="recordings-page__title">Grabaciones</h1>
                    <p className="recordings-page__subtitle">
                        Revive nuestras sesiones, talleres y masterclasses siempre que lo necesites.
                    </p>
                </header>

                <main className="recordings-page__content">
                    {recordingsError && (
                        <div className="mb-4">
                            <ErrorBox message={"Error al cargar las grabaciones."} />
                        </div>
                    )}

                    {!isAuthenticated && (
                        <div className="recordings-page__disclaimer-container mb-12">
                            <RecordingsDisclaimer />
                        </div>
                    )}

                    <RecordingsList
                        recordings={recordings}
                        isAuthenticated={isAuthenticated}
                        onPlay={handlePlay}
                        isLoadingUrl={urlLoading}
                    />
                </main>
            </Container>

            {/* Modal de Video */}
            <VHModal
                show={!!selectedRecording}
                onHide={handleCloseModal}
                size="lg"
                centered
                className="recordings-video-modal"
            >
                <VHModal.Header closeButton>
                    <VHModal.Title>{selectedRecording?.Name}</VHModal.Title>
                </VHModal.Header>
                <VHModal.Body className="p-0 bg-dark">
                    {urlLoading || !videoUrl ? (
                        <div className="d-flex justify-content-center align-items-center p-5 text-white">
                            <AppLoader />
                        </div>
                    ) : (
                        <VideoPlayer src={videoUrl} />
                    )}
                </VHModal.Body>
                <VHModal.Footer>
                    <p className="text-muted w-100 text-start m-0">{selectedRecording?.Description}</p>
                </VHModal.Footer>
            </VHModal>
        </div>
    );
};

export default RecordingsPage;
