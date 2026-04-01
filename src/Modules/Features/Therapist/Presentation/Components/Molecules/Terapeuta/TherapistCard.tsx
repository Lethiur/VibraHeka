import { ReactNode } from "react";
import PrimaryButton from "@core/Presentation/Components/atoms/PrimaryButton/PrimaryButton";
import { Col, Row, Image } from "react-bootstrap";
import "./TherapistCard.scss";


interface TerapeutaProps {
    title: string;
    route: string;
    children: ReactNode;
    image: string;
}

export default function TherapistCard({ title, route, children, image }: TerapeutaProps) {
    return (
        <Row className="therapist-card vh-surface-card align-items-stretch g-0 overflow-hidden">
            <Col lg={3} md={12} sm={12} className="therapist-card__image-col text-center">
                <Image src={image}
                    fluid
                    className="therapist-card__image"
                />
            </Col>

            <Col
                lg={9}
                md={12}
                sm={12}
                className="therapist-card__content-col"
            >
                <div className="therapist-card__content">
                    <h2 className="therapist-card__title">{title}</h2>
                    <div className="therapist-card__text">
                        {children}
                    </div>
                </div>
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
