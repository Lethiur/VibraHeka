
import TherapistCard from "@/Modules/Features/Therapist/Presentation/Components/Molecules/Terapeuta/TherapistCard";
import { THERAPISTS_LIST } from "../../Data/TherapistsList";
import { Col, Container, Row } from "react-bootstrap";
import "./TerapetuasHome.scss";


export default function TerapeutasHome() {
    return (
        <Container className="therapists-home vh-page-section">
            <div className="therapists-home__hero text-center">
                <p className="therapists-home__eyebrow">Guías y acompañamiento</p>
                <h1 className='therapists-home__title'>Terapeutas</h1>
                <p className="therapists-home__subtitle">Explora espacios de sanación con enfoques energéticos, corporales y sistémicos, sostenidos por la sensibilidad y la experiencia de cada terapeuta.</p>
            </div>

            <Row className="g-4">
                {THERAPISTS_LIST.map((therapist) => (
                    <Col key={therapist.handle} lg={12} md={12}>
                        <TherapistCard
                            key={therapist.handle}
                            title={therapist.title}
                            route={therapist.route}
                            image={therapist.image}
                        >
                            <p>{therapist.role}</p>
                            <p>{therapist.description}</p>
                        </TherapistCard>
                    </Col>
                ))}

            </Row>
        </Container>
    )
}
