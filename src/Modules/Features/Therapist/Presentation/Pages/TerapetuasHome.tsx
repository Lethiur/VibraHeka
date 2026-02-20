
import TherapistCard from "@/Modules/Features/Therapist/Presentation/Components/Molecules/Terapeuta/TherapistCard";
import { THERAPISTS_LIST } from "../../Data/TherapistsList";
import { Col, Container, Row } from "react-bootstrap";

import "./TerapeutasHome.scss"

export default function TerapeutasHome() {
    return (
        <Container>
            <h1 className='text-center pb-5 pt-5'>Terapeutas</h1>

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