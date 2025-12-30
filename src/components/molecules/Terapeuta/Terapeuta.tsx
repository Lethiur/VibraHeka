import { ReactNode } from "react";
import PrimaryButton from "../../atoms/PrimaryButton/PrimaryButton";

interface TerapeutaProps {
    title: string;
    route: string;
    children: ReactNode;
    image: string;
}

export default function Terapeuta({ title, route, children, image }: TerapeutaProps) {
    return (
        <div className='row gx-25 gy-3 d-flex justify-content-center p-5 align-items-center'>
            <img src={image} className='col col-lg-3 col-md-5 col-sm-12 rounded-circle' />
            <div className='col col-lg-8 col-md-6 col-sm-12'>
                <div className='p-2'>
                    <h2>{title}</h2>
                    {children}
                    <PrimaryButton label="Descubre mi espacio" to={route} variant="primary" disabled={false} fullWidth={true} ></PrimaryButton>
                </div>
            </div>
        </div>
    )
}