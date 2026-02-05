import { useParams } from "react-router-dom";
import BeatrizAlonso from "@therapist/Presentation/Components/Atoms/BeatrizAlonso";
import VeraLucya from "@therapist/Presentation/Components/Atoms/VeraLucya";
import { Container } from "react-bootstrap";


export default function TherapistPage() {

    const therapistID = useParams<{ id: string }>();


    switch (therapistID.id) {
        case "beatriz-alonso":
            return <Container>
                <BeatrizAlonso />
            </Container>;
        case "vera-lucya":
            return <Container>
                <VeraLucya />
            </Container>;
        default:
            return <div>Terapeuta no encontrado</div>;
    }
}