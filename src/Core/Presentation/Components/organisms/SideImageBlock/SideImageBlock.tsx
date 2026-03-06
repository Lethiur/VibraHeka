import { ReactNode } from "react";
import "./SideImageBlock.scss";
import { Col, Row, Image } from "react-bootstrap";

interface SideImageBlockProps {
    image: string;
    imageAlt?: string;
    imageLeft?: boolean;
    children: ReactNode;
}


export default function SideImageBlock({
    image,
    imageAlt = "Section image",
    imageLeft = true,
    children,
}: SideImageBlockProps) {
    const imageOrderClass = imageLeft ? "order-1" : "order-1 order-lg-2";
    const contentOrderClass = imageLeft ? "order-2" : "order-2 order-lg-1";

    return (
        <Row className="side-block align-items-center g-4 g-lg-5 w-100 mx-0">

            <Col lg={5} md={12} className={`side-block__image-col d-flex ${imageOrderClass}`}>
                <Image className="side-block__image" src={image} alt={imageAlt} />
            </Col>
            <Col lg={7} md={12} className={`side-block__content-col ${contentOrderClass}`}>
                <div className="side-block__content">
                    {children}
                </div>
            </Col>
        </Row>
    );
}


