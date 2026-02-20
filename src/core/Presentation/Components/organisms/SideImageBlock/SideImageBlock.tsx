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
        <Row className={`side-block ${imageLeft ? "left" : "right"}`}>

            <Col lg={4} md={12} >
                <Image className="side-block__image" src={image} />
            </Col>
            <Col lg={8} md={12}>
                <div className="side-block__content">
                    {children}
                </div>
            </Col>
        </Row>
    );
}


