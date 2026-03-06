import Logo from "@core/Presentation/Components/atoms/Logo/Logo";
import "./AppLoader.scss";

export default function AppLoader() {
    return (
        <div className="app-loader" role="status" aria-live="polite" aria-label="Cargando contenido">
            <Logo width={180} height={180} className="app-loader__logo" />
            <p className="app-loader__text">Cargando experiencia VibraHeka...</p>
        </div>
    );
}
