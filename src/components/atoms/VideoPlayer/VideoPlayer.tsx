import React from "react";
import "./VideoPlayer.scss";

export interface VideoPlayerProps {
    src: string;               // URL o ruta del video
    poster?: string;           // Imagen previa opcional
    controls?: boolean;        // Mostrar controles
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    width?: string | number;   // Permite ajustar tamaño
    height?: string | number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    src,
    poster,
    controls = true,
    autoPlay = false,
    loop = false,
    muted = false,
    width = "100%",
    height = "auto",
}) => {
    return (
        <div className="video-player d-flex justify-content-center">
            <video
                src={src}
                poster={poster}
                controls={controls}
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                style={{ width, height }}
            />
        </div>
    );
};

export default VideoPlayer;
