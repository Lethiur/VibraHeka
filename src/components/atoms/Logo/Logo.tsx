import "bootstrap/dist/css/bootstrap.min.css";

interface CenteredLogoProps {
    src: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
}

export default function Logo({ src, alt, width, height }: CenteredLogoProps) {
    return <div className="d-flex justify-content-center align-items-center w-100 py-4">
        <img src={src} alt={alt} width={width} height={height} />
    </div>
}