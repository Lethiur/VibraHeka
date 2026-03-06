import "./Logo.scss";

interface LogoProps {
    src?: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
}

const BRAND_LOGO_URL = "http://vibraheka.com/wp-content/uploads/2025/09/logo-vibrakeca3-1__1_-removebg-preview-1.png";

export default function Logo({
    src = BRAND_LOGO_URL,
    alt = "VibraHeka",
    width = 220,
    height = 220,
    className = "",
}: LogoProps) {
    return (
        <div className={`vh-logo ${className}`.trim()}>
            <img className="vh-logo__image" src={src} alt={alt} width={width} height={height} />
        </div>
    );
}
