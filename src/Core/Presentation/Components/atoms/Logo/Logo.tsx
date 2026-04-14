import "./Logo.scss";
import logo from "../../../../../Assets/Images/logo-web.png";
import {Image} from "react-bootstrap";

interface LogoProps {
    src?: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
}



export default function Logo({
    alt = "VibraHeka",
    width = 220,
    height = 220,
    className = "",
}: LogoProps) {
    return (
        <div className={`vh-logo ${className}`.trim()}>
            <Image className="vh-logo__image" src={logo} alt={alt} width={width} height={height} />
        </div>
    );
}
