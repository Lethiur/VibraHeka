import { useParams } from "react-router-dom";
import BeatrizAlonso from "@therapist/Presentation/Components/Atoms/BeatrizAlonso";
import VeraLucya from "@therapist/Presentation/Components/Atoms/VeraLucya";
import { Container } from "react-bootstrap";
import LuisGalvis from "@therapist/Presentation/Components/Atoms/LuisGalvis";
import MarinaGarrido from "@therapist/Presentation/Components/Atoms/MarinaGarrido.tsx";
import OlgaLucy from "@therapist/Presentation/Components/Atoms/OlgaLucy.tsx";
import CarmenMartin from "@therapist/Presentation/Components/Atoms/CarmenMartin.tsx";
import VeronicaHernandez from "@therapist/Presentation/Components/Atoms/VeronicaHernandez.tsx";
import "./TherapistPage.scss";


export default function TherapistPage() {

    const therapistID = useParams<{ id: string }>();


    switch (therapistID.id) {
        case "beatriz-alonso":
            return <Container className="therapist-page vh-page-section">
                <BeatrizAlonso />
            </Container>;
        case "vera-lucya":
            return <Container className="therapist-page vh-page-section">
                <VeraLucya />
            </Container>;
        case "luis-galvis":
            return <Container className="therapist-page vh-page-section">
                <LuisGalvis />
            </Container>;
        case "marina-garrido":
            return <Container className="therapist-page vh-page-section">
                <MarinaGarrido />
            </Container>
        case "olga-lucy-lopez-lopez":
            return <Container className="therapist-page vh-page-section">
                <OlgaLucy/>
            </Container>
        case "carmen-martin":
            return <Container className="therapist-page vh-page-section">
                <CarmenMartin />
            </Container>
        case "veronica-hernandez":
            return <Container className="therapist-page vh-page-section">
                <VeronicaHernandez />
            </Container>
        default:
            return <div>Terapeuta no encontrado</div>;
    }
}
