export interface Therapist {
    handle: string;
    id: string;
    title: string;
    route: string;
    image: string;
    video: string;
    role: string;
    description: string;
}

export const THERAPISTS_LIST: Therapist[] = [
    {
        id: "02f5d4a4-5091-7066-23ec-2b6f8a6d6a4e",
        handle: "beatriz",
        title: "Beatriz Alonso",
        route: "/terapeutas/beatriz-alonso",
        image: "https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/beatriz/profilepicture.png",
        video: "https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/beatriz/video.mp4",
        role: "Terapeuta y Comunicadora Animal",
        description: "Te acompaño a comprender lo que tu animal siente y necesita para mejorar la convivencia y fortalecer vuestro vínculo desde la empatía."
    },
    {
        id: "32f57464-b0b1-70a2-57cf-b6771655ad93",
        handle: "luis-galvis",
        title: "Luis Galvis",
        route: "/terapeutas/luis-galvis",
        video: "https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/luis-galvis/video.mp4",
        image: "https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/luis-galvis/profilepicture.png",
        role: "Terapeuta Bioenergético Integral",
        description: "Te acompaño a armonizar tu energía y la de tus espacios para recuperar equilibrio, claridad y una sensación más ligera de bienestar."
    },
    {
        id: "32f524c4-10a1-7048-2988-f00c4a242a77",
        handle: "marina-garrido",
        title: "Marina Garrido",
        route: "/terapeutas/marina-garrido",
        image: "https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/marina-garrido/profilepicture.png",
        video: "https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/marina-garrido/video.mp4",
        role: "Terapeuta Holística",
        description: "Te acompaño en procesos de sanación profunda y equilibrio integral, uniendo cuerpo, mente, emociones y conciencia desde una mirada holística."
    },
    {
        id: "a26534b4-d0c1-7057-5b42-bbecb887d165",
        handle: "olga-lucy",
        title: "Olga Lucy López",
        route: "/terapeutas/olga-lucy-lopez-lopez",
        image: "https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/olga-lucy/profilepicture.png",
        video: "https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/olga-lucy/video.mp4",
        role: "Sanadora energética",
        description: "Te acompaño a ordenar tu energía, sanar bloqueos profundos y transformar tu historia con una mirada espiritual y sistémica."
    },
    {
        id: "6295b434-c021-70b4-3aa8-20b88c196a8a",
        handle: "vera-lucya",
        title: "Vera Lucya",
        route: "/terapeutas/vera-lucya",
        image: "https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/vera-lucya/profilepicture.png",
        video: "https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/vera-lucya/video.mp4",
        role: "Coach de feminidad y liderazgo",
        description: "Te acompaño a equilibrar tu energía femenina y masculina para recuperar bienestar, placer, claridad y conexión con tu propósito."
    },
    {
        id: "carmen-martin",
        handle: "carmen-martin",
        title: "Carmen Martín",
        route: "/terapeutas/carmen-martin",
        image: "https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/carmen-martin/profilepicutre.png",
        video: "https://vibraheka-user-material-main.s3.eu-west-1.amazonaws.com/carmen-martin/video.mp4",
        role: "Terapeuta corporal y energética",
        description: "Te acompaño a liberar bloqueos energéticos, aliviar tensiones físicas y recuperar vitalidad desde una escucha profunda del cuerpo."
    }
];
