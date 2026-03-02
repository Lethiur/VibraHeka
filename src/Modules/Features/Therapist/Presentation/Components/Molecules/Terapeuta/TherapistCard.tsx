import { ReactNode } from "react";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import { Col, Row, Image } from "react-bootstrap";


interface TerapeutaProps {
    title: string;
    route: string;
    children: ReactNode;
    image: string;
}

export default function TherapistCard({ title, route, children, image }: TerapeutaProps) {
    return (

        <Row>
            <Col lg={3} md={12} sm={12} className="text-center">
                <Image src={image}
                    fluid
                    rounded
                    style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
                />
            </Col>

            <Col
                lg={9}
                md={12}
                sm={12}
                className="d-flex flex-column justify-content-center mt-md-0 mt-3"
            >
                <h2>{title}</h2>
                {children}
                <PrimaryButton
                    label="Descubre mi espacio"
                    to={route}
                    variant="primary"
                    fullWidth
                />
            </Col>
        </Row>

    )
}
