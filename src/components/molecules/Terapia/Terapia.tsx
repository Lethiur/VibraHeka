import { ReactNode } from "react";
import PrimaryButton from "../../atoms/PrimaryButton/PrimaryButton";

interface TerapiaProps {
    title: string;
    children: ReactNode;
    buttonOnClick: () => void;
}

export default function Terapia({ title, children, buttonOnClick }: TerapiaProps) {
    return (
        <div className="col col-lg-6 col-md-6 col-sm-12 d-flex">
            <div className="card p-4 h-100 w-100">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <br />
                    <div className="card-text">
                        {children}
                    </div>
                    <PrimaryButton label="Reservar una sesi&oacute;n" onClick={buttonOnClick} />
                </div>
            </div>
        </div>
    );
}