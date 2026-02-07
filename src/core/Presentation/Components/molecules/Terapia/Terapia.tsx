import { FC, ReactNode } from "react";
import PrimaryButton from "../../atoms/PrimaryButton/PrimaryButton";
import { Card, Col } from "react-bootstrap";
import React from "react";

interface TerapiaProps {
    title: string;
    children: ReactNode;
    buttonOnClick: () => void;
    therapyId: string;
    therapistId: string;
}


function Text({ children, type = "text" }: { children: ReactNode, type?: string }) {
    return <>{children}</>
}


function Benefits({ children, type = "Benefits" }: { children: ReactNode, type?: string }) {
    return <>{children}</>
}



function Terapia({ title, children, buttonOnClick, therapyId, therapistId }: TerapiaProps) {
    const textContent: ReactNode[] = [];
    const benefitsContent: ReactNode[] = [];

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;

        // @ts-ignore
        if (child.type === Benefits || child.props.type === "benefits") {
            benefitsContent.push(child);
        } else {
            textContent.push(child);
        }
    });




    return (
        <Col md={6}>
            <Card className="mb-2" style={{ height: '500px' }}>
                <Card.Header className="card-title">
                    {title}
                </Card.Header>
                <Card.Body className="d-flex flex-column flex-grow-1">
                    <div className="flex-grow-1">
                        <Card.Text className="card-body" as="div">
                            <div className="card-text">
                                {textContent}
                            </div>
                        </Card.Text>
                    </div>
                    {benefitsContent}
                    <PrimaryButton label="Reservar una sesi&oacute;n" onClick={buttonOnClick} />
                </Card.Body>
            </Card>
        </Col>
    );
}

Terapia.Text = Text;
Terapia.Benefits = Benefits;

export default Terapia;
