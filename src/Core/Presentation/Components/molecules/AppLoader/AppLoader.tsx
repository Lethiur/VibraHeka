import Logo from "@core/Presentation/Components/atoms/Logo/Logo";
import "./AppLoader.scss";

interface AppLoaderProps {
    message?: string;
}

export default function AppLoader({ message = "Cargando experiencia VibraHeka..." }: AppLoaderProps) {
    return (
        <div className="app-loader" role="status" aria-live="polite" aria-label={message}>
            <Logo width={180} height={180} className="app-loader__logo" />
            <p className="app-loader__text">{message}</p>
        </div>
    );
}
