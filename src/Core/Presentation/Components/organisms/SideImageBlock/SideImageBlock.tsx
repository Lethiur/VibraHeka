import { ReactNode } from "react";
import "./SideImageBlock.scss";
import { Col, Row, Image } from "react-bootstrap";

interface SideImageBlockProps {
    image: string;
    imageAlt?: string;
    imageLeft?: boolean;
    contentVerticalAlign?: "start" | "center";
    imageVerticalAlign?: "start" | "center";
    children: ReactNode;
}


export default function SideImageBlock({
    image,
    imageAlt = "Section image",
    imageLeft = true,
    contentVerticalAlign = "start",
    imageVerticalAlign = "start",
    children,
}: SideImageBlockProps) {
    const imageOrderClass = imageLeft ? "order-1" : "order-1 order-lg-2";
    const contentOrderClass = imageLeft ? "order-2" : "order-2 order-lg-1";
    const blockAlignClass = contentVerticalAlign === "center" ? "align-items-center" : "align-items-stretch";
    const contentAlignClass = contentVerticalAlign === "center" ? "side-block__content--center" : "";
    const imageAlignClass = imageVerticalAlign === "center" ? "side-block__image-col--center" : "";

    return (
        <Row className={`side-block ${blockAlignClass} g-4 g-lg-5 w-100 mx-0`}>

            <Col lg={5} md={12} className={`side-block__image-col d-flex ${imageAlignClass} ${imageOrderClass}`}>
                <Image className="side-block__image" src={image} alt={imageAlt} />
            </Col>
            <Col lg={7} md={12} className={`side-block__content-col ${contentOrderClass}`}>
                <div className={`side-block__content ${contentAlignClass}`}>
                    {children}
                </div>
            </Col>
        </Row>
    );
}


