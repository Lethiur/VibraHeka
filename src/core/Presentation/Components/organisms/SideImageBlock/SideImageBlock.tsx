import { ReactNode } from "react";
import "./SideImageBlock.scss";
import { Col, Row, Image } from "react-bootstrap";

interface SideImageBlockProps {
    image: string;
    imageLeft?: boolean;
    children: ReactNode;
}

export default function SideImageBlock({
    image,
    imageLeft = true,
    children,
}: SideImageBlockProps) {
    return (
        <Row>
            <Col md={4} className={`side-block ${imageLeft ? "left" : "right"}`} >
                <Image className="side-block__image" src={image} />
            </Col>
            <Col md={8}>
                <div className="side-block__content">
                    {children}
                </div>
            </Col>
        </Row>
    );
}
