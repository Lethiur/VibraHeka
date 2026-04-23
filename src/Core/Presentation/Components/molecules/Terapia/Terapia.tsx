import { ReactNode } from "react";
import { Card, Col } from "react-bootstrap";
import React from "react";
import "./Terapia.scss";

interface TerapiaProps {
    title: string;
    children: ReactNode;
    buttonOnClick: () => void;
    therapyId: string;
    therapistId: string;
}


function Text({ children }: { children: ReactNode }) {
    return <>{children}</>
}


function Benefits({ children }: { children: ReactNode }) {
    return <>{children}</>
}



function Terapia({ title, children, buttonOnClick }: TerapiaProps) {
    const textContent: ReactNode[] = [];
    const benefitsContent: ReactNode[] = [];
    
    if (buttonOnClick != undefined) {
    }

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
        <Col md={6} className="mb-3 d-flex">
            <Card className="vh-surface-card vh-panel terapia-card w-100">
                <Card.Header className="card-title">
                    {title}
                </Card.Header>
                <Card.Body className="d-flex flex-column h-100">
                    <div className="flex-grow-1">
                        <Card.Text className="card-body mb-0" as="div">
                            <div className="card-text terapia-card__content">
                                {textContent}
                            </div>
                        </Card.Text>
                    </div>
                    {/* <div className="terapia-card__footer mt-auto">
                        {benefitsContent}
                        <PrimaryButton label="Reservar una sesi&oacute;n" onClick={buttonOnClick} fullWidth={true} />
                    </div> */}
                </Card.Body>
            </Card>
        </Col>
    );
}

Terapia.Text = Text;
Terapia.Benefits = Benefits;

export default Terapia;
